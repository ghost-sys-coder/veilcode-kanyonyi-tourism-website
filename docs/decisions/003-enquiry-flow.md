# 003: Enquiry flow

**Status:** Accepted and implemented (S8, 4 October 2026)
**Applies to:** Phase 05

## Context

The site is built around enquiries. The brief's conversion priority is tour enquiry first, then WhatsApp click, then custom itinerary request. The form fields, microcopy, success state and both emails are fixed by 08-plan-your-trip.md, 02-global.md and 11-emails-and-meta.md. The brief also decides the stack: Neon Postgres for storage, Resend from a verified sending subdomain, two emails per enquiry, reply-to frank@veilcode.studio, and no `kanyonyi` mailbox anywhere.

## Decision

### 1. Server Action, not a Route Handler

`features/enquiries/actions/submit-enquiry.ts` (`"use server"`) is called from the form through React's `useActionState`.

Reasons:

- The form is only submitted from this site. A Server Action gives progressive enhancement (the form posts without JavaScript), typed returns, and built-in Origin and Host checking for CSRF.
- A Route Handler would only be needed for third-party callers (for example a CRM webhook). There are none in scope.

The action is the single entry point. The logic underneath is plain functions that can be tested without Next.js:

```text
features/enquiries/
  schema.ts                 Zod schema (shared by client and server)
  options.ts                Month list builder, residency and flexibility options
  estimate.ts               estimateTotal(), re-exported from lib/content/pricing.ts
  reference.ts              formatReference(seq) -> "KX-1001"
  actions/submit-enquiry.ts Orchestration only
  services/
    enquiry-repository.ts   insertEnquiry(), countRecentByIpHash()
    enquiry-emails.ts       buildTravellerEmail(), buildOperatorEmail()
    rate-limit.ts           isRateLimited(ipHash)
  components/
    enquiry-form.tsx        "use client" (the form, useActionState)
    enquiry-estimate.tsx    "use client" (live estimate)
    traveller-stepper.tsx   "use client" (1 to 12)
    enquiry-success.tsx     Success state
    enquiry-side-panel.tsx  Server component
services/email/resend.ts    sendEmail() over Resend's REST API
db/schema.ts, db/client.ts, db/migrations/
```

### 2. Zod schema

This mirrors the table in 08-plan-your-trip.md exactly: the same order, required flags and options. Error messages come from `content/ui.ts` (02-global.md form microcopy).

```ts
// features/enquiries/schema.ts
import { z } from "zod";

export const TOUR_CUSTOM = "custom" as const;
export const MONTH_NOT_SURE = "not-sure" as const;

export const enquirySchema = z.object({
  tour: z.enum([...tourSlugs, TOUR_CUSTOM], { error: E.tour }),
  travelMonth: z.union([
    z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/),   // checked against the rolling 18-month window server side
    z.literal(MONTH_NOT_SURE),
  ], { error: E.travelMonth }),
  flexibility: z.enum(["fixed", "week-or-two", "any-time-that-month"]).optional(),
  travellers: z.coerce.number().int().min(1, E.travellers).max(12, E.travellers),
  anyoneUnder15: z.enum(["no", "yes"]).optional(),
  residency: z.enum(["outside-east-africa", "east-africa"], { error: E.residency }),
  name: z.string().trim().min(1, E.name).max(120),
  email: z.email({ error: E.email }).max(254),
  whatsapp: z.string().trim().max(32)
    .regex(/^\+?[0-9 ()-]{7,}$/, { error: E.whatsapp })
    .optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional(),
  consent: z.literal("on", { error: E.consent }),

  // Not shown to the user
  website: z.string().max(0).optional(),           // honeypot; see section 5
  sourcePath: z.string().max(200).startsWith("/"), // page the enquiry started from
  utmSource: z.string().max(100).optional(),
  utmMedium: z.string().max(100).optional(),
  utmCampaign: z.string().max(100).optional(),
});
// E = field errors from 08-plan-your-trip.md, held in content/pages/plan-your-trip.ts
```

Field errors, select placeholders ("Choose a trip", "Choose a month", "Choose where you live"), stepper labels and the error summary ("Please fix {n} thing(s) below before sending.", focused and linking to each field) all come from 08-plan-your-trip.md. The summary renders "thing" or "things" to match {n}; the literal "(s)" isn't shown.

The same schema validates on the client (on blur and on submit, for instant messages) and on the server (authoritative). Zod's issues are mapped to `{ fieldErrors: Record<field, string> }`. The form renders them with `aria-invalid`, `aria-describedby` and text, never colour alone, and moves focus to the first invalid field.

### 3. Neon table design and migrations

**Access layer:** Drizzle ORM over `@neondatabase/serverless` (HTTP driver, so there is no connection pool to manage on Vercel functions), with drizzle-kit for migrations.

```ts
// db/schema.ts
export const enquiryRefSeq = pgSequence("enquiry_ref_seq", { startWith: 1001 });

export const enquiries = pgTable("enquiries", {
  id: uuid("id").primaryKey().defaultRandom(),
  reference: text("reference").notNull().unique(),          // "KX-1001"
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),

  tourSlug: text("tour_slug"),                              // null = "Something custom"
  travelMonth: date("travel_month"),                        // first of month; null = not sure
  flexibility: text("flexibility"),
  travellers: smallint("travellers").notNull(),
  anyoneUnder15: boolean("anyone_under_15"),
  residency: text("residency").notNull(),

  name: text("name").notNull(),
  email: text("email").notNull(),
  whatsapp: text("whatsapp"),
  notes: text("notes"),
  consentAt: timestamp("consent_at", { withTimezone: true }).notNull(),

  estimateUsd: integer("estimate_usd"),                     // null for custom
  sourcePath: text("source_path").notNull(),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),

  ipHash: text("ip_hash").notNull(),                        // HMAC-SHA256(ip, IP_HASH_SECRET)
  travellerEmailStatus: text("traveller_email_status").notNull().default("pending"), // pending|sent|failed
  operatorEmailStatus: text("operator_email_status").notNull().default("pending"),
  status: text("status").notNull().default("new"),          // new|quoted|booked|lost (for later)
}, (t) => [
  index("enquiries_created_at_idx").on(t.createdAt),
  index("enquiries_ip_hash_created_at_idx").on(t.ipHash, t.createdAt),
  check("travellers_range", sql`${t.travellers} between 1 and 12`),
  check("residency_values", sql`${t.residency} in ('outside-east-africa','east-africa')`),
]);
```

Notes on the design:

- **Reference** comes from a Postgres sequence: `'KX-' || nextval('enquiry_ref_seq')`, set in the same `INSERT ... RETURNING`. It is unique, needs no retry loop and matches the copy's `KX-1234` format. It reveals approximate volume, which is acceptable because the reference grants no access to anything.
- **`tour_slug` is text, not a foreign key**, because tours live in files and not in the database (001). If tours move to the database, this becomes a foreign key in that migration. The column name already fits.
- **Attribution columns** (`source_path`, `utm_*`) answer AGENTS.md section 26 ("which traffic sources produce enquiries") from the database. That matters because GA4 under consent misses everyone who rejects analytics cookies.
- **The raw IP is never stored.** A keyed hash is enough for rate limiting and can't be reversed without the secret.
- **Retention:** the demo privacy notice promises **12 months, then deleted** (the live notice says 24 months for enquiries that don't become bookings). Phase 05 adds `npm run db:purge` (`DELETE FROM enquiries WHERE created_at < now() - interval '12 months'`) and the plan records that it must be scheduled before the first rows reach 12 months (October 2027), for example with a Vercel cron. Deletion requests in the meantime are handled by hand in Neon.

**Migrations:** `drizzle-kit generate` writes SQL to `db/migrations/`. Those files are committed and reviewed. `drizzle-kit migrate` is run manually against Neon (`npm run db:migrate`), not inside `next build`, so a failed build never leaves a half-migrated database. Per AGENTS.md section 0 (default 6): local `.env.local` and Vercel previews use the `dev` branch; only Vercel production uses `main`. Migrations run on `dev` first, then on `main` once verified. `drizzle.config.ts` loads env with Next's `@next/env` `loadEnvConfig`, so `npm run db:migrate` uses `.env.local` (`dev`) by default. Migrating `main` needs an explicit `npm run db:migrate:prod` that reads `.env` only and asks for confirmation. Local development never points at `main`.

### 4. Submit sequence

```text
1. Parse FormData -> zod.safeParse            fail -> { status: "invalid", fieldErrors }
2. Honeypot filled?                            yes  -> { status: "success", reference: fake } (no DB, no email)
3. ipHash = HMAC(x-forwarded-for first hop)
4. Rate limit: >= 3 enquiries from ipHash in the last 10 minutes
                                               yes  -> { status: "rate_limited" }
5. Compute estimate on the server (never trust a client figure)
6. INSERT ... RETURNING reference              fail -> log, { status: "server_error" }
7. Send both emails in parallel (Promise.allSettled, 8s timeout each, Resend Idempotency-Key = reference)
8. UPDATE email status columns                 email failures are logged, not shown to the user
9. Return { status: "success", reference, firstName, email, tourName, monthLabel }
```

- Emails are awaited in the request and not deferred with `after()`. The form already shows "Sending…", and an extra second is a fair price for knowing the delivery status when the action returns. That status is persisted, so a failed operator notification is visible in the database. A deferred send can fail silently after the response has gone.
- **Database down:** the user sees the copy's server failure message, which points to WhatsApp, so the lead still has a route. A best-effort operator email with the raw enquiry is **not** sent. It would create a second, unreferenced record path, and that complexity isn't justified for a demo.
- **Duplicate submission:** the button is disabled while pending (`useActionState` gives `isPending`), and on success the form is replaced by the success state. Server-side deduplication isn't needed beyond the rate limit.

### 5. Spam protection

- **Honeypot:** a text input named `website`, wrapped in a container with `position:absolute; left:-10000px`, plus `aria-hidden="true"`, `tabindex="-1"` and `autocomplete="off"`. It is not `display:none`, which some bots detect. If it's filled, the action returns a normal-looking success so bots get no signal.
- **Rate limit:** 3 per 10 minutes per IP hash, counted on the `enquiries` table using the `(ip_hash, created_at)` index. This needs no Redis, no Upstash account and no extra dependency. At demo volume one indexed count query is cheap. Revisit with Upstash only if traffic justifies it.
- **No CAPTCHA**, per 08-plan-your-trip.md, unless abuse appears.
- Input lengths are capped in Zod. Notes are rendered into email HTML only after HTML-escaping.

### 6. Emails (Resend)

| | Traveller confirmation | Operator notification |
| --- | --- | --- |
| From | Address from `EMAIL_FROM`. Display name from content: "Kanyonyi Expeditions (demo by VeilCode Studio)" in demo mode, "Kanyonyi Expeditions" otherwise | Same address, display name "Kanyonyi enquiries" |
| Copy used | Demo mode: "Demo version of Email 1" (subject "Your demo enquiry ({reference})"). Live: Email 1 | Email 2 in both modes |
| To | the traveller | `ENQUIRY_NOTIFY_TO` (frank@veilcode.studio) |
| Reply-to | `EMAIL_REPLY_TO` (frank@veilcode.studio) | the traveller's email, so Frank can reply directly |
| Subject | `Your Uganda trip enquiry ({reference})` | `New enquiry {reference}: {tour name}, {month}, {n} travellers` |
| Body | 11-emails-and-meta.md, HTML + plain text, demo footer | Plain text, fixed-width block exactly as in the copy |

- `EMAIL_FROM` is parsed for the address only, because the display name changes with demo mode. The address's domain must be verified in Resend. **On 4 October 2026 only `veilcode.studio` was verified, while `EMAIL_FROM` uses `mail.veilcode.studio`.** Resend verifies each subdomain separately, so `mail.veilcode.studio` must be added and verified (the brief requires a subdomain to protect the root domain's reputation). `config/env.ts` rejects any From address containing `kanyonyi`.
- The HTML is built by `features/enquiries/services/enquiry-emails.ts` as table-based markup with inline styles, using the brand tokens as literal hex values (email clients don't support CSS variables). A plain-text part is always included.
- **"Reply by: {date + 1 working day}"** in the operator email is computed in `Africa/Kampala` time. Working days are Monday to Saturday, matching the hours in the copy. Sunday rolls to Monday.
- `{estimate}` in the traveller email: `USD 3,300` for tours, and "Priced in your quote" for "Something custom" (the estimate box value in 08-plan-your-trip.md).
- The guide links in the traveller email are absolute URLs built from `NEXT_PUBLIC_SITE_URL`.
- No address or mailbox containing `kanyonyi` is used anywhere. Env values are validated at startup to make sure of it.

### 7. Live estimate

`estimateTotal(tour, travellers)` = `pricePerPerson(tour, travellers)` × travellers, plus the single room supplement when travellers = 1. It uses the 04-tours.md price model (001), at standard season only, as the small print says. Example: tour 1 for 3 travellers is $1,500 × 3 = $4,500.

Extra lines from 08-plan-your-trip.md: "Includes the single room supplement." when travellers = 1, and "Groups of seven or more travel in two vehicles, each with its own guide." when travellers ≥ 7. "Something custom" shows the value "Priced in your quote" with the custom small print. At 12 travellers the stepper shows "For groups larger than 12, tell us in the notes and we'll plan it."

It is labelled "Estimated total", with the copy's small print, and the quote confirms the exact price. It is shown as `$3,300` (compact UI format per 01-voice.md) and follows the currency toggle.

### 8. Analytics events (GA4, section 25 names only)

| Event | Fired when | Params | Key event |
| --- | --- | --- | --- |
| `start_enquiry` | First focus or change in the form (once per page view) | `tour_slug`, `source_path` | |
| `submit_enquiry` | Action returns `success` (not for the honeypot) | `tour_slug`, `travellers`, `value` (estimate), `currency: "USD"`, `residency` | ✔ |
| `whatsapp_click` | Any WhatsApp link or button | `location` (`floating`, `header_menu`, `tour_page`, `success`, `plan_page`, `closing_cta`), `tour_slug?` | ✔ |
| `check_availability` | "Check permit availability" buttons | `source_path` | |
| `tour_view` / `destination_view` | Page view on those templates | `tour_slug` / `destination_slug` | |
| `view_itinerary` | "See itinerary" card click | `tour_slug`, `list` (`home`, `tours`, `destination`) | |
| `tour_search` | Trip finder submit | `experience`, `month`, `length` | |
| `tour_filter` | Filter chip or sort change on /tours | `filter`, `value` | |

`phone_click` and `email_click` aren't used: there is no phone link and no public mailbox. Errors (`invalid`, `rate_limited`, `server_error`) aren't GA events. They are logged on the server, and the drop between `start_enquiry` and `submit_enquiry` shows abandonment.

Events go through one typed `lib/analytics/track.ts` (`track<E extends EventName>(name, params)`). It does nothing until consent is granted, so components never touch `gtag` directly. Consent and loading are covered in 004.

### 9. Error and state matrix

| State | UI (copy from 02-global.md / 08-plan-your-trip.md) |
| --- | --- |
| Field invalid | Inline message under the field and focus moved to the first error. Summary announced through an `aria-live` region |
| Sending | Button label "Sending…", disabled, `aria-busy` on the form |
| Network failure (fetch throws on the client) | "Your enquiry didn't send. Check your connection and try again…" with the WhatsApp link |
| Server failure | "Something went wrong on our side and your enquiry didn't send…" |
| Rate limited | "You've sent several enquiries in a short time…" |
| Success (demo mode) | Demo success state from 08-plan-your-trip.md ("That's the enquiry flow working, {first name}.", with "See who built this" and "Chat with VeilCode on WhatsApp"). The side panel also uses its demo version |
| Success (live) | The form is replaced by the success state, with `KX-xxxx`, next steps, the two buttons and the spam-folder line. Focus moves to the success heading |
| Arrived from a tour page | `?tour=slug` preselects the trip. An unknown slug is ignored |

Logging: `console.error` with `{ reference?, stage, errorName }`, which Vercel captures. Never log the name, email, phone or notes.

### 10. Environment variables

Names follow `env.example` (added 4 October 2026).

| Var | Scope | Purpose | Status |
| --- | --- | --- | --- |
| `DATABASE_URL` | server | Neon pooled string, used by the app | Set: `.env` = `main`, `.env.local` = `dev` (local uses `dev`, since `.env.local` wins) |
| `DATABASE_URL_UNPOOLED` | migrations only | Direct connection for `drizzle-kit migrate` | Set in both files (`main` / `dev`) |
| `NEXT_PUBLIC_SITE_URL` | public | Canonicals, emails, llms.txt | Set |
| `NEXT_PUBLIC_DEMO_MODE` | public | Demo bar, noindex, demo copy variants (002 section 2) | Set |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | public | Digits only, for wa.me links | Set |
| `RESEND_API_KEY` | server | Resend | Set |
| `EMAIL_FROM` | server | Full From header: `Kanyonyi Expeditions <enquiries@mail.veilcode.studio>` | Set |
| `EMAIL_REPLY_TO` | server | frank@veilcode.studio | Set |
| `ENQUIRY_NOTIFY_TO` | server | frank@veilcode.studio | Set |
| `IP_HASH_SECRET` | server | HMAC key, 32+ random bytes | **Not in `env.example` yet.** Added in S8 |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | public | GA4 (`G-XXXXXXXXXX`). Set in Vercel **Production only**; leave it empty locally and in Preview so test traffic never reaches GA. The analytics component renders nothing when it's empty | Set (`G-VTGBCCGM1N`), 4 Oct |

`.env` is git-ignored (`.env*`). `env.example` has no leading dot, so it isn't caught by that pattern and can be committed. `config/env.ts` validates the server variables with Zod once, on first import, and fails loudly.

### 11. Dependencies (AGENTS.md section 35)

| Package | Type | Why it's needed | Platform/shadcn alternative? | Cost / risk |
| --- | --- | --- | --- | --- |
| `zod` | dep | Shared client and server schema validation (section 24). Already in `node_modules` at 4.6.5 as a transitive dependency of shadcn, but must be a direct dependency to be relied on | None built in | ~13 kB gzip on the client for the form route only. Very widely maintained |
| `drizzle-orm` | dep | Typed queries, schema as code (section 2 asks for a typed access layer and migrations) | Raw SQL with the Neon driver would work for one table, but loses typed rows and migration generation | Server only, so no bundle cost. Actively maintained |
| `@neondatabase/serverless` | dep | Neon's official driver for serverless (HTTP or WebSocket) | `pg` needs connection pooling on Vercel functions | Server only |
| `drizzle-kit` | devDep | Generates and applies SQL migrations | Hand-written SQL plus a runner script | Dev only |
| `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/dom` | devDep | Unit and component tests (brief default 5) | None | Dev only |
| `@playwright/test`, `@axe-core/playwright` | devDep | E2E and accessibility checks (brief default 5) | None | Dev only. Browsers are downloaded separately |
| `schema-dts` | devDep | Types for JSON-LD builders | Hand-typed objects | Types only, zero runtime. **Cut first** if anyone objects |

**Not added, by decision:**

- **`resend` SDK:** sending is one authenticated `POST https://api.resend.com/emails` with an `Idempotency-Key` header. A 30-line `fetch` wrapper in `services/email/resend.ts` covers it and keeps the client bundle and lockfile clean.
- **`react-email` / `@react-email/*`:** two emails, written once as escaped template functions.
- **`react-hook-form`:** `useActionState` plus Zod covers validation, pending and error states. The installed shadcn style (base-nova) uses the `Field` components, which don't need it.
- **`@next/third-parties`:** GA plus Consent Mode v2 needs a consent default set *before* gtag loads. Two `next/script` tags do that directly (see 004).
- **Upstash / Redis:** the rate limit runs on Postgres (section 5).

**Installed 4 October 2026 (S1).** `@vitejs/plugin-react` was dropped: its latest version has a Babel 8 peer conflict, and Vitest's built-in transform handles JSX with `oxc.jsx.runtime: "automatic"`. `npm audit --omit=dev` reports 7 high-severity findings, all inside the shadcn CLI's own tooling (`ts-morph`, `fast-glob`), none of which reach the browser bundle. Revisit when shadcn updates.

## Consequences

- An enquiry counts as successful once it is stored, even if an email fails. Frank should check `operator_email_status = 'failed'` rows, either with a saved Neon query or a weekly look, until there is an admin view.
- A rate limit stored in Postgres adds one query per submission. That is fine at demo and small-operator scale.
- Everything needed to answer "which pages and sources produce enquiries" sits in one table, independent of cookie consent.

## S8 implementation notes (4 October 2026)

- The full form replaces the interim contact page. A shared Zod schema validates on blur, before an enhanced submit, and again in the Server Action. Required placeholders, errors, estimate, demo panel and success copy come through `lib/content/`; `content/emails.ts` transcribes both traveller variants and the operator notification. No dependency was added.
- The direct `useActionState` action and permalink remain on the HTML form. After hydration, an awaited call to that same action catches network failures while preserving all fields. Native selects/radios/consent inside `noscript` are a documented exception to the shadcn rule: Base UI popup controls require JavaScript. A no-JavaScript POST and confirmation are tested.
- The summary receives focus after invalid submission, matching 08-plan-your-trip.md; its links focus the corresponding fields. This resolves the conflicting first-field-focus wording in section 9. Inline errors include an icon, text and described-by references. Base UI files were not changed.
- Honeypot detection runs before ordinary validation, resolving the original `website.max(0)`/fake-success contradiction. Filled traps return success without storage, mail or conversion analytics. Private configuration is validated lazily and error logs contain only stage, reference and error name.
- The reference is a sequence-backed database default in the same insert. The rate count and insert run in a Neon HTTP batch transaction, preceded by a transaction-scoped advisory lock on the keyed IP hash. Five simultaneous dev requests stored exactly three rows. Both indexes and database constraints are verified against dev; disposable fixture rows are removed.
- The two Resend requests use distinct keys, `{reference}:traveller` and `{reference}:operator`. A shared key would reject the second payload with HTTP 409 ([Resend documentation](https://resend.com/changelog/idempotency-keys)). Each has an eight-second abort signal. Stored enquiries remain successful if mail or its status update fails; failed/pending statuses need manual monitoring until an admin view exists.
- Traveller HTML uses escaped values, table layout, inline DESIGN.md colour tokens and a plain-text part. Demo/live sending names and bodies are selected together. The operator From name uses the nearest approved `Kanyonyi Expeditions` rather than the unapproved `Kanyonyi enquiries` from section 6 (G19). No operator-specific mailbox is introduced. Optional flexibility is omitted if unset.
- `mail.veilcode.studio` is verified (handoff F4 supersedes the earlier section 6 snapshot). The local IP hash secret and branch-specific S8 Vercel Preview secret are configured without committing or logging them. Vercel overwrites the forwarded IP header ([request-header documentation](https://vercel.com/docs/headers/request-headers)); a different hosting/proxy setup must re-establish that trust boundary.
- `ENQUIRY_TEST_MODE=true` substitutes local storage and sends only in the Playwright server. Either Vercel marker makes this fail closed. Test headers cannot switch a deployed environment into this mode. Unit tests verify this boundary; the preview acceptance test must use real Neon and Resend.
- `drizzle-kit` preloads `.env`, which could override Next env loading. Local migration config explicitly chooses `.env.local` and rejects an endpoint shared with `.env`. SQL and metadata are committed; builds never migrate. `db:migrate:prod` loads `.env` only and asks for `migrate-main`. Dev is migrated and verified; production application and preview delivery are recorded below after acceptance.
- `db:purge` defaults to a dry run. `--apply` deletes demo rows older than 12 months, or unbooked live rows older than 24 months. The dry run returned zero eligible rows. Schedule production retention before October 2027; honour earlier deletion requests manually.
- The existing 2026 estimate small print remains verbatim although the 18-month picker extends beyond 2026 (G20). Long-field/invalid optional-choice messages reuse the approved generic required line or existing field error (G21); no new error copy was invented. A FactStamp accompanies the under-15 permit rule. Custom enquiries send GA estimated value zero; no personal fields are sent.
- Baseline: typecheck/lint, 206 unit tests and 120 browser tests passed (2 expected skips). S8 adds schema, date, estimate, escaping, failure-boundary, transport and environment tests; browser checks cover errors, stored success despite mail failure, bot handling, no-JS submission, WCAG 2.2 AA and 360px layout.
- MemPalace MCP tools were unavailable; these records are the durable session memory.

### Preview acceptance and production status

- Commit `029963e` built successfully. The protected S8 preview passes all 22 sitemap URLs (200, one H1, canonical and noindex), form axe WCAG 2.2 AA and 360px overflow checks. Desktop/mobile form layouts were inspected.
- An initial submission failed server configuration without a write/send: the stdin-added hash secret had a trailing newline. Storing the exact hex value via the non-interactive CLI value argument and redeploying fixed this. Do not append a newline to this secret.
- Real submission KX-1006 stored on Neon dev with two travellers, November 2026 and USD 3,300. The reference matches the screen and both mail bodies/subjects. Frank confirmed traveller inbox receipt at support@veilcode.studio. The operator copy initially hit an old July bounce suppression. Frank approved removal and retry; only the original operator payload was resent with `KX-1006:operator-retry-1`, because the original idempotency key would return the suppressed request. Resend reports the retry delivered to frank@veilcode.studio, and the synthetic dev row now records both flags `sent`. F20 is resolved; no second enquiry or traveller send was made.
- `sent` in the app means Resend accepted the request, not that the recipient server delivered it. Async bounces/suppressions require Resend monitoring; delivery webhooks are future work. S8 acceptance requires checking actual Resend delivery, not only the row's send flags.
- Dev migration is applied and tested. Automatic approval review initially required explicit production confirmation; Frank subsequently approved all pending actions. The dedicated confirmation runner applied the reviewed main migration. Read-only verification confirms 23 columns, the reference and traveller/residency/status constraints, both indexes, one migration and zero production enquiries. The newline-free production IP hash secret is configured as Sensitive in Vercel, and the merged production build is redeployed to load it. F21 is resolved. Local development still uses dev. S8 acceptance is complete; final S9/S10 audits and production enquiry smoke remain.
