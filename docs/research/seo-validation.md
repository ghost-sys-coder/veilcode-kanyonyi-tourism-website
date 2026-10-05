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

## Assigned to S9 at the S6 handoff

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
- [Draft PR #7](https://github.com/ghost-sys-coder/veilcode-kanyonyi-tourism-website/pull/7) is ready for review. GitHub's Vercel check reports SUCCESS for implementation commit `deafa8a`. The [preview](https://veilcode-tourism-git-s7-home-ghostsyscoders-projects.vercel.app) redirects unauthenticated visitors to `vercel.com/login` (title "Login – Vercel"); the returned 200 is the login page, not a homepage smoke pass. Open it with Frank's Vercel session for deployed review.

## S9 external schema validation (5 October 2026)

[Schema Markup Validator](https://validator.schema.org/) fetched and rendered the public production URLs below. Its actual response payloads confirmed each requested URL, `isRendered: true`, `totalNumErrors: 0` and `totalNumWarnings: 0`. UI results were checked too. These checks used production master `8a70d88`; the S9 logo change does not alter structured data.

| Template / URL | Detected top-level groups | Errors | Warnings |
| --- | --- | --- | --- |
| `/` | WebSite | 0 | 0 |
| `/tours` | BreadcrumbList, ItemList, WebSite | 0 | 0 |
| `/tours/3-day-bwindi-gorilla-trek` | TouristTrip, BreadcrumbList, WebSite, FAQPage | 0 | 0 |
| `/destinations` | BreadcrumbList, ItemList, WebSite | 0 | 0 |
| `/destinations/bwindi` | BreadcrumbList, WebSite, TouristDestination, FAQPage | 0 | 0 |
| `/guides` | BreadcrumbList, ItemList, WebSite | 0 | 0 |
| `/guides/uganda-gorilla-permits` | BreadcrumbList, Article, WebSite | 0 | 0 |
| `/faq` | BreadcrumbList, WebSite, FAQPage | 0 | 0 |
| `/about` | BreadcrumbList, WebSite, AboutPage | 0 | 0 |
| `/plan-your-trip` | BreadcrumbList, WebSite | 0 | 0 |
| `/booking-terms` | BreadcrumbList, WebSite | 0 | 0 |
| `/privacy` | BreadcrumbList, WebSite | 0 | 0 |

Organization is present as the WebSite publisher linked by its ID; the validator merges connected nodes rather than counting it as a separate top-level group. No Offer, Review, AggregateRating, LocalBusiness, PostalAddress or Person is emitted. Local recursive schema unit tests and browser assertions remain in place.

Raw validator payloads, concise JSON results and screenshots are retained in the ignored `playwright-report/s9/` folder. A first multi-test validator session displayed a stale previous result; those results were discarded. The final run used a fresh validator page per URL and verified the response's actual URL.

### Google Rich Results Test limitation

[Rich Results Test](https://search.google.com/test/rich-results) was opened and the public homepage submitted with the smartphone inspection option. It returned **"Something went wrong / Log in and try again"** without a result. Its screenshot and text are retained as `playwright-report/s9/rich-results-home.{png,txt}`. This is an external service sign-in limitation, not a passed test or a structured-data failure. The remaining per-template Google tests in decision 002 section 12 must be run from Frank's signed-in browser during S10. All per-template Schema Markup Validator checks above completed independently.

Keep the required demo noindex. A valid Schema.org result does not guarantee Google rich-result eligibility; the existing FAQ eligibility limitation in decision 002 remains applicable.

## S9 crawl, accessibility and performance

Final production-build tests cover all 22 sitemap URLs, title/description and Open Graph host/URL, both noindex signals, one H1 and self canonicals. All internal links and fragments resolve and every sitemap page fits at 360px. All template axe scans now include WCAG 2.1 A rules as well as the existing AA tags. The logo Label in Name fix is verified in both shared landmarks.

Typegen, typecheck, lint and production build pass; 253 unit tests and 146 Playwright tests pass, with two expected skips. Mobile Lighthouse scores, its intentional demo-indexing penalty, primary fact rechecks and triaged performance follow-ups are recorded in [S9 verification](s9-verification.md).

## S10 production and Google retry (5 October 2026)

S9 is merged via PR #11; the public production release is `c7ffd2e`. Its 22-page crawl and home/form axe checks at 360px pass, including both corrected logo names. See [S10 verification](s10-launch-verification.md) for the final browser-run timeout/retest, consent and enquiry delivery evidence.

Search Console ownership was not needed for the public tool. Current [Google help](https://support.google.com/webmasters/answer/7445569) says noindexed pages cannot use its URL test and supports arbitrary Code snippets. Decision 002's earlier contrary assumption is corrected; demo noindex stays enabled.

The actual public homepage JSON-LD was submitted in Code mode with the smartphone option. Google returned "Something went wrong / Log in and try again" again, without validation results. Screenshot/text are retained as `playwright-report/s10/google-code-result.{png,txt}`. The connected browser did not initialize, so no access to Frank's signed-in Google session is claimed. Per-template Google Code checks remain an external manual follow-up; no Google pass is reported. The 12 Schema Markup Validator results above remain valid.
