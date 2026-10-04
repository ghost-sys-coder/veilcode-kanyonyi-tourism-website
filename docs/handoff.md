# Handoff: Kanyonyi Expeditions showcase build

**Updated:** Monday 5 October 2026, through S10 production launch verification, for the next coding agent.
**Deadline:** Friday 9 October 2026, hard stop (AGENTS.md section 0).

**S6 update:** 4 October 2026, Codex. Merged into `master` as PR #6. **S7 update:** full homepage completed on `s7-home`, merged in PR #7. MemPalace MCP tools were not available, so this document and the decision records carry the session notes.

Read in this order before writing code:

1. `AGENTS.md`. Section 0 (the brief) overrides everything else. Section 38 describes MemPalace.
2. This file.
3. `docs/plan.md`: the session plan, open items ("Needs from Frank", copy gaps, conflicts) and the cut list.
4. `docs/decisions/001` to `004`: content model, URLs and SEO, enquiry flow, design tokens and components. Each ends with implementation notes from the sessions so far.
5. `docs/design/DESIGN.md`, then open `docs/design/reference/kanyonyi-reference.html` in a browser.
6. `docs/copy/`: approved copy, word for word. The content files already transcribe nearly all of it.

---

## 1. Where things stand

Sessions S1 to S9 are done and merged into `master`; S8 acceptance docs are merged in #9 and S9 in #11 (`c7ffd2e`). The duplicate stacked #10 is closed. S10 production release/smoke is verified; its launch record is on `s10-launch`. Google's external Code checks remain deferred after a service login error.
S8 is merged in [PR #8](https://github.com/ghost-sys-coder/veilcode-kanyonyi-tourism-website/pull/8), implementation commit `029963e`, then-master `8a70d88`. The protected preview passed authenticated checks. KX-1006 is stored on dev; Frank confirmed the support@ traveller confirmation, and Resend reports the frank@ operator retry delivered after its old bounce suppression was removed with explicit approval. The approved main migration and Sensitive production IP hash secret are verified. The production build was redeployed to load the secret. Acceptance documentation is merged in #9.

| Session | What it delivered |
| --- | --- |
| S1 Foundation | Design tokens in `app/globals.css`, fonts (`app/fonts.ts`), 22 shadcn base-nova components with brand class edits (listed in 004 section 3), content types (`types/content.ts`), price model (`lib/content/pricing.ts`), Vitest and Playwright set up |
| S2 Shell and SEO | Root layout (metadata, `noindex` on the demo, skip link, boot script), header, mobile menu, footer, demo notice, WhatsApp floating button, consent banner and GA4 (basic consent mode), 404 and error pages, `robots.ts`, `sitemap.ts`, `/llms.txt`, security headers, Organization, WebSite and Breadcrumb JSON-LD |
| S3 Content | Every page's copy as typed content in `content/`, a read layer in `lib/content/`, verbatim and integrity tests |
| S4 Photos | 15 Unsplash photos in `public/images/` with credits in `content/media.ts`, Open Graph crops, `components/media/site-image.tsx` |
| S5 Tours | `/tours/[slug]` (6 prerendered pages) and `/tours` with URL filters (`features/tours/`), reusable content components |
| S6 Pages | Destination hub and four parks, guides index and three guides, FAQ, about, demo booking terms/privacy, and an interim `/plan-your-trip` WhatsApp page |
| S7 Home | Full ten-section homepage, trip finder, month bars, shared cards/permit table, demo review placeholder, FAQ and closing actions; year-aware future fee copy and listing badges |
| S8 Enquiries | Full form and estimates, no-JS fallback, dev/main schema, storage, atomic rate limiting, escaped Resend emails and retention dry run; real preview storage and both deliveries verified |
| S9 Verification | Fuller axe rules and logo Label in Name fix; all-page metadata, internal-link/fragment and 360px crawl; mobile Lighthouse, external schema checks and primary fact recheck |
| S10 Launch | Production configuration/schema/deploy verified; 22-route crawl, mobile WhatsApp, live consent and one real main enquiry with both Resend deliveries; launch notes and external Google limitation recorded |

**Pages that exist:** all 22 sitemap URLs, the 404 page, and `/styleguide` (development only). Home and the full enquiry form/storage/emails are complete.
**Pages still to complete:** none in the current content cap. Production is verified on `c7ffd2e`. Google's additional per-template Rich Results Code tests remain an external manual follow-up: both URL and Code attempts returned a login error. Do not remove demo noindex to run a test.

**Checks after S7:** typegen/typecheck, lint and production build clean, 206 Vitest tests, 120 Playwright tests (2 skips by design). All 22 sitemap URLs pass the crawl. Home passes axe and the 360px overflow check; hero image is the measured LCP element on both profiles and initial CLS is at most 0.01.

**Checks after S8:** typegen/typecheck/lint/build pass; 253 unit tests, 2 real dev-database tests and 142 Playwright passes (2 expected skips). Protected preview passes all 22 sitemap URLs, form axe WCAG 2.2 AA and 360px overflow checks. KX-1006 reference and estimate match the screen, database and both email bodies. See `docs/research/enquiry-verification.md`.

**Checks after S9:** typegen/typecheck/lint/build pass; 253 unit tests and 146 Playwright passes (2 expected skips). Every sitemap page fits at 360px; all internal links and fragments resolve. All template axe scans include WCAG 2.1 A and pass; the logo's old overriding label omitted visible "Uganda" and is removed. All 12 Schema Markup Validator URLs pass with zero errors/warnings. Mobile Lighthouse performance: home 84, tour 78, form 85; blocking time is logged. Required noindex accounts for its SEO penalty. See `docs/research/s9-verification.md` and `docs/research/seo-validation.md`.

**S9 review:** merged via [PR #11](https://github.com/ghost-sys-coder/veilcode-kanyonyi-tourism-website/pull/11). Its implementation `a9de3d1` had a successful Vercel check and protected preview crawl/axe at 360px. The duplicate #10 is closed; #9 is merged. The S9 preview has its own branch-scoped Sensitive dev hash secret.

**S10 checks:** production deployment `veilcode-tourism-k5d7s3q71-ghostsyscoders-projects.vercel.app` is READY for master `c7ffd2e` and serves the public alias. All 22 routes pass status/H1/canonical/noindex, home/form pass axe at 360px, and mobile WhatsApp plus real analytics accept/reject/withdrawal pass. KX-1001 is the single synthetic main enquiry: November 2026, two travellers, USD 3,300; Resend reports delivered to both support@ and frank@. No retry/duplicate. Typecheck/lint/unit checks pass; the full browser run had one timeout, and that case passed unchanged with one worker. See `docs/launch-notes.md` and `docs/research/s10-launch-verification.md` for evidence and limits.

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
- **S7 hero:** display-xl remains 44–96px but now reaches its maximum at 1920px, to fit the approved long heading beside the photo. The header is opaque: translucent light ground failed contrast over the dark seasons band.
- **Breadcrumbs and JSON-LD:** `<SiteBreadcrumb trail=[...] />` emits the matching JSON-LD. Builders live in `lib/seo/schema.ts`. Never emit Offer, Review, AggregateRating, LocalBusiness (including TravelAgency), PostalAddress or Person; a test checks this.
- **Page metadata:** `export const metadata = pageMetadata("/path", { image })` from `lib/seo/page-metadata.ts`. Every route needs an entry in `content/meta.ts`; the sitemap is built from it.
- **Analytics:** `track()` from `lib/analytics/track.ts`, with event names only from `lib/analytics/events.ts` (AGENTS.md section 25). `TrackView` and `TrackLink` live in `components/analytics/`.

### Reusable components
- **`components/content/`:** `AtAGlance`, `FaqList`, `InclusionList`, `KeyFactsStrip`, `FactStamp`, `RelatedLinks`, `Price`.
- **`components/layout/`:** `Section`, `CloseCta` (`sun` prop; `tourSlug` pre-fills the enquiry), `OnThisPage`, `SiteBreadcrumb`, `WhatsAppLink`.
- **`features/tours/components/`:** `TripCard`, which the home and destination pages will reuse.
- **S6 additions:** `ContentTable`, `PermitTable` (guide/home columns), `BackToTop`, destination/guide cards, and `features/guides/components/guide-block.tsx` (all block types). `CloseCta` accepts an optional `secondary` node. New pages read approved copy through `lib/content/pages.ts` and permit data through `lib/content/facts.ts`.
- **Test server:** Playwright now uses `reuseExistingServer: false` to prevent testing a stale production build. Stop any test server left on port 3100 before running the suite. In the restricted Codex shell, process teardown needed an escalated test run; Frank's ordinary shell should not have that restriction.
- **About client swap:** fill `about.team.liveMembers` and `about.licences.live` with real client details. Sample identities are selected only in demo mode.
- **S7 months:** `features/home/lib/travel-months.ts` returns twelve months using Kampala time; home revalidates daily. Month links and the finder use the existing tours query helpers. `MonthNote.futureNote` contains approved weather-only fallbacks for 2027 and later; cheaper-permit badges are restricted to the confirmed 2026 promotion. See G18.
- **Open Select axe:** exclude only `[data-base-ui-focus-guard]` for the installed Base UI's intentionally hidden focus redirectors; actual options/triggers stay audited. Keyboard focus restoration/Tab order is tested. Closed-page audits have no exclusion.
- **Lint:** generated `test-results/` and `playwright-report/` are ignored, avoiding a race when Playwright replaces them during lint.

---

## 4. What's left (docs/plan.md has the full checklist)

| Session | Scope | Notes |
| --- | --- | --- |
| **S6: done** | Destinations, guides, FAQ, about and policies | `s6-pages`. All blocks, derived tours, allowed JSON-LD and demo variants implemented. See decisions 001/002/004 S6 notes and plan gaps G15–G17 |
| **S7: done** | Full ten-section homepage | `s7-home`, merged PR #7. Trip finder, month bars, cards and demo content are verified. See decisions 001/002/004 S7 notes and G18 |
| **S8: done** | Enquiry flow, `/plan-your-trip` | `s8-enquiries`, merged PR #8. Local tests pass (253 unit, 2 real DB, 142 browser; 2 expected skips). KX-1006 is stored in dev; both emails delivered. Main schema and production secret are configured after explicit approval; F20/F21 resolved. See 003 S8 notes |
| **S9: done** | Verification | Merged #11; automated checks, Lighthouse, all 12 external schema checks and primary fact recheck complete |
| **S10: production/smoke done** | Ship | Deployment/configuration/main schema and real enquiry/both deliveries verified; launch notes. Google Code tests remain an external manual follow-up |

Cut order if time runs short: `docs/plan.md`, "What gets cut first".

---

## 5. Environment and accounts

- **Variables:** names in `env.example`.
  - `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_DEMO_MODE` (only the exact value `false` turns demo mode off), `NEXT_PUBLIC_WHATSAPP_NUMBER`
  - `DATABASE_URL`, `DATABASE_URL_UNPOOLED`
  - `RESEND_API_KEY`, `EMAIL_FROM`, `ENQUIRY_NOTIFY_TO`, `EMAIL_REPLY_TO`
  - `NEXT_PUBLIC_GA_MEASUREMENT_ID`
  - `IP_HASH_SECRET` configured locally, as a branch-specific Sensitive S8 Preview value and as a Sensitive Production value, without trailing newlines. `.env.local` keeps local development on dev; `.env` is used only by the dedicated production migration runner
- **Vercel:** project `veilcode-tourism`, live at `kanyonyi.veilcode.studio`. Preview uses Neon `dev`, Production uses `main`. Database values are marked Sensitive and can't be read back.
- **Secrets:** never print or commit them, and never file them in MemPalace.

---

## 6. Open items for Frank (also in docs/plan.md)

- Approve the `--input` border colour `#7F8D86`, which deviates from DESIGN.md for WCAG 1.4.11 (004 section 3).
- G7: the destinations hub has a map caption but no map. The caption shows above the table.
- G13: the month legend has no label for March's "Long rains begin".
- G14: no free Nile rafting photo exists; the Jinja card shows a Nile tour boat.
- F18: the GA ID is also set for Preview and in local `.env`, so test visits reach GA unless filtered.
- G15–G17: closing copy reused from existing pages, interim enquiry-page copy, and the seasons guide's global fact stamp. No new wording was invented; review the choices in `docs/plan.md`.
- G18: supply year-specific month notes and a weather-only green-season legend. For future years the homepage/listing use existing weather lines and the approved 2027 rates notice rather than unconfirmed 2026 discounts.
- G19–G21: approved operator From name fallback, future-year estimate copy/rates, and specific maximum-length/invalid-choice errors still need copy review. Existing approved lines are used.
- **S8/S10 acceptance:** F20/F21 are resolved; KX-1006 dev and KX-1001 production deliveries are verified. Main schema/secret and production smoke are complete. Google Code checks remain an external manual follow-up; no indexing request should be made for this fictional demo.
- **Retention/monitoring:** schedule demo deletion before October 2027; `db:purge` defaults to dry run. App `sent` means accepted by Resend, not proven delivery; use Resend delivery logs as well as failed/pending rows until delivery webhooks/admin monitoring exist.

---

## 7. MemPalace

Wing `kanyonyi`, local palace (AGENTS.md section 38). For Codex, register the MCP server with `codex mcp add mempalace -- mempalace-mcp`. If the tools aren't loaded, the same functions are available through MemPalace's own Python:

```bash
"$(uv tool dir)/mempalace/Scripts/python.exe" -c "from mempalace.mcp_server import tool_kg_query; print(tool_kg_query(entity='tour_pages'))"
```

- **Diary:** entries per session, agent `claude-code`, topics `phase-01`, `s1-foundation` … `s5-tours`, `handoff`.
- **Record keeping:** keep using the closed predicate set. Update `docs/decisions/` first, then the knowledge graph.
- **`.kilo/` is ignored.** Another tool's worktree there once doubled every drawer.
