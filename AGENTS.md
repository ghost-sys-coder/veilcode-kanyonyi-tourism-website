<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Tourism Platform Master Engineering and Product Rules

## 0. Project brief (read first)

The rules below describe how to build. This section describes what is being built right now. Where this section and a later rule conflict, this section wins.

**Current state and handoff:** read `docs/handoff.md` before starting work. It lists what is built, the conventions the tests enforce, known gotchas and what is left, and `docs/plan.md` holds the session plan and open items.

**What this build is:** A showcase website for VeilCode Studio, shown to prospective tour operator clients to sell website builds. It is also the starter for those client builds: keep all operator specific content and branding in `content/` and design tokens, so a client site is a content and brand swap, not a rebuild.

**Operator:** Kanyonyi Expeditions, a fictional private safari operator based in Kololo, Kampala, Uganda. Sells small group and private trips: gorilla and chimp trekking, savannah safaris, Nile adventures. Most travelers are from the UK, US, Europe and Australia; some are Uganda residents.

**Contact routing:** The WhatsApp button opens a chat with VeilCode Studio's real business number, +256 750 242627, read from `NEXT_PUBLIC_WHATSAPP_NUMBER`, with a prefilled message ("Hi, I'm interested in the Kanyonyi demo site."). There is no separate office phone number. The displayed office address is a clearly labelled sample value.

**Demo mode:** `NEXT_PUBLIC_DEMO_MODE=true` switches on the demo bar, `noindex`, and the demo variants of copy marked "Demo version" in `docs/copy/`. A client build sets it to `false`.

**Business model:** Enquiry led. Travelers request a tailored quote. The operator confirms availability, buys permits and takes a deposit outside the website (mobile money, bank transfer or card). This build has no online booking, availability engine or payments. Do not design for them beyond keeping the data model open to them later.

**Primary conversions, in priority order:** tour enquiry, WhatsApp click, custom itinerary request.

**Current scope:** Phases 01 to 05 of section 42. Phase 06 and later are out of scope until this brief is updated.

**Deadline:** Friday 9 October 2026, hard stop. Whatever works on that date ships.

**Content cap for this build:** 4 destinations (Bwindi, Kibale, Queen Elizabeth, Murchison Falls), 6 tours, 3 travel guides (gorilla permits, best time to visit, what to pack). Do not add more until the deadline has passed.

**Design:** Follow `docs/design/DESIGN.md` for tokens, typography, photography and component patterns. `docs/design/reference/kanyonyi-reference.html` is the visual reference prototype; open it in a browser before building any page. If it is missing, stop and ask for it rather than continuing without it. DESIGN.md wins where they differ.

**shadcn/ui uses Base UI, not Radix.** This project's shadcn components are built on Base UI primitives. Most shadcn examples online and in training data are Radix-era and will not work as written. The installed files in `components/ui/` are the source of truth; read a component's file before using it. Key differences:

1. Composition uses `render`, not `asChild`: `<DialogTrigger render={<Button />}>Open</DialogTrigger>`.
2. Links that look like buttons are real links styled with `buttonVariants`, merged with `cn` so overrides win: `<Link href="/plan-your-trip" className={cn(buttonVariants(), "w-full")}>Plan my trip</Link>`. Do not use `<Button render={<Link />} nativeButton={false}>`: Base UI then adds `role="button"`, so screen readers announce a navigation link as a button (found and fixed in S2, 4 October 2026). `nativeButton={false}` is only for a non-`<button>` element that really behaves as a button.
3. Select takes an `items` prop on the root; the placeholder is an item with `value: null`.
4. ToggleGroup and Accordion use a `multiple` boolean, not `type`, and `defaultValue` is always an array.
5. Add components with the shadcn CLI so they come from the same Base UI registry. Never paste Radix versions or install `@radix-ui/*` packages.

Reference: https://github.com/shadcn-ui/ui/blob/main/skills/shadcn/rules/base-vs-radix.md

**Copy:** All page copy is written and approved in `docs/copy/`. Use it word for word; do not write or rewrite marketing copy. If a layout needs text that isn't there, use the nearest existing line and list the gap in your summary. Time-sensitive facts and their sources are in `docs/copy/12-fact-register.md`.

**Decided defaults** (do not reopen these without a stated reason):

1. Hosting and domain: Vercel, served at `kanyonyi.veilcode.studio` (a CNAME on the existing veilcode.studio DNS). No domain is purchased for this build; a client's own domain is bought only when a client commissions their site. Read the site's base URL from one environment variable (`NEXT_PUBLIC_SITE_URL`) and use it for canonicals, the sitemap, `robots.txt`, `llms.txt`, Open Graph URLs and structured data. Never hardcode the hostname, so moving to a client domain is a config change.
2. Enquiries: stored in Neon Postgres. Email via Resend, sent from a verified subdomain (for example `mail.veilcode.studio`) to protect the main domain's reputation. Each enquiry sends two emails: a notification to `frank@veilcode.studio`, and a branded confirmation to the traveler with their reference number and next steps. The confirmation is sent as "Kanyonyi Expeditions" from an address on that sending subdomain, with reply-to set to `frank@veilcode.studio`. Do not display or send from any `kanyonyi` mailbox, since none exists.
3. Analytics: Google Analytics 4 with Consent Mode v2 in **basic** mode: the GA script does not load at all until the visitor clicks "Accept analytics", and "Reject" loads nothing. Many travellers are in the UK and EU. Events follow section 25; mark `submit_enquiry` and `whatsapp_click` as key events. Do not use Vercel Web Analytics custom events (Pro plan only).
4. Images: the operator's own photography where supplied. Otherwise freely licensed stock (e.g. Unsplash, Pexels), with photographer, source URL and licence recorded in the media metadata. Never hotlink.
5. Tests: Vitest for unit and component tests, Playwright for end to end and accessibility checks.
6. Neon branches: the `main` branch is production and is used only by the Vercel production deployment. A `dev` branch (created from `main`) is used by `.env.local` and Vercel preview deployments. Migrations run against `dev` first, then `main` once verified. Never point local development at `main`.
7. Content: tours, destinations and guides live as typed files in `content/` until the operator needs to edit them without a developer. That is the trigger for a CMS or database decision.

**Demo content rules** (apply only if the operator is fictional):

1. Operator specific details (tour prices, inclusions, address, phone, team, testimonials) are sample values. Keep them in `content/` and label the site as a demonstration in the footer.
2. Public facts that travelers rely on (permit fees, visa rules, park information, seasons, travel times) must still be researched and cited per section 18, even on a demo.
3. Do not emit Review, AggregateRating, LocalBusiness or Offer structured data for a fictional operator.
4. Demo deployments must send `noindex` (robots meta and `X-Robots-Tag`) so a fictional operator never appears in search results. SEO architecture is still built and validated in full.

---

## 1. Project objective

We are building a production grade tourism website locally.

The product must be designed as a commercial system, not merely an attractive tourism website.

Every major decision must support at least one of the following:

1. Increase qualified traffic.
2. Increase enquiries or bookings.
3. Reduce friction between discovery and conversion.
4. Build trust with prospective travelers.
5. Improve organic search visibility.
6. Improve discoverability by AI powered search and assistants.
7. Make the platform maintainable and extensible.
8. Give the business measurable data about visitor behavior and conversions.

Do not optimize for visual novelty at the expense of usability, conversion, accessibility, performance, or maintainability.

---

# 2. Mandatory technology stack

Use the following stack unless an explicit later decision supersedes it.

### Application

Next.js using the App Router.

TypeScript with strict typing.

React.

Tailwind CSS.

shadcn/ui.

### Database

Use Neon Postgres when persistence is required.

Do not introduce a database simply because one is available.

First determine whether the current feature requires persistent structured data.

When a database is introduced:

1. Design the schema intentionally.
2. Establish migrations.
3. Use appropriate indexes.
4. Define relationships and constraints at the database level.
5. Avoid storing information that should remain static content.
6. Plan for future content management requirements.

Use an appropriate typed ORM or database access layer where beneficial.

---

# 3. Research before implementation

Do not begin implementation of a major feature without understanding the market and user behavior relevant to that feature.

Research must happen before code unless equivalent research has already been supplied in the project documentation or previous project context.

Research is timeboxed and must produce a written output. Write findings to `docs/research/` as short documents that end with concrete decisions for this build (navigation, page types, filters, enquiry fields, URL structure). Research that does not change a decision is out of scope. Unless the brief says otherwise, Phase 01 research should take no more than one working session.

Research should cover the following where relevant:

### Industry research

Understand how users research and purchase tourism products.

Study:

1. Destination discovery behavior.
2. Tour and activity booking behavior.
3. Traveler trust signals.
4. Pricing presentation.
5. Itinerary presentation.
6. Accommodation presentation.
7. Destination content.
8. Reviews and social proof.
9. Enquiry flows.
10. Booking flows.
11. Mobile tourism behavior.
12. International traveler expectations.

### Competitor research

Research successful tourism platforms and relevant direct competitors.

Examples may include:

Booking.com

Tripadvisor

Viator

GetYourGuide

SafariBookings

TourRadar

Expedia

Airbnb Experiences

Relevant regional tourism operators

Relevant destination management companies

Do not copy competitors.

Study what works.

Evaluate:

1. Information architecture.
2. Navigation.
3. Search.
4. Filtering.
5. Destination pages.
6. Package pages.
7. Calls to action.
8. Booking flows.
9. Mobile layouts.
10. Content hierarchy.
11. Trust mechanisms.
12. Reviews.
13. Pricing presentation.
14. Image usage.
15. Internal linking.
16. Conversion patterns.

Extract principles that are appropriate for this product.

Avoid generic AI generated layouts.

---

# 4. Product and business thinking

Every implementation decision must account for the business model.

Before building significant functionality, determine:

1. What problem does this feature solve?
2. Who uses it?
3. What action should the user take?
4. What business outcome does that action produce?
5. What is the shortest reasonable path to that action?
6. What information does the user require before taking it?
7. What could cause the user to abandon the process?
8. How will success be measured?

Features without a clear user or business purpose should not be added.

Avoid feature inflation.

---

# 5. Conversion architecture

The website must be designed around conversion paths from the beginning.

Depending on the final business model, primary conversions may include:

1. Tour booking.
2. Tour enquiry.
3. Custom itinerary request.
4. WhatsApp conversation.
5. Phone call.
6. Email enquiry.
7. Accommodation enquiry.
8. Newsletter signup.
9. Consultation request.

Each important page should have an intentional next action.

Do not create dead end content pages.

Destination and informational content should naturally connect users to relevant commercial pages.

Example:

```text
Uganda
→ Bwindi
→ Gorilla Trekking
→ 3 Day Gorilla Safari
→ View itinerary
→ Check availability
→ Enquire or book
```

The commercial pathway must feel natural rather than forced.

---

# 6. UX principles

Optimize for completion, not interface complexity.

The fewer decisions and unnecessary interactions required from the user, the better.

Reduce:

1. Navigation depth.
2. Form length.
3. Repeated information.
4. Unnecessary clicks.
5. Unnecessary page transitions.
6. Ambiguous calls to action.
7. Duplicate navigation paths.
8. Cognitive overload.

Do not blindly minimize clicks. Provide enough information for users to make confident decisions.

Important actions should remain easy to find.

Mobile usability is mandatory.

Assume many travelers will discover and research destinations from mobile devices.

---

# 7. Navigation and information architecture

Design information architecture before building page after page.

Possible primary information domains include:

```text
Destinations

Tours

Activities

Accommodation

Travel Guides

About

Contact
```

The exact structure must result from research.

Avoid oversized navigation structures simply because tourism sites contain large amounts of content.

Use contextual internal navigation and search where they reduce friction.

Breadcrumbs should be implemented where hierarchies benefit users and search engines.

---

# 8. shadcn/ui rule

Use shadcn/ui components whenever an appropriate component exists.

Creating a custom equivalent of an existing shadcn component is strongly discouraged.

Examples include:

Button

Dialog

Sheet

Drawer

Dropdown Menu

Navigation Menu

Tabs

Accordion

Card

Form

Input

Select

Command

Carousel

Breadcrumb

Pagination

Tooltip

Popover

Calendar

Table

Skeleton

Use custom components when the product requires behavior or presentation that shadcn does not adequately provide.

Semantic HTML elements (`a`, `nav`, `main`, `article`, `section`, `ul`, `table` for real tabular content) are not "raw interface elements" and should be used as normal. Do not wrap every content block in Card; use Card only where an item is a distinct, comparable object.

Do not use raw native interface elements when a suitable shadcn abstraction already exists unless there is a documented technical reason.

---

# 9. React component architecture

Strictly enforce one React component per `.tsx` file.

Do not define several unrelated React components inside the same file.

Exception: files generated by shadcn in `components/ui/` keep their upstream structure (for example `card.tsx` exports Card, CardHeader and CardContent). Do not split them or change their structure, props or behaviour. You may edit their Tailwind classes and variants to apply the design tokens in DESIGN.md; keep those edits minimal and list them in decision record 004.

Example:

Incorrect:

```text
DestinationPage.tsx

DestinationHero
DestinationGallery
DestinationFacts
DestinationTours
DestinationFAQ
```

Correct:

```text
destination-hero.tsx
destination-gallery.tsx
destination-facts.tsx
destination-tours.tsx
destination-faq.tsx
```

Page files should primarily compose components.

Do not turn page files into monolithic implementation files.

Small non React helper functions may exist where appropriate, although reusable logic should normally live in dedicated utilities, hooks, services, or domain modules.

---

# 10. Separation of concerns

Use a production grade project structure.

A reasonable starting structure is:

```text
app/
components/
components/ui/
features/
lib/
services/
db/
types/
schemas/
hooks/
config/
content/
public/
styles/
tests/
docs/
```

Feature specific logic should live close to its domain where appropriate.

Avoid dumping unrelated functionality into:

```text
utils.ts
helpers.ts
constants.ts
components.tsx
```

Prefer clear domain boundaries.

Possible domains include:

```text
features/destinations/
features/tours/
features/bookings/
features/search/
features/reviews/
features/enquiries/
features/accommodation/
```

Architecture should remain understandable to another professional engineer joining the project.

---

# 11. Server and client component discipline

Use React Server Components by default.

Add `"use client"` only when the component genuinely requires browser side behavior.

Do not unnecessarily convert large component trees into client components.

Keep interactive client boundaries small.

Prefer server side data fetching where appropriate.

This improves performance, SEO, bundle size, and maintainability.

---

# 12. SEO from day one

SEO is not a later optimization phase.

Implement SEO architecture from the beginning.

If an SEO audit skill or tool is available in the agent environment (for example `/marketing:seo-audit`), use it during planning and periodically during implementation where it can materially improve the product. If none is available, perform the same checks manually and record them in `docs/research/`. Do not state search volumes or keyword difficulty unless they come from a real data source; otherwise reason from search intent and say so.

SEO work should include:

1. Search intent research.
2. Keyword research.
3. Destination keyword mapping.
4. Tour keyword mapping.
5. Content clusters.
6. URL architecture.
7. Metadata.
8. Internal linking.
9. Breadcrumbs.
10. Canonicals.
11. XML sitemap.
12. robots.txt.
13. Structured data.
14. Image SEO.
15. Semantic HTML.
16. Core Web Vitals.
17. Crawlability.
18. Indexability.
19. Pagination handling where required.
20. Duplicate content prevention.

Do not create pages purely to target keywords.

Pages must provide genuine traveler value.

---

# 13. Programmatic SEO

Tourism is well suited to structured SEO, but do not produce thin programmatic pages.

Potential structured relationships include:

```text
Destination + Activity

Destination + Tour Type

Destination + Duration

Destination + Travel Guide

Destination + Accommodation Type
```

Examples:

```text
/gorilla-trekking/uganda
/destinations/bwindi
/tours/uganda/gorilla-trekking
/guides/best-time-to-visit-bwindi
```

Only generate such pages when enough unique information exists to justify them.

Do not create keyword permutations containing substantially identical content.

---

# 14. Structured data

Implement valid Schema.org structured data where applicable.

Possible schema types include:

Organization

WebSite

BreadcrumbList

Article

FAQPage

LocalBusiness

TouristDestination

TouristAttraction

Product

Offer

Review

AggregateRating

Do not manufacture ratings, reviews, availability, prices, addresses, or other structured data.

Structured data must match visible page content.

---

# 15. AI search and llms.txt

Create:

```text
/llms.txt
```

It should give AI systems a concise map of the website.

Include useful references to:

1. Website purpose.
2. Company or operator.
3. Main destinations.
4. Tour categories.
5. Important informational resources.
6. Booking or enquiry information.
7. Policies.
8. Contact information.
9. Canonical important pages.

Consider an expanded:

```text
/llms-full.txt
```

if justified by the content strategy.

Do not treat `llms.txt` as a replacement for:

robots.txt

sitemap.xml

structured data

metadata

semantic HTML

strong content

internal linking

Conventional SEO remains mandatory.

---

# 16. AI and answer engine optimization

Content should also be understandable by AI search and answer systems.

Use:

1. Clear entity relationships.
2. Direct factual answers.
3. Semantic headings.
4. Structured destination data.
5. Strong authorship and organization identity.
6. Citations where factual travel information warrants them.
7. Clear dates for time sensitive information.
8. Frequently asked questions where genuinely useful.
9. Well structured comparison content.
10. Explicit geographic context.

Do not write robotic keyword stuffed copy for AI systems.

Write for humans first while preserving machine readable structure.

---

# 17. Content quality

Tourism content strongly affects buying decisions.

Avoid generic copy such as:

"Experience breathtaking landscapes and unforgettable adventures."

That language provides almost no decision value.

Content should answer practical traveler questions.

Examples:

What will I see?

How difficult is the activity?

How long does it take?

What is included?

What is excluded?

What should I bring?

Who is this suitable for?

What is the best season?

How do I get there?

What permits are required?

What happens if plans change?

What are the relevant safety considerations?

Where factual tourism information can change, architecture should make updates easy.

---

# 18. Content trust and factual integrity

Never invent:

Prices

Permit requirements

Visa requirements

Opening hours

Travel restrictions

Wildlife guarantees

Hotel availability

Tour availability

Distances

Travel times

Safety claims

Government requirements

Review scores

The agent must research changing facts using credible sources before publishing them.

Time sensitive information must be clearly distinguishable from evergreen information.

---

# 19. Performance

Performance is a product requirement.

Target excellent Core Web Vitals.

Prioritize:

1. Server rendering where appropriate.
2. Next.js image optimization.
3. Responsive images.
4. Correct image dimensions.
5. Lazy loading.
6. Appropriate caching.
7. Minimal client JavaScript.
8. Font optimization.
9. Avoiding layout shifts.
10. Efficient database queries.
11. Sensible third party scripts.

Tourism websites are image heavy.

Do not allow large photography assets to destroy performance.

---

# 20. Accessibility

Accessibility must be incorporated from the beginning.

Target WCAG 2.2 AA where practical.

Ensure:

1. Keyboard navigation.
2. Visible focus states.
3. Semantic landmarks.
4. Appropriate labels.
5. Alt text.
6. Sufficient contrast.
7. Accessible forms.
8. Error messages understandable without color.
9. Screen reader friendly navigation.
10. Accessible dialogs and interactive controls.

shadcn primitives should be used correctly rather than visually overridden in ways that destroy accessibility.

---

# 21. Responsive design

Do not build desktop first and then shrink the interface.

Design deliberately for:

Mobile

Tablet

Desktop

Tourism research frequently happens on phones, so important content and conversion actions must work exceptionally well on small screens.

---

# 22. Data model

If persistence is introduced, model tourism concepts rather than generic CMS blobs.

Potential entities may include:

```text
Destination
Tour
TourCategory
Activity
Itinerary
ItineraryDay
Accommodation
Booking
Enquiry
Traveler
Review
Media
Guide
FAQ
Price
Availability
```

Do not implement all entities immediately.

Introduce them when justified by requirements.

Avoid storing deeply nested business critical structures as arbitrary JSON when relational modeling provides stronger integrity and queryability.

---

# 23. Security

Security is mandatory.

Apply:

1. Input validation.
2. Server side authorization.
3. Secure environment variables.
4. Rate limiting where appropriate.
5. Protection against injection.
6. Safe file handling.
7. Secure authentication if introduced.
8. CSRF considerations where relevant.
9. Safe redirect handling.
10. Principle of least privilege.
11. Appropriate security headers.

Never expose private credentials to the client.

Never trust browser supplied authorization state.

---

# 24. Forms

All important forms require:

1. Schema validation.
2. Client friendly error messages.
3. Server side validation.
4. Loading states.
5. Success states.
6. Failure handling.
7. Duplicate submission prevention where relevant.
8. Analytics events.
9. Spam mitigation.

Do not collect information the business does not need.

Tour enquiry forms should minimize friction.

Ask only for information required to qualify and process the enquiry.

---

# 25. Analytics and measurement

Build the product so business performance can be measured.

Define meaningful events such as:

```text
destination_view
tour_view
tour_search
tour_filter
view_itinerary
check_availability
start_enquiry
submit_enquiry
start_booking
complete_booking
whatsapp_click
phone_click
email_click
newsletter_signup
```

Avoid meaningless event collection.

Every tracked event should answer a business question.

Respect applicable privacy requirements.

---

# 26. Conversion measurement

The product should eventually answer questions such as:

Which destinations generate the most enquiries?

Which tours convert best?

Which traffic sources produce bookings?

Where do users abandon enquiry or booking flows?

Which content pages assist conversions?

What devices convert best?

Which calls to action perform best?

Architecture should not make these questions impossible to answer later.

---

# 27. International tourism considerations

Plan for future requirements such as:

Multiple currencies.

International phone numbers.

Timezone differences.

Date formatting.

Localization.

Multiple languages.

Regional payment methods.

Do not implement all of these immediately unless required.

Avoid architectural decisions that make them unnecessarily expensive to introduce later.

---

# 28. Search and filtering

If the product contains a substantial tour inventory, search should be treated as a product feature.

Potential filters include:

Destination

Activity

Duration

Price

Travel style

Difficulty

Group size

Accommodation level

Do not expose filters simply because data exists.

Filters should reflect how travelers actually choose products.

Research this behavior first.

---

# 29. Media strategy

Tourism is highly visual.

Images must support decision making rather than merely decorate pages.

Plan:

1. Hero imagery.
2. Destination galleries.
3. Tour galleries.
4. Accommodation imagery.
5. Maps where useful.
6. Video where commercially justified.

Always account for image attribution and licensing.

Store useful metadata such as alt text, captions, dimensions, and attribution where required.

---

# 30. Design system

Do not style pages independently.

Establish reusable design tokens for:

Typography.

Spacing.

Radius.

Container widths.

Surface hierarchy.

Interactive states.

Responsive behavior.

Photography treatment.

Icons.

Calls to action.

Use the design system consistently.

Avoid random values where tokens already exist.

---

# 31. User feedback

Every action must provide clear feedback.

Users should always understand:

What happened?

Is the system processing?

Did the action succeed?

Did something fail?

What should I do next?

Use loading indicators, skeletons, disabled states, confirmations, and error messages appropriately.

Never leave users guessing whether an action occurred.

---

# 32. Testing

Do not consider a feature complete simply because it renders.

Testing should include the appropriate combination of:

Unit tests.

Integration tests.

Component tests.

End to end tests.

Validation tests.

Accessibility checks.

Responsive checks.

SEO validation.

Critical flows should receive higher test coverage.

Examples:

Search.

Enquiry submission.

Booking.

Authentication if implemented.

Payments if implemented.

Database writes.

---

# 33. Error handling

Handle expected failures explicitly.

Account for:

Network failures.

Database failures.

Empty states.

Missing content.

Invalid URLs.

Unavailable products.

Invalid forms.

Third party API failures.

Not found pages.

Unexpected server errors.

Do not expose raw stack traces or technical errors to users.

---

# 34. Observability

Production architecture should support diagnosis.

Implement appropriate:

Logging.

Error monitoring.

Performance monitoring.

Analytics.

Do not log sensitive customer information unnecessarily.

---

# 35. Dependencies

Do not install dependencies casually.

Before adding a dependency determine:

1. Does the platform already provide the capability?
2. Does shadcn already solve it?
3. Can it be solved simply without another dependency?
4. Is the dependency maintained?
5. Does it materially increase bundle size?
6. Does it introduce security or maintenance risk?

Avoid dependency accumulation.

---

# 36. Code quality

Code must be:

Typed.

Readable.

Modular.

Predictable.

Testable.

Maintainable.

Avoid:

God components.

God services.

Duplicated logic.

Premature abstraction.

Magic values.

Massive utility files.

Unnecessary client state.

Overengineering simple features.

Underengineering critical systems.

---

# 37. Comments and documentation

Prefer self explanatory code.

Comments should explain:

Why.

Constraints.

Non obvious business rules.

External limitations.

Do not write comments that merely translate code into English.

Important architectural decisions should be documented.

---

# 38. MemPalace project memory

If the MemPalace tool is available in the agent environment, use it as the project's historical retrieval layer. If it is not available, skip MemPalace steps and treat `docs/` (especially `docs/decisions/`) as the sole project memory. Do not simulate or invent MemPalace results.

Before significant decisions concerning:

Architecture.

Database schema.

Product behavior.

SEO.

Content strategy.

Booking flows.

Pricing.

Integrations.

Research.

Search.

Payments.

check MemPalace for relevant previous decisions.

Current project documentation remains the source of truth.

If MemPalace retrieves an older decision that conflicts with current documentation:

1. Do not silently choose one.
2. Identify the conflict.
3. Prefer explicitly current documentation.
4. Update durable documentation after the decision changes.

Important project decisions should be written into durable project documentation so future agents can retrieve them.

Do not use MemPalace as an excuse to avoid documentation.

## How MemPalace is set up in this project (4 October 2026)

- **Palace:** local and private, at the default path (`mempalace status`). Wing **`kanyonyi`**. Rooms:
  - `decisions`: docs/decisions, docs/plan.md
  - `copy`: docs/copy
  - `design`: docs/design
  - `rules`: AGENTS.md, CLAUDE.md
  - `frontend`: app, components
  - `lib`: lib, config, content, features, services, db
  - `diary`: session entries

  Room routing lives in `mempalace.yaml` (git-ignored, per machine).
- **MCP:** registered for Claude Code as `mempalace` (local scope, command `mempalace-mcp`). Check that the `mempalace_*` tools are in the live tool list. If they aren't, run `claude mcp get mempalace` and reconnect. Never guess or simulate palace results.
- **Hooks:** `.claude/settings.local.json` runs `mempalace hook run` on SessionStart, Stop (silent save every 15 messages), PreCompact and SessionEnd. `MEMPAL_DIR` is set to this repo, so changed files are re-mined in the background.

**Every session:**

1. **Start:** run `mempalace_kg_query` on the entities you are about to touch, then `mempalace_diary_read` (agent `claude-code`) for the last session's notes. Use `mempalace_search` scoped to wing `kanyonyi` for anything else. Entities currently recorded:
   - Build: `kanyonyi_build`, `cut_list`, `copy_gaps`
   - Content and pages: `content_model`, `guides`, `guides_index`, `tour_pages`, `tours_filters`
   - Pricing: `tour_pricing`, `low_season_pricing`, `currency_toggle`
   - SEO and rendering: `rendering`, `indexing`, `structured_data`, `llms_txt`
   - Enquiries: `enquiry_submit`, `enquiry_storage`, `enquiry_reference`, `enquiry_email`, `rate_limit`, `demo_retention`, `neon_branches`
   - Design system: `shadcn`, `sun_cta`, `design_tokens`, `layout_patterns`, `whatsapp_fab`
   - Other: `analytics`, `dependencies`, `photography`
2. **When a decision changes:** update the decision record in `docs/decisions/` (or `docs/plan.md`) first, because it is the source of truth. Then run `mempalace_kg_invalidate` on the old fact (with `ended` set to the date) and `mempalace_kg_add` for the new one (with `valid_from` set to the date and `source_file` pointing at the record). Facts are at most 128 characters; split longer ones into several facts on the same subject.
3. **When an open question is answered:** invalidate the `open_question` fact and add a `decided` fact.
4. **End:** run `mempalace_diary_write` with agent `claude-code`, wing `kanyonyi`, and topic set to the session (`s1-foundation`, `s2-shell`, …). Record what shipped, what was cut, new open questions and anything the next session must know.
5. **After large doc or code changes:** run `mempalace mine . --agent claude-code` (incremental; it replaces a changed file's drawers rather than duplicating them). Run `mempalace sync --wing kanyonyi` to preview pruning drawers for deleted or moved files, and `--apply` to prune them.

**Knowledge graph predicates.** This is a closed set; don't invent new ones:

- `decided`
- `uses`
- `forbids`
- `has_deadline`
- `has_scope`
- `hosted_at`
- `status`
- `open_question`
- `cut_first`

**Never** file secrets in the palace: no `.env` values, API keys or connection strings. Never file traveller personal data from enquiries either.

---

# 39. Decision records

Material decisions should be documented.

Consider:

```text
docs/decisions/
```

Examples:

```text
001-tour-booking-model.md
002-content-architecture.md
003-database-selection.md
004-image-strategy.md
005-seo-url-structure.md
```

Each record should explain:

Context.

Decision.

Reasoning.

Consequences.

Alternatives considered where relevant.

---

# 40. Agent behavior

The coding agent acts as an experienced product engineer, not a passive code generator.

Before implementing significant functionality:

1. Understand the requirement.
2. Inspect existing code.
3. Inspect relevant documentation.
4. Search MemPalace, if available, where historical decisions could matter.
5. Research the industry when necessary.
6. Research existing products when useful.
7. Identify user and business objectives.
8. Determine the simplest robust architecture.
9. Implement.
10. Test.
11. Validate the user journey.
12. Validate SEO implications.
13. Document material decisions.

Do not ask the user to make trivial implementation decisions that can be resolved through established engineering practice and existing project context.

Do not silently make consequential business or architectural decisions where reasonable alternatives would materially change the product.

---

# 41. No generic AI output

Avoid generic AI generated:

Layouts.

Copy.

Feature lists.

Dashboards.

Cards.

Landing pages.

Navigation.

Calls to action.

Research the domain before choosing patterns.

Every interface element should have a reason to exist.

Do not add decorative sections merely to fill space.

---

# 42. Progressive implementation

Do not build the entire platform at once.

Implement in coherent phases.

A likely sequence is:

### Phase 01

Research.

Product definition.

Target audience.

Competitive analysis.

Information architecture.

SEO research.

Technical architecture.

Design system.

### Phase 02

Core website shell.

Navigation.

Homepage.

Destination architecture.

SEO infrastructure.

`robots.txt`.

`sitemap.xml`.

`llms.txt`.

Structured data foundations.

Analytics foundations.

### Phase 03

Destination experience.

Destination pages.

Activities.

Travel guides.

Internal linking.

### Phase 04

Tour product architecture.

Tour listings.

Tour pages.

Itineraries.

Search and filtering.

### Phase 05

Enquiries and conversion.

Forms.

WhatsApp.

Lead capture.

CRM integration where appropriate.

### Phase 06

Booking system if required.

Availability.

Traveler details.

Payments.

Notifications.

### Phase 07

Content expansion.

Programmatic SEO where justified.

Internationalization where justified.

### Phase 08

Optimization.

Analytics review.

Conversion optimization.

Performance.

Accessibility.

SEO audit.

Security review.

---

# 43. Definition of done

A feature is not complete because the UI renders.

Before considering significant work complete, verify:

1. User objective works.
2. Business objective is supported.
3. Mobile experience works.
4. Loading states exist.
5. Empty states exist.
6. Error states exist.
7. Accessibility is acceptable.
8. SEO implications are handled.
9. Performance is acceptable.
10. Analytics exist where valuable.
11. Security implications have been considered.
12. Code follows project architecture.
13. Tests exist where appropriate.
14. Documentation reflects consequential decisions.

---

# 44. Governing principle

Build the product as though a professional product, engineering, design, SEO, content, and growth team will inherit it.

Every implementation should optimize for:

User value.

Business value.

Conversion.

Search visibility.

Performance.

Accessibility.

Maintainability.

Security.

Measurement.

Future extensibility.

The product should feel deliberate.

Nothing important should exist merely because an AI generated it.
