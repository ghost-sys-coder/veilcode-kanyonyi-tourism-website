# S10 launch verification, 5 October 2026

Production release: master `c7ffd2e`, merged S9 PR #11. Deployment: https://veilcode-tourism-k5d7s3q71-ghostsyscoders-projects.vercel.app, READY and serving https://kanyonyi.veilcode.studio. Launch record branch: `s10-launch`.

## Configuration and automated checks

- Production metadata confirms all required public settings, both database URLs, Resend settings, notification/reply-to addresses and IP hash secret are present. Private database/integration/hash values are Sensitive. No secret is recorded here.
- The already-applied main schema has 23 columns and one migration. It had zero enquiries before the smoke. The dedicated production read used main; local `.env.local` still uses a different dev endpoint. No migration was rerun and no local app was pointed at main.
- Typegen, typecheck and lint pass. Vitest: 253 passed. The full production-build Playwright run had 145 passes, two expected skips and one 30-second timeout in the mobile home multi-state axe case. That sole case passed unchanged with `npm run test:e2e -- --last-failed --workers=1` (28.4 seconds). All 146 distinct cases have passed; the full initial S10 command is not described as a clean run. The same application also had the clean 146-case S9 run before merge. Use one worker on this resource-limited machine.
- No application, content or test assertions changed in S10. PR #10 was closed as a duplicate after confirming its exact head `c012e3d` is already included in master through PR #11; PR #9 is merged too.

## Production browser smoke

- All 22 sitemap URLs return 200, one H1, a normalized self canonical and noindex in the robots meta and response header.
- Home and the full form pass axe tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa` at 360px with zero violations and no page overflow. Both shared logo names include the visible Uganda subline.
- Mobile WhatsApp opens the planner popover. Its link contains number `256750242627` and the exact approved prefilled demo message. No WhatsApp message was sent.
- Reject persists after reload and makes zero requests to Google Analytics/Tag Manager. Accept loads the actual Google tag with HTTP 200, grants analytics storage and keeps all three ad signals denied. Withdrawing through Cookie settings reloads with denied consent and no Google script. This is a browser/network check, not a claim about GA report ingestion or key-event configuration.

## One real production enquiry

- Exactly one synthetic enquiry was submitted through the live form, using the previously approved support@ traveller address and frank@ operator address. Reference **KX-1001**, two travellers, Bwindi trek, November 2026, estimate **USD 3,300**.
- Neon main now has one row. SQL `travel_month::text` is `2026-11-01`; the date can serialize as the previous UTC evening on an EAT machine. Consent is recorded, the stored IP hash length is 64 and both send flags are `sent`. The row is labelled as the synthetic S10 smoke in its notes. No user enquiry was changed or deleted.
- The screen reference and estimate match both mail subjects/bodies and the main row. Sender addresses are on `mail.veilcode.studio`. Traveller reply-to is frank@; the operator reply-to is the submitted traveller address.
- Resend reports **delivered** to support@veilcode.studio: `01a1093a-b5d8-7927-a509-831f7bb5c84e`, subject `Your demo enquiry (KX-1001)`.
- Resend reports **delivered** to frank@veilcode.studio: `01a1093a-b5d8-789d-a687-106351df9dc1`, subject `New enquiry KX-1001: 3-Day Bwindi Gorilla Trek, November 2026, 2 travellers`.
- Exactly two new emails match this production reference and creation time. There was no suppression retry, second enquiry or duplicate traveller confirmation. Provider delivery is verified; no new inbox/read confirmation from Frank is claimed.
- Local screenshots and sanitized proof are retained under ignored `playwright-report/s10/`: `production-confirmation.png`, `production-enquiry.json`, `production-checks.json`, `delivery-proof.json`. The temporary submission script refuses to run again when an attempt is already recorded.

## Google limitation and handoff

Frank reports adding a Search Console subdomain property. That ownership setup was not needed for the public Rich Results tool and was not inspected through an authenticated account. The connected-browser inventory timed out, so no access to Frank's Google session is claimed.

Google's current [Rich Results Test help](https://support.google.com/webmasters/answer/7445569) says noindexed pages cannot use the URL test, and supports Code mode for actual snippets. This conflicts with decision 002's old blanket statement that both tools can fetch noindexed pages; that statement is corrected. Demo noindex remains mandatory.

The actual homepage JSON-LD was loaded into Google Code mode and submitted with the smartphone option. It again returned **"Something went wrong / Log in and try again"**, without a result. Screenshot/text: `google-code-result.{png,txt}`. No Google pass, crawl success or rich-result eligibility is inferred. The remaining per-template Google Code checks are an external manual follow-up from Frank's functioning browser; they are not a production enquiry/deployment blocker. The 12 per-template Schema Markup Validator fetch/render checks completed successfully in S9.

Production release and smoke are complete. Existing copy/photo, performance, analytics and retention follow-ups are listed in `docs/launch-notes.md`; the Google check remains explicitly deferred. MemPalace MCP tools were unavailable, so no diary/graph results were invented. Durable docs are the session record.
