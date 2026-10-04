# Kanyonyi build plan: Phases 02 to 05

**Written:** Sunday 4 October 2026 (end of Phase 01)
**Hard stop:** Friday 9 October 2026. Whatever works on that date ships.
**Decisions this plan relies on:** [001 content](decisions/001-content-architecture.md) · [002 URLs and SEO](decisions/002-url-and-seo-architecture.md) · [003 enquiry flow](decisions/003-enquiry-flow.md) · [004 tokens and components](decisions/004-design-tokens-and-components.md)

---

## Needs from Frank

Status as of Sunday 4 October 2026, second review. Resolved items are listed at the end of this section.

| # | What | Blocks | By |
| --- | --- | --- | --- |
| F16 | Destinations hub "Map caption" with no map (G7). Caption is shown above the drive-time table; later copy gaps are listed below | None; fallback shipped | Wed |
| F18 | **GA on Preview and local `.env`.** Still set there as of 4 Oct, so test visits reach GA unless the internal-traffic filter is on. Frank's call; no build impact | None | Any time |

**Resolved on 4 October:** WhatsApp number (F1) · reference HTML path (F2) · Vercel and domain live (F3) · basic Consent Mode confirmed (F5) · photo sourcing, Unsplash/Pexels per 13-photo-brief.md (F7) · price model for 1 to 12 travellers (F8) · demo policy text (F9) · status colours (F11) · logo and favicon (F12) · DESIGN.md typo (F14) · AGENTS.md email address restored to frank@veilcode.studio (F17) · `/guides` index added to 06-guides.md (F15, C5) · Neon branches decided in AGENTS.md default 6 (F6) · `mail.veilcode.studio` verified in Resend (F4) · `DATABASE_URL_UNPOOLED` added (F13) · form placeholders, stepper labels, field errors, error summary and custom estimate added to 08-plan-your-trip.md (G1, G2, G3, G11) · MemPalace block restored in AGENTS.md section 38 (F19) · Neon `dev` branch created, `.env.local` points at it and both strings connect, Postgres 18 (4 Oct) · Resend vars added to Vercel Preview; Preview/Production DB strings confirmed by Frank (F18).

**S8 acceptance resolved, 4 October:** Frank approved all pending actions. The old frank@ bounce suppression was removed and the KX-1006 operator retry delivered (F20). The reviewed migration applied to Neon main and a Sensitive production IP hash secret was configured (F21). Local development still uses dev. PR #8 is merged.

## Copy gaps (text the layout needs that isn't in docs/copy/)

Per the brief, I'll use the nearest existing line and list each one here. Nothing is invented silently. G4, G5, G8 and G10 are resolved by the 02-global.md interface strings and 13-photo-brief.md, and G6 by the demo email.

| # | Where | Need | Nearest existing line used until approved |
| --- | --- | --- | --- |
| G7 | Destinations hub "Map caption" | The copy implies a map, but there is no map asset | Caption shown above the drive-time table, no map |
| G9 | Destination closing body for Kibale, Queen Elizabeth, Murchison | Heading and button only in the copy | Rendered without a body (fine if intended) |
| G12 | Operator notification in demo mode | The copy has one version only | Same email in both modes (it only goes to frank@) |
| G13 | Home month picker legend | The copy's legend has three entries (Drier months, Green season, Short rains) but March's season is "Long rains begin" | March and October share the rains colour and the "Short rains" legend entry. Frank: add a legend label for March, or confirm |
| G14 | Jinja tour card (shot 11) | The brief asks for a raft in white water; no free Unsplash photo of Nile rafting exists | A tour boat on the Nile at Jinja (the tour includes a source-of-the-Nile boat trip). Swap if Frank has a rafting photo |
| G15 | FAQ and policy closing sections (S6) | No page-specific closing copy is provided, but 002 requires a next action | FAQ reuses the guides index's "Still have questions?" and WhatsApp action. Policies reuse about's "Ask us anything" body and "Plan my trip" |
| G16 (resolved S8) | Interim /plan-your-trip (S6) | The S6 sitemap criterion includes the S8 form route, but no temporary-page copy is supplied | Approved hero and contact/hours, plus the nearest existing demo/live reply line. Form-storage and confirmation-email promises are omitted until S8 replaces the interim page |
| G17 | Best-time guide closing stamp (S6) | It repeats permit fees but has no dedicated stamp block | Uses the approved global fact stamp from 02-global.md through optional `Guide.factStamp` |
| G18 | Rolling homepage month choices (S7) | April/May/November notes and the green-season legend mention discounted permits, confirmed only for 2026, but the next 12 months reach 2027 | For 2027 and later, use the approved weather-only lines: April "The wettest month in most parks.", May "Forest trails can be muddy; good boots and a porter matter more now.", November "Good for birding." Show the existing "Travelling in 2027?" notice. The listing uses the same fallback and limits cheaper-permit badges to 2026. The approved legend remains unchanged; Frank should supply year-specific notes and a weather-only legend |

| G19 | Operator From name | Decision 003 says "Kanyonyi enquiries", absent from approved copy | Use the approved "Kanyonyi Expeditions" name for the operator notification |
| G20 | Enquiry estimates beyond 2026 | The 18-month picker extends beyond the cost inputs' confirmed dates | Keep the exact approved 2026 standard-season estimate note; the quote confirms the actual price. Frank should supply later-year estimate copy/rates |
| G21 | Form bounds and invalid optional choices | Dedicated maximum-length / invalid-choice errors are absent for names, notes, flexibility and under-15 | Reuse the existing name/email/phone errors or the approved generic "Please add your {field}." line with the field label. Frank should approve specific bound/choice errors |

## Conflicts found, with proposed resolutions

| # | Conflict | Proposed resolution |
| --- | --- | --- |
| C6 | 06-guides.md: show "Updated {date}" under the H1, while each guide's eyebrow above the H1 already reads "Guide · Updated 4 October 2026" | Show it once, in the eyebrow, using the 02-global.md format and `dateModified` |
| C7 | DESIGN.md 10.1: trip finder results "crawlable" in the URL, versus AGENTS.md section 13 on avoiding near-duplicate pages | Filtered URLs work and can be shared, but canonicalise to `/tours`. All six tours are in the static HTML (002 section 4) |
| C9 | AGENTS.md section 42 lists "Activities" (Phase 03) and "CRM integration" (Phase 05) | Activities are sections on destination pages. The `enquiries` table is the lead record. No CRM |
| C10 | AGENTS.md section 8 lists shadcn `Form`. The installed `base-nova` style uses `Field` | Use `Field`. No react-hook-form (003 section 11) |
| C12 | `app/globals.css` maps `--font-sans: var(--font-sans)`, which refers to itself | Fixed in S1 (004 section 2) |
| C13 | 04-tours.md: "Tours with gorilla permits subtract USD 200" in low season. Tours 4 and 5 also include a chimp permit, whose low-season discount is USD 50, and tour 3 is chimp-only with no discount in the formula | Follow the copy exactly (USD 200 for tours 1, 4, 5; nothing for tour 3). Only tour 1's table shows a low-season column, and the estimate is standard season only, so this affects nothing rendered today |
| C14 | 13-photo-brief.md lists 27 images. The plan budgeted one session for 15 | Shots 1 to 11 and 24 to 27 (15 images) in S4. Galleries (shots 12 to 23) stay first on the cut list, with the brief's `--muted` placeholder rule covering any gap |

**Resolved on 4 October:** C1 (sun placement), C2 (reference path), C3 (shadcn class edits), C4 (no phone), C8 (month behaviour), C11 (demo email and success state).

## Build order

Sessions are about 3 to 4 focused hours. There are two per day, Monday to Thursday, and Friday is QA and ship. The order is adjusted from AGENTS.md section 42: tours (Phase 04) come **before** the homepage and destination pages, because both render trip cards. The Resend subdomain (F4) should be verified on Monday, so Thursday's enquiry build isn't blocked on DNS.

Every session ends with `npm run lint`, `npx tsc --noEmit`, `npm test`, a commit on a feature branch, and (from S2 on) a Vercel preview deploy.

### Monday 5 October

**S1. Foundation (Phase 02)**: done 4 October 2026, branch `s1-foundation`
- Install dependencies (003 section 11). Add `vitest.config.ts`, `playwright.config.ts`, `npm run` scripts and `.env.example`
- Tokens and fonts into `globals.css` and `app/fonts.ts` (004 sections 1 and 2). Contrast check for the status colours
- shadcn: adjust `button`, `badge`, `input`, `textarea`, `select` and `card`; add the 16 components from 004 section 4
- `types/content.ts`, `content/site.ts`, `content/ui.ts`, `content/meta.ts`, `lib/content/inline.tsx` and its tests
- *Done when:* a styles page in dev shows every button, input and type size on the brand tokens

**S2. Shell and SEO infrastructure (Phase 02)**: done 4 October 2026, same branch. Interim homepage shows the approved hero only until S7
- Root layout: `metadataBase`, title template, robots meta, skip link, demo notice, header (desktop nav, currency toggle, CTA), mobile menu sheet, footer, `not-found.tsx`, `error.tsx`, `global-error.tsx`
- `robots.ts`, `sitemap.ts` (from a content index stub), `llms.txt/route.ts`, `X-Robots-Tag` and security headers in `next.config.ts`, `json-ld.tsx` with Organization and WebSite, breadcrumb component
- Analytics: consent script, consent banner, `track()`, cookie settings link
- WhatsApp FAB and `whatsapp-link.tsx`
- **First real deploy to `kanyonyi.veilcode.studio`**, replacing the default page
- *Done when:* the deployed shell returns `noindex` in both the header and the meta tag, and robots, sitemap and llms.txt resolve with the right host

### Tuesday 6 October

**S3. Content entry (Phases 03 and 04 data)**: done 4 October 2026, branch `s3-content`
- Transcribe all six tours, four destinations, three guides, FAQ, seasons, facts and every `content/pages/*.ts` from `docs/copy/`, word for word
- Content integrity tests (001 section 5): slugs, refs, prices, derived tour lists, meta lengths, banned phrases, em dashes, `[CLIENT:` leakage
- *Done when:* `npm test` passes with all content present

**S4. Photography and media**: done 4 October 2026, branch `s4-photos`
- Source shots 1 to 11 and 24 to 27 from 13-photo-brief.md, following its subject rules, alt and caption patterns. Record attribution, process with `sharp` (max 2400px, OG crops), and fill in `content/media.ts`. Lift the bird mark SVG from the reference file for the logo and favicon
- `site-image.tsx` with size presets, plus caption and credit rendering
- *Done when:* every `MediaRef` resolves and card images are under 200 KB

### Wednesday 7 October

**S5. Tours (Phase 04)**: done 4 October 2026, branch `s5-tours`
- `trip-card`, `trip-grid`, `price` (dual currency), `key-facts-strip`, `at-a-glance`, `itinerary-day`, `inclusion-list`, `fact-stamp`, `close-cta`
- `/tours/[slug]` (all nine sections in order, TouristTrip and FAQPage JSON-LD, breadcrumbs, related links, `tour_view`)
- `/tours` with `tour-filters` (chips, sort, `?experience`, `?length`, `?month`), the results line, the empty state, the price note, the 2027 callout and the ItemList JSON-LD
- *Done when:* all six tour pages render on a 360px viewport, and the filters produce the copy's results line and empty state

**S6. Destinations, guides, FAQ, about, policies (Phase 03)**: done 4 October 2026, branch `s6-pages`
- `/guides` index (06-guides.md), `/destinations` hub and `/destinations/[slug]` (TouristDestination, FAQPage, derived "Tours that visit")
- `/guides/[slug]` (block renderer, jump links, Article JSON-LD, `permit-table` with its stamp)
- `/faq` (Accordion, FAQPage, stamp), `/about`, `/booking-terms`, `/privacy` (with the demo policy notice)
- *Done when:* every URL in the sitemap returns 200 locally, with one `<h1>` and a valid canonical
- Verified: all 22 sitemap URLs return 200, have one H1 and a self canonical. Each new route passes axe WCAG 2.2 AA on mobile and desktop, plus no horizontal page scroll at 360px. Typecheck and lint pass; 203 Vitest tests and 104 Playwright tests pass (2 expected skips). Playwright builds and tests production on port 3100
- Delivered the four destination pages and hub, three guides and index, FAQ, about and both demo policies. Shared `PermitTable`, guide block renderer, content table and back-to-top link are ready for S7 reuse. G7/G9 remain as documented; G15–G17 record the nearest approved copy used
- Added an interim `/plan-your-trip` WhatsApp page to satisfy the sitemap criterion while keeping the full form/storage/emails in S8. S8 must replace it; S7 must still build the full homepage
- MemPalace MCP tools were unavailable in the Codex session, so no graph or diary results were invented. Decision records and `docs/handoff.md` contain the session record

### Thursday 8 October

**S7. Homepage (Phase 02)**: done 4 October 2026, branch `s7-home`
- Review: [merged PR #7](https://github.com/ghost-sys-coder/veilcode-kanyonyi-tourism-website/pull/7). Vercel built commit `deafa8a` successfully; its preview requires Vercel login, so the unauthenticated smoke request reached the login page rather than the app
- Hero (photo, `priority`), trip finder (`tour_search` → `/tours?…`), four promises, signature trips, permit section, month picker, destinations, how booking works, reviews placeholder, three questions, closing CTA
- Currency toggle with no flash on load
- *Done when:* home LCP is the hero image, there's no layout shift from fonts or images, and the sun rule holds (C1)
- Delivered all ten sections from approved content, a Base UI trip finder with `tour_search`, keyboard month bars, six signature trips, four park cards, permit fees/stamps, booking steps, demo-only review placeholder, FAQ and closing actions
- Verified in production: hero image is the LCP element on mobile and desktop; initial CLS is at most 0.01; only one sun action is visible in the tested viewports. Home passes axe WCAG 2.2 AA and no overflow at 360px. Open-select scans exclude only Base UI's invisible focus redirectors; all real controls/options are audited and Escape/Tab focus is tested (004 S7 notes)
- Typegen, typecheck, lint and production build pass. 206 Vitest tests and 120 Playwright tests pass (2 expected skips); all 22 sitemap URLs still pass the crawl. Desktop and 360px hero/month layouts were inspected
- G13 remains; G18 records future-year weather/fee copy fallbacks. Fixed the listing's unconfirmed future discount badges/notes while preserving its filters and canonical
- The header is opaque for contrast over the dark band. Display XL retains 44–96px but grows more gradually for the full approved H1; both changes are recorded in 004. Playwright output/report folders are ignored by ESLint to avoid a generated-directory scan race
- MemPalace MCP tools remain unavailable; documentation carries the session record. S8 is next and must replace the interim enquiry contact page

**S8. Enquiries (Phase 05)**: done 4 October 2026, branch `s8-enquiries`, merged in PR #8; acceptance follow-up on `s8-acceptance`
- Replace S6's interim `/plan-your-trip` WhatsApp contact page with the form and full side panel. The interim `interimBody` content can then be removed
- Drizzle schema, first migration, `npm run db:migrate` against the Neon dev branch, then production
- Zod schema, `submit-enquiry` action, repository, rate limit, honeypot, `services/email/resend.ts`, the email builders (demo and live traveller versions, operator notification), the 04-tours.md price model estimate, `db:purge` script
- `/plan-your-trip`: form, side panel, live estimate, success state, every error state, `?tour=` preselect, `start_enquiry` and `submit_enquiry`
- Unit tests: schema, estimate, reference format, reply-by date (EAT working days), email builders (escaping)
- *Done when:* a real submission from the preview deploy stores a row, both emails arrive (traveller and frank@), and the reference matches across the screen, both emails and the database
- Implemented: full form, demo/live side panel and confirmations, authoritative Zod validation, standard-price/currency estimate, atomic three-per-ten-minute rate limit, honeypot, sequence references, escaped HTML/plain text and two independent Resend sends. No dependency added
- Verified locally: typegen/typecheck/lint and production build; 253 unit tests, 2 real dev-database integration tests and 142 Playwright tests pass (2 expected skips). The final token/stamp adjustment passes all 22 enquiry tests on mobile and desktop. No-JavaScript submission, network/storage/rate/mail failures, bot handling, PII-free analytics, axe and 360px wrapping are covered
- Dev migration applied; fixture rows removed; retention dry run reports zero eligible rows. Schedule production retention before October 2027 and monitor failed/pending email-status rows manually
- Real preview: [merged PR #8](https://github.com/ghost-sys-coder/veilcode-kanyonyi-tourism-website/pull/8), implementation commit `029963e`, [protected preview](https://veilcode-tourism-git-s8-enquiries-ghostsyscoders-projects.vercel.app). KX-1006 is saved on Neon dev with the correct USD 3,300 estimate; its reference matches the screen and both email bodies/subjects. Frank confirmed support@ received the traveller confirmation. After explicit approval, the old July bounce suppression was removed and only the operator notification retried; Resend reports delivery to frank@. Both dev send flags are now `sent`; no second enquiry or traveller send was created
- Preview additionally passes the real 22-route sitemap crawl, form axe WCAG 2.2 AA and 360px overflow check. The first submission failed configuration before storage/mail because stdin supplied a trailing newline in the hash secret; the newline-free secret and redeploy resolved it
- After explicit approval, the dedicated production runner applied the reviewed main migration. Read-only verification confirms 23 columns, the sequence-backed reference, database constraints, both indexes, one migration and zero production enquiries. Vercel Production has the newline-free Sensitive IP hash secret. The merged production build is redeployed to load it. Local development continues to use dev; S9/S10 audits and the final production enquiry smoke test remain
- Production read-only smoke: all 22 sitemap URLs return 200 with one H1, a self canonical and noindex. The form has zero axe WCAG 2.2 AA violations and no horizontal overflow at 360px. No production enquiry or email was created
- MemPalace MCP tools remain unavailable; decision 003 and handoff carry the session record. No diary results were invented

### Friday 9 October (ship day)

**S9. Verification (morning)**: done 5 October 2026, branch `s9-verification`
- Review: [PR #10](https://github.com/ghost-sys-coder/veilcode-kanyonyi-tourism-website/pull/10), stacked on the open acceptance docs PR #9. Implementation `a9de3d1` has a successful Vercel check; its protected preview passes the 22-route crawl and home/form axe at 360px. Merge #9 first and retarget #10 to master
- Playwright: enquiry happy path (email sending stubbed with a test env flag), validation errors, rate limit, every sitemap URL (200, one h1, canonical, noindex), `@axe-core/playwright` on one page of each template, a mobile 360px pass
- Lighthouse on home, a tour page and plan-your-trip (mobile)
- Schema Markup Validator on one URL per template, recorded in `docs/research/seo-validation.md`
- **Re-check the yellow fever rule and UWA figures** (12-fact-register.md flags yellow fever as two days old)
- Fix list triage: fix what blocks a demo and log the rest
- Final checks: typegen/typecheck/lint/build pass; 253 unit tests and 146 Playwright tests pass (2 expected skips). All 22 sitemap pages fit at 360px with valid internal links/fragments, one H1, canonical, metadata/OG and both noindex signals. Fuller axe tags include WCAG 2.1 A; the shared logo now derives its accessible name from its visible text, fixing Label in Name. The finder test waits for the closing popup animation correctly
- Schema Markup Validator fetched all 12 representative templates with zero errors and warnings. Google's Rich Results Test returned "Log in and try again" without a result; Frank should run the decision 002 Google checks from a signed-in browser during S10. No Google pass is claimed
- Mobile Lighthouse production scores: home 84, tour 78, form 85; accessibility/best practices 100. SEO 69/69/66 is reduced only by required demo noindex. JavaScript blocking time is a logged follow-up, not a demo blocker. See `docs/research/s9-verification.md` and `docs/research/seo-validation.md` for evidence and limits
- Primary UWA scanned notice and the dated official yellow-fever entry notice rechecked; the published copy needs no changes. Older immigration FAQ and unspecified discount expiry are documented in the fact register. Existing G18/G20 future-year gaps remain
- MemPalace MCP tools unavailable; durable docs carry the session record. No production enquiry or email sent in S9

**S10. Ship (early afternoon, stop by 17:00 EAT)**
- Production env vars confirmed, production migration applied, production deploy
- Smoke test on `kanyonyi.veilcode.studio`: one real enquiry, a WhatsApp link on mobile, consent accept and reject, `noindex` present
- Run the remaining decision 002 Google Rich Results checks from a signed-in browser (the S9 service attempt required login). Keep noindex; per-template Schema Markup Validator already passes
- Update `docs/decisions/` with anything that changed, and write a short `docs/launch-notes.md` (what shipped, what was cut, known issues)

## What gets cut first if we fall behind

Cut from the top. Each line names what replaces the cut item, so the page still works.

1. **Galleries** on tours and destinations → hero image only (already the minimum set)
2. **Per-page OG crops** → one site-wide default OG image
3. **Currency toggle** → USD only. The tooltip copy isn't used
4. **Month picker interactivity** → a static, accessible 12-row table of the same month notes, with a "Show {Month} trips" link per row
5. **`?month=` and sort options on /tours** → category chips only
6. **`schema-dts` types** → plain objects. The forbidden-types unit test stays
7. **Full Playwright suite** → keep only the enquiry happy path and the sitemap crawl. Run axe on home and one tour page
8. **Traveller confirmation email HTML** → plain-text email only (the operator notification is already plain text)

**Never cut:** enquiry storage and both emails, the WhatsApp links, `noindex` on the demo, all six tour pages, fact stamps on every page that shows permit or entry facts, demo labelling, keyboard and screen reader basics on the form and nav, mobile layout.

## Risks

| Risk | Mitigation |
| --- | --- |
| Resend domain verification or DNS is slow | F4 started Monday. Until it verifies, Resend's test sender only delivers to the account owner's address, which is enough to build and test S8 |
| Image sourcing takes longer than one session | Minimum 15 images. Galleries are cut first |
| Content transcription errors (word-for-word rule) | Done once, in a single session, then a side-by-side review of each tour page against the copy file during S9 |
| Base UI (base-nova) components behave differently from Radix examples | Read each component's generated source before using it. Don't rely on Radix-era APIs (`asChild` becomes `render` in Base UI) |
| Facts change before launch (yellow fever, UWA 2027 rates) | Re-check in S9. The register and content are updated together |
