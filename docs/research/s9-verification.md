# S9 verification, 5 October 2026

Branch: `s9-verification`, based on the S8 acceptance documentation branch. Scope: verification and demo blockers; no new pages, dependencies, pricing or marketing copy.

## Checks and fixes

- Baseline typegen, typecheck and lint passed; all 253 unit tests passed. The first browser run had a Chromium crash and an axe timeout while other browser audits overlapped. Neither recurred when the suite ran alone. That second run exposed the trip-finder test reading the closing experience popup together with the opening month popup. The test now waits for the month popup's 13 options; application behavior is unchanged.
- Lighthouse exposed a real WCAG 2.5.3 logo failure even though its scored accessibility category was 100. The overriding accessible label omitted the visible "Uganda" subline. The header/footer links now derive their names from the approved visible text. Both landmarks have a regression check.
- All template axe scans include `wcag21a`, previously omitted from the non-enquiry scans, along with `wcag2a`, `wcag2aa`, `wcag21aa` and `wcag22aa`.
- Final typegen, typecheck, lint and production build pass. Vitest: **253 passed**. Playwright: **146 passed, 2 expected skips**, on mobile and desktop with a freshly built production server and stubbed enquiry storage/email. There are no outstanding test failures.
- Every one of the 22 sitemap URLs returns 200, one H1, a self canonical, metadata description/title, same-origin Open Graph URL/image and demo noindex in metadata and headers. Every page fits at 360px. All rendered internal links point to sitemap pages and every internal fragment resolves to a real ID.
- Template axe scans report zero violations, including the form, open selectors, home, listing, guide, destination, FAQ, about, policies and 404. Existing keyboard/focus, no-JavaScript enquiry, consent rejection, error recovery, analytics and currency checks pass. Automated axe is not a substitute for a full assistive-technology review.
- The approved copy remains unchanged. The content verbatim test covers all six tours and the other content exports. Tour hero, facts, itinerary and price structure were checked against the deck; existing omissions in the 10-day tour are intentional. The reference prototype was opened and inspected before work.

## Mobile Lighthouse

Lighthouse 13.5.0, default mobile simulated throttling, sequential runs against the public production deployment of master `8a70d88`, before the S9 logo fix. Times below are lab measurements on this Windows machine, not field Core Web Vitals or a guarantee for other devices.

| Page | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | 84 | 100 | 100 | 69 | 1.3 s | 2.9 s | 450 ms | 0 |
| `/tours/3-day-bwindi-gorilla-trek` | 78 | 100 | 100 | 69 | 1.5 s | 2.8 s | 580 ms | 0.094 |
| `/plan-your-trip` | 85 | 100 | 100 | 66 | 1.2 s | 1.8 s | 510 ms | 0 |

- All three runs completed without Lighthouse run warnings. The SEO category's only failed scored audit is `is-crawlable`, caused by the required demo noindex. Do not remove it to improve the score.
- The unscored label-content-name audit failed on the old production logo; the fix is verified by the fuller final axe scans and explicit accessible-name assertions. The performance figures above are not presented as a post-fix production run.
- Main-thread JavaScript work and blocking time are the performance follow-up. The tour's measured CLS is below 0.1, but near the boundary. These are logged improvements, not demo blockers; no field performance claim is made.
- Standalone HTML and JSON reports are retained locally under the ignored `playwright-report/s9/lighthouse-{home,tour,plan}.report.{html,json}` paths. Temporary audit tooling was kept outside project dependencies. A full C: drive interrupted a redundant npm tool install; only this session's failed install was removed and the completed tool moved to the workspace drive.

## Primary facts and schema

The official UWA two-page notice was rendered and both pages read; the official immigration notice was rechecked. Existing fees and entry wording match. See `docs/copy/12-fact-register.md` for links, the older immigration FAQ conflict and the unspecified low-season expiry. The approved 4 October page stamps remain unchanged. G18/G20 still require later-year copy/rate decisions.

Schema Markup Validator fetched and rendered all 12 representative public URLs with zero errors and zero warnings. Per-template results and the Google Rich Results Test are recorded in `docs/research/seo-validation.md`.

## Readiness

Plan alignment: the S9 plan's automated tests, Lighthouse, per-template Schema Markup Validator and fact checks are covered; no scope expansion or copy rewrite. Google's additional Rich Results Test from decision 002 requires sign-in and returned no result, so that manual check is handed to Frank for S10. System integration: shared logo only, no token, Base UI primitive, data/schema or email behavior change. Ready for S9 review after its Vercel preview passes. Merge the S8 acceptance documentation PR before the stacked S9 PR.

S10 remains: the final production deployment and smoke test with one real production enquiry, both email deliveries, WhatsApp, analytics accept/reject and noindex. S9 did not create production enquiries or send emails. Existing copy/photo gaps and preview GA configuration remain in `docs/plan.md`. MemPalace MCP tools were unavailable; no graph or diary results were invented.
