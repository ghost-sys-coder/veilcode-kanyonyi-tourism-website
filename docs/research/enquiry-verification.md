# S8 enquiry verification, 4 October 2026

Implementation commit: 029963e, branch s8-enquiries, draft PR #8.

- Baseline typecheck/lint: pass. Baseline: 206 unit tests and 120 Playwright passes (2 expected skips).
- Final typegen/typecheck/lint and production build: pass. 253 unit tests, 2 real Neon dev integration tests, 142 browser passes (2 expected skips). After final token/stamp adjustment, all 22 enquiry checks passed on mobile/desktop.
- Integration: five simultaneous inserts permit exactly three, with unique sequence references; database traveller/residency checks reject invalid rows. Fixture rows removed. Retention dry-run: zero eligible.
- Browser: all form fields/options and estimates, focus/errors, network/storage/rate failure, mail failure after storage, honeypot without conversion, no-JavaScript submission, PII-free analytics, axe WCAG 2.2 AA and 360px wrapping pass. Desktop and mobile form screenshots were inspected.
- Protected preview: https://veilcode-tourism-jmnk2q836-ghostsyscoders-projects.vercel.app. The authenticated CLI allowed preview access; protection remains enabled. No bypass token is recorded here.
- All 22 deployed sitemap URLs return 200 with one H1, the configured self canonical and noindex header. The form passes axe with zero violations and no horizontal overflow at 360px.
- First real attempt failed server configuration before any write/send. The preview hash secret had a trailing newline from stdin; the exact hex value plus redeploy resolved it.
- Real submission KX-1006: Neon dev stores two travellers, the Bwindi tour, November 2026 and USD 3,300. A keyed 64-character IP hash is stored, not the raw IP. Screen reference matches both mail subjects and bodies.
- Traveller email to support@veilcode.studio: delivered (Resend 01a10773-db08-7da7-9490-c9f4422fac88).
- Operator email to frank@veilcode.studio: suppressed (Resend 01a10773-db0d-7422-bf13-0068321d1977). The account-level suppression originated from a bounce on 27 July 2026. The known failure is recorded on the synthetic dev row. Mailbox confirmation and retry are pending (F20). No suppression has been removed.
- App send flags describe API acceptance. For actual delivery, check Resend status; delivery webhooks are future work.
- Main migration did not execute: automatic approval review rejected the persistent production mutation pending explicit user confirmation. The SQL and separate confirmation runner are reviewed in PR #8. Production secret setup is also pending (F21).
- S8 acceptance remains open until both emails arrive. MemPalace MCP tools were unavailable; no graph/diary results were invented.
