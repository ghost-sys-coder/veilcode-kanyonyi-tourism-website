# Kanyonyi showcase launch

5 October 2026. Public demo: https://kanyonyi.veilcode.studio.

## What shipped

- Full homepage, six private/small-group tour pages and filters, four destinations and hub, three travel guides and index, FAQ, about, enquiry form and sample policies: 22 sitemap URLs.
- Licensed local photography, mobile layouts, dual USD/UGX display, sourced permit tables and dated fact notices. All marketing copy comes from the approved content files.
- Enquiries stored in Neon main by production, with a reference, authoritative estimate, validation, rate limit and spam handling. Resend sends an operator notification and branded traveller confirmation. Local development and previews use dev.
- Mobile WhatsApp routing to VeilCode Studio, GA4 behind basic analytics consent, canonicals, Open Graph, sitemap, robots, llms.txt and allowed JSON-LD.
- Clear fictional-operator/demo notices. At launch, metadata and headers sent noindex. Frank's later explicit request of 5 October enables production indexing separately through `SITE_INDEXING_ENABLED=true`; previews keep noindex. Sample copy and schema exclusions remain.

## Release

S9 implementation is merged through PR #11, master `c7ffd2e`. PR #9 contains the S8 acceptance documentation. The duplicate stacked PR #10 is closed because its exact head is included in master. Vercel production deployment `veilcode-tourism-k5d7s3q71-ghostsyscoders-projects.vercel.app` is READY for that master commit and serves the public alias.

The existing production main migration was verified rather than reapplied: 23 enquiry columns, one migration and zero rows before the S10 smoke. All required production variables are present; private integration/database/hash settings are Sensitive. Local dev and main connection endpoints differ; `.env.local` was not redirected to production.

## What was cut

Tour/destination galleries beyond the hero image, a destination map, online booking/payments, availability, CRM, self-service CMS and invented reviews. These do not block the enquiry-led demo. Reviews remain an explicit demo placeholder; sample people/addresses/prices never become prohibited structured data.

## Launch checks

All 22 production pages return 200 with one H1, self canonical and both noindex signals. Home/form have zero axe violations and no overflow at 360px. Mobile WhatsApp and real consent accept/reject/withdrawal pass. The single production enquiry KX-1001 stored correctly on main; its reference and USD 3,300 estimate match the screen and both emails. Resend confirms both support@ and frank@ deliveries. No duplicate submission or retry was made.

Typegen/typecheck/lint and 253 unit tests pass. The S10 browser run passed 145 cases with two expected skips and one mobile axe timeout; that case then passed unchanged with one worker. All 146 cases have passed, with the timeout/retest recorded transparently in [S10 verification](research/s10-launch-verification.md).

All 12 Schema Markup Validator templates pass. Google's URL test is constrained by noindex; its supported Code mode also returned a login/service error without a result. A manual Google Code test from Frank's functioning browser remains an external follow-up. No Google validation pass is claimed, and noindex was kept.

## Follow-ups

- G7/G13/G14: map-caption fallback, March's season legend label and Jinja rafting-photo replacement. G9/G15/G17: intentionally absent/reused closing copy and the shared fact stamp.
- G18/G20/G21: approved future-year notes/rate wording and more specific form-bound errors. Conservative future-year fallbacks remain in use; no unconfirmed permit discount is promised for 2027.
- Lighthouse mobile performance is 84/78/85 for home/tour/form. JavaScript blocking time and the tour's 0.094 lab CLS are recorded follow-ups. These historical SEO scores included the launch noindex penalty; production indexing was subsequently requested by Frank.
- Preview/local GA ID remains configured (F18); test traffic should be filtered. Production consent acceptance creates real analytics traffic. No advertising signals are granted.
- Schedule demo enquiry deletion before October 2027. `db:purge` defaults to dry run. Monitor pending/failed email rows and Resend delivery events; application `sent` means API acceptance. Admin monitoring/delivery webhooks remain future work.

Detailed verification is in `docs/research/seo-validation.md`, `s9-verification.md` and the S10 record. MemPalace MCP tools were unavailable; these documents carry the launch history.
