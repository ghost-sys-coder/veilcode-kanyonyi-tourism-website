# Handoff: Kanyonyi Expeditions showcase build

**Written:** Sunday 4 October 2026, at the end of session S5, for the next coding agent.
**Deadline:** Friday 9 October 2026, hard stop (AGENTS.md section 0).

Read in this order before writing code:

1. `AGENTS.md`. Section 0 (the brief) overrides everything else. Section 38 describes MemPalace.
2. This file.
3. `docs/plan.md`: the session plan, open items ("Needs from Frank", copy gaps, conflicts) and the cut list.
4. `docs/decisions/001` to `004`: content model, URLs and SEO, enquiry flow, design tokens and components. Each ends with implementation notes from the sessions so far.
5. `docs/design/DESIGN.md`, then open `docs/design/reference/kanyonyi-reference.html` in a browser.
6. `docs/copy/`: approved copy, word for word. The content files already transcribe nearly all of it.

---

## 1. Where things stand

Sessions S1 to S5 are done and merged into `master` (PRs #1 to #4).

| Session | What it delivered |
| --- | --- |
| S1 Foundation | Design tokens in `app/globals.css`, fonts (`app/fonts.ts`), 22 shadcn base-nova components with brand class edits (listed in 004 section 3), content types (`types/content.ts`), price model (`lib/content/pricing.ts`), Vitest and Playwright set up |
| S2 Shell and SEO | Root layout (metadata, `noindex` on the demo, skip link, boot script), header, mobile menu, footer, demo notice, WhatsApp floating button, consent banner and GA4 (basic consent mode), 404 and error pages, `robots.ts`, `sitemap.ts`, `/llms.txt`, security headers, Organization, WebSite and Breadcrumb JSON-LD |
| S3 Content | Every page's copy as typed content in `content/`, a read layer in `lib/content/`, verbatim and integrity tests |
| S4 Photos | 15 Unsplash photos in `public/images/` with credits in `content/media.ts`, Open Graph crops, `components/media/site-image.tsx` |
| S5 Tours | `/tours/[slug]` (6 prerendered pages) and `/tours` with URL filters (`features/tours/`), reusable content components |

**Pages that exist:** `/` (interim: hero copy and photo only), `/tours`, `/tours/[slug]`, the 404 page, `/styleguide` (development only).
**Pages still to build:** see section 4. All of their copy is already in `content/`.

**Checks at handoff:** `tsc` and lint clean, 201 Vitest tests, 54 Playwright tests (2 skips by design).

---

## 2. Commands

```bash
npm run dev            # Frank often already runs this on :3000; don't start a second one
npm run typecheck      # tsc --noEmit (run `npx next typegen` first after adding routes)
npm run lint
npm test               # Vitest: content, pricing, filters, SEO, media
npm run test:e2e       # Playwright: builds, then serves production on :3100 (workers: 2)
npm run build
```

`npx playwright install chromium` is already done on Frank's machine.

---

## 3. Conventions and gotchas (read these; each one cost time)

### Rules from AGENTS.md that tests enforce
- **Copy is word for word.** `tests/unit/content-verbatim.test.ts` fails if any string in `content/` isn't in `docs/copy/`, after stripping Markdown. Put new page copy in `content/pages/*.ts` and export it from `lib/content/all.ts` so the test covers it. Never hardcode copy in components. If text is missing, use the nearest existing line and list the gap in `docs/plan.md` (gaps G1 to G14 so far).
- **Content flows one way.** It lives in `content/`. Pages read it through `lib/content/*` (`getTour`, `getDestination`, `getGuide`, `resolveLink`, `getMedia`, `getMonthNotes`), and components get props.
- **One React component per `.tsx` file.** The exception is `components/ui/` (shadcn files).
- **Server components by default.** Keep client boundaries small.

### Base UI (shadcn base-nova), not Radix
- **Link styled as a button:** `<Link className={cn(buttonVariants(...), "extra")}>`. Never use `<Button render={<Link/>} nativeButton={false}>`, which adds `role="button"`. Always merge with `cn()`: `buttonVariants({ className })` only concatenates, so a base class like `inline-flex` beats `hidden`.
- **Triggers** use `render={<Button .../>}`, not `asChild`.
- **Select:** `items` on the root, with the placeholder as `{ value: null }`.
- **ToggleGroup:** single by default, `value`/`defaultValue` as arrays. Add `className="flex-wrap"` or it overflows on phones.
- **Accordion:** use `hiddenUntilFound` (see `components/content/faq-list.tsx`), or closed answers vanish from the HTML.
- **Tooltip** needs the `TooltipProvider`, which the root layout already provides.

### React, Next and testing
- **No `setState` inside `useEffect`.** The lint rule rejects it. For outside state use `useSyncExternalStore` (`hooks/use-consent.ts`, `hooks/use-currency.ts`).
- **Grid overflow:** CSS grids that contain selects or long text need `grid-cols-1` on mobile, or a `minmax(0,1fr)` track. Otherwise you get sideways scroll at 360px.
- **Route types:** new dynamic routes need `npx next typegen` before `tsc` knows `PageProps<"/route/[slug]">`.
- **Images in Vitest:** static image imports resolve to path strings, not `StaticImageData`. See `tests/unit/media.test.ts`.
- **Unknown slugs** with `dynamicParams = false` make `next start` log `NoFallbackError`. The response is a correct 404.

### Design rules
- **Sun (yellow) is the single main action per viewport.** Home: "Find trips". Tour pages: "Ask about this trip". Enquiry page: "Send enquiry". The header's "Plan my trip" and the WhatsApp button are forest green.
- **Prices:** use `<Price usd={n} />`. It renders both USD and UGX, and CSS shows the active one. Money formats are in `lib/content/money.ts`.
- **Images:** go through `<SiteImage media={{ id }} preset="hero|card|inline" />`. Pass `sizes` when the image sits in a narrower column than its preset.
- **Breadcrumbs and JSON-LD:** `<SiteBreadcrumb trail=[...] />` emits the matching JSON-LD. Builders live in `lib/seo/schema.ts`. Never emit Offer, Review, AggregateRating, LocalBusiness (including TravelAgency), PostalAddress or Person; a test checks this.
- **Page metadata:** `export const metadata = pageMetadata("/path", { image })` from `lib/seo/page-metadata.ts`. Every route needs an entry in `content/meta.ts`; the sitemap is built from it.
- **Analytics:** `track()` from `lib/analytics/track.ts`, with event names only from `lib/analytics/events.ts` (AGENTS.md section 25). `TrackView` and `TrackLink` live in `components/analytics/`.

### Reusable components
- **`components/content/`:** `AtAGlance`, `FaqList`, `InclusionList`, `KeyFactsStrip`, `FactStamp`, `RelatedLinks`, `Price`.
- **`components/layout/`:** `Section`, `CloseCta` (`sun` prop; `tourSlug` pre-fills the enquiry), `OnThisPage`, `SiteBreadcrumb`, `WhatsAppLink`.
- **`features/tours/components/`:** `TripCard`, which the home and destination pages will reuse.

---

## 4. What's left (docs/plan.md has the full checklist)

| Session | Scope | Notes |
| --- | --- | --- |
| **S6** | `/destinations` hub, `/destinations/[slug]` (4), `/guides` index, `/guides/[slug]` (3), `/faq`, `/about`, `/booking-terms`, `/privacy` | All copy is in `content/`. Guides use the block model (`GuideBlock`, including `permitTable` from `content/facts.ts` and `monthEntry`). Destination pages show "Tours that visit" via `getToursForDestination`. JSON-LD: TouristDestination with `sameAs`, Article for guides, FAQPage, ItemList on hubs, AboutPage. Policies show `demoPolicyNotice` and use `pickVariant()` from `config/demo.ts`. Done when every sitemap URL returns 200, with one h1 and a valid canonical |
| **S7** | Full homepage (`content/pages/home.ts`, 10 sections) | Trip finder (Experience, Month as the next 12 months, Length; "Find trips" is sun) goes to `/tours?experience=&month=YYYY-MM&length=` and fires `tour_search`. Reuse `parseFilters`/`toQueryString` from `features/tours/lib/filters.ts`. Month picker is a ToggleGroup of 12 bars coloured by `seasons.ts` `kind` (gap G13). Permit table from `content/facts.ts` (home columns). Set `revalidate = 86400` so the finder's month list rolls daily |
| **S8** | Enquiry flow, `/plan-your-trip` | Fully specified in decision 003 and `content/pages/plan-your-trip.ts` (field errors, placeholders, stepper labels, demo success state). Packages are already installed: zod, drizzle-orm, @neondatabase/serverless, drizzle-kit. Neon: `.env.local` is the `dev` branch and `.env` is `main`; migrate `dev` first. Resend is called over its REST API with `fetch` (no SDK), from `EMAIL_FROM` (`mail.veilcode.studio` is verified). Add `IP_HASH_SECRET` to `env.example`, `.env.local` and Vercel. Write `content/emails.ts` from 11-emails-and-meta.md (demo and live traveller emails, operator email) and add it to the verbatim test |
| **S9** | Verification | Sitemap crawl test, axe on every template, Lighthouse, Schema validator, and a re-check of the yellow fever rule and UWA fees (12-fact-register.md) |
| **S10** | Ship | Production env, production migration, deploy, smoke test, `docs/launch-notes.md` |

Cut order if time runs short: `docs/plan.md`, "What gets cut first".

---

## 5. Environment and accounts

- **Variables:** names in `env.example`.
  - `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_DEMO_MODE` (only the exact value `false` turns demo mode off), `NEXT_PUBLIC_WHATSAPP_NUMBER`
  - `DATABASE_URL`, `DATABASE_URL_UNPOOLED`
  - `RESEND_API_KEY`, `EMAIL_FROM`, `ENQUIRY_NOTIFY_TO`, `EMAIL_REPLY_TO`
  - `NEXT_PUBLIC_GA_MEASUREMENT_ID`
  - Still to add: `IP_HASH_SECRET`
- **Vercel:** project `veilcode-tourism`, live at `kanyonyi.veilcode.studio`. Preview uses Neon `dev`, Production uses `main`. Database values are marked Sensitive and can't be read back.
- **Secrets:** never print or commit them, and never file them in MemPalace.

---

## 6. Open items for Frank (also in docs/plan.md)

- Approve the `--input` border colour `#7F8D86`, which deviates from DESIGN.md for WCAG 1.4.11 (004 section 3).
- G7: the destinations hub has a map caption but no map. The caption shows above the table.
- G13: the month legend has no label for March's "Long rains begin".
- G14: no free Nile rafting photo exists; the Jinja card shows a Nile tour boat.
- F18: the GA ID is also set for Preview and in local `.env`, so test visits reach GA unless filtered.

---

## 7. MemPalace

Wing `kanyonyi`, local palace (AGENTS.md section 38). For Codex, register the MCP server with `codex mcp add mempalace -- mempalace-mcp`. If the tools aren't loaded, the same functions are available through MemPalace's own Python:

```bash
"$(uv tool dir)/mempalace/Scripts/python.exe" -c "from mempalace.mcp_server import tool_kg_query; print(tool_kg_query(entity='tour_pages'))"
```

- **Diary:** entries per session, agent `claude-code`, topics `phase-01`, `s1-foundation` … `s5-tours`, `handoff`.
- **Record keeping:** keep using the closed predicate set. Update `docs/decisions/` first, then the knowledge graph.
- **`.kilo/` is ignored.** Another tool's worktree there once doubled every drawer.
