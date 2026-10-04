# S6 local page validation

Recorded 4 October 2026, branch `s6-pages`.

The source of truth is decision 002 and the installed Next.js guides for page files, `generateStaticParams`, metadata and JSON-LD. No external SEO data service was used and no search-volume claims are made.

## Verified

- A production-build Playwright crawl requests every URL from the generated sitemap on the local server. All 22 return 200, one H1 and a self canonical on the configured sitemap host. URL normalization handles the equivalent trailing-slash forms of the root canonical. Demo pages carry `noindex` in metadata and response headers.
- Every S6 route, including the interim enquiry contact page, passes axe tags `wcag2a`, `wcag2aa`, `wcag21aa` and `wcag22aa` on the mobile and desktop profiles. None causes horizontal page scroll at 360px.
- Breadcrumbs and JSON-LD parse. Hubs list their exact content inventory. Destination schema carries its sourced Wikipedia identity, country and visible activities. Guides carry their content headline, organization author, dates and image, and use article Open Graph metadata.
- The recursive unit check covers all page schema builders and rejects Offer, AggregateOffer, Review, AggregateRating, LocalBusiness, TravelAgency, PostalAddress and Person. Closed FAQ answers remain in the server HTML and match FAQPage entries.
- Browser checks cover all guide blocks, permit table columns and source stamp, all twelve months, related commercial links, derived destination tours, FAQ keyboard opening, sample team labels and demo policy variants.
- Typecheck and lint pass. Vitest: 203 passed. Playwright: 104 passed, 2 expected skips. The production build is part of the Playwright command.
- The required reference prototype was opened in Chromium before implementation. The destination hub at desktop size and permit guide at 360px were visually inspected.

## Still assigned to S9

External Schema Markup Validator/Rich Results Test, Lighthouse and the pre-launch check of UWA fees and the yellow-fever entry rule. Automated axe results cover the rules it can detect and do not replace manual accessibility review.

## Decisions for this build

Keep the current clean canonical paths, static content routes and noindex demo configuration. Keep FAQ answers present in HTML. Always build a fresh Playwright server to avoid a stale Windows process testing an old route set. Replace the interim `/plan-your-trip` contact page in S8 before describing the form, storage or emails as complete.

## S7 homepage validation (4 October 2026)

- All ten sections use approved content in order. Static HTML contains the six tours, park identities and FAQ answers. Links connect home to commercial routes and the permit/season guides; no extra or prohibited schema is emitted.
- Trip finder checks cover defaults, the twelve rolling month options, URL parameters, matching results and exactly one `tour_search` event. Unit checks cover year rollover at midnight in Kampala. Month bars support keyboard selection, keep one selected month and link to the same tours query contract.
- The next-twelve-months list exposed unconfirmed future discount claims. For 2027 and later, weather-only lines already in the copy deck replace the affected notes and the existing rates notice is shown. The tours results use the same fallback and never show cheaper-permit badges outside confirmed 2026 months. Copy gap G18 records the remaining legend/date wording need.
- Hero image is the measured LCP element on the mobile and desktop profiles. Initial browser CLS is at most 0.01 after image decoding and font readiness. Price restoration retains UGX without client-rendered prices and never converts official permit table currencies. Only one sun action is visible in the tested viewports.
- Home passes axe WCAG 2.2 AA and 360px overflow checks, including selected month and an open finder. Only Base UI's invisible focus guard nodes are excluded from the open-select audit; keyboard Escape and Tab are verified. The ordinary closed-page audit has no exclusion. Header opacity fixes a measured contrast failure over the forest band.
- Final checks: typegen, typecheck, lint and production build pass; 206 Vitest tests and 120 Playwright tests pass (2 expected skips). All 22 sitemap URLs still return 200 with one H1 and a self canonical. Desktop and 360px hero/seasons layouts were visually inspected.
- Lighthouse and external schema validators remain S9. These browser measurements are local lab checks, not field Core Web Vitals.
