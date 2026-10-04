# 002: URL and SEO architecture

**Status:** Proposed (Phase 01, 4 October 2026)
**Applies to:** Phases 02 to 05. Checked against the bundled Next.js 16.3.8 docs (`metadataBase`, `robots.ts`, `sitemap.ts`, route handlers, JSON-LD guide).

## Context

The copy deck fixes the URL map (00-README.md) and every title and description (11-emails-and-meta.md). The brief requires:

- canonicals, sitemap, robots, `llms.txt`, Open Graph and structured data built from `NEXT_PUBLIC_SITE_URL`, with no hardcoded hostname
- `noindex` on demo deployments, sent in both the robots meta tag and an `X-Robots-Tag` header
- no Review, AggregateRating, LocalBusiness or Offer structured data for a fictional operator

No SEO data tool is connected in this session (Ahrefs, DataForSEO and others need authorisation), so this document makes no search volume or difficulty claims. Keyword targeting follows the search intent already reflected in the approved titles.

## Decision

### 1. Routes

| Route | File | Rendering | Notes |
| --- | --- | --- | --- |
| `/` | `app/page.tsx` | Static, `revalidate = 86400` | Daily rebuild keeps the trip finder's "next 12 months" correct |
| `/tours` | `app/tours/page.tsx` | Static | Filters run client side over all six cards; see section 4 |
| `/tours/[slug]` | `app/tours/[slug]/page.tsx` | SSG, `dynamicParams = false` | 6 pages |
| `/destinations` | `app/destinations/page.tsx` | Static | |
| `/destinations/[slug]` | `app/destinations/[slug]/page.tsx` | SSG, `dynamicParams = false` | 4 pages |
| `/guides` | `app/guides/page.tsx` | Static | Guides index (06-guides.md, added 4 October 2026) |
| `/guides/[slug]` | `app/guides/[slug]/page.tsx` | SSG, `dynamicParams = false` | 3 pages |
| `/about` | `app/about/page.tsx` | Static | |
| `/plan-your-trip` | `app/plan-your-trip/page.tsx` | Static, `revalidate = 86400` | Month options roll daily; `?tour=` read client side |
| `/faq` | `app/faq/page.tsx` | Static | |
| `/booking-terms`, `/privacy` | `app/(legal)/...` | Static | Demo policy notice at the top |
| `/robots.txt` | `app/robots.ts` | Static | |
| `/sitemap.xml` | `app/sitemap.ts` | Static | |
| `/llms.txt` | `app/llms.txt/route.ts` | Static (`dynamic = 'force-static'`) | |
| 404 | `app/not-found.tsx` | Static | Copy from 02-global.md |
| 500 | `app/error.tsx` + `app/global-error.tsx` | Client | Copy from 02-global.md |

There are 22 indexable URLs in total. Cache Components (`cacheComponents: true`) stays off: every page is static content, and the previous caching model with `revalidate` covers the two pages that need a daily refresh. Turning it on would add Suspense requirements with no benefit for this build.

No trailing slashes (the Next default). There is no `/gorilla-trekking/uganda` style programmatic page: the content cap and AGENTS.md section 13 rule them out.

### 2. Site URL and indexing switch

```ts
// config/site-url.ts (server and client safe)
export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");

// config/demo.ts
// Fail-safe: only the exact string "false" turns demo mode off. An unset or mistyped
// value means demo mode, and demo mode means noindex.
export const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE !== "false";
export const isIndexable = !isDemo;
```

- The root layout sets `metadataBase: siteUrl`. Every other URL field (canonical, OG url, OG image) is a relative path.
- A missing `NEXT_PUBLIC_SITE_URL` fails the production build (`if (process.env.VERCEL_ENV === "production" && !process.env.NEXT_PUBLIC_SITE_URL) throw`). This stops a client site shipping canonicals that point at localhost.
- `.env` currently holds `NEXT_PUBLIC_SITE_URL=https://kanyonyi.veilcode.studio`. Correct.

### 3. Metadata

- **Root layout:** `metadataBase`, `title.template: "%s | Kanyonyi"` and `title.default`. The homepage title uses `title: { absolute: "Private Gorilla Treks and Safaris in Uganda · Kanyonyi" }`, because the copy gives it a `·` and not the `|` suffix.
- **Every route:** `generateMetadata` (dynamic routes) or `metadata` (static routes) reads `content/meta.ts`. Titles in `meta.ts` are stored **without** the suffix, and the template adds it. That lets `og:title` reuse the same string, as 11-emails-and-meta.md asks ("og:title = page title without the suffix").
- **Canonical:** `alternates: { canonical: "/tours/3-day-bwindi-gorilla-trek" }` on every route, always the clean path with no query string.
- **Open Graph:** `openGraph: { title, description, url, siteName: "Kanyonyi Expeditions", locale: "en_GB", type: "website" | "article", images: [hero.og ?? defaultOg] }`, and Twitter `summary_large_image` from the same values.
- **Robots meta:** the root layout sets `robots: isIndexable ? { index: true, follow: true } : { index: false, follow: true }`. Nested routes don't override it.
- **`<html lang="en-GB">`** to match the British English copy.

### 4. Filter URLs and canonicals

DESIGN.md asks for trip finder results "in the URL query, so results are shareable and crawlable". Query parameters on `/tours`:

| Param | Values | Effect |
| --- | --- | --- |
| `experience` | `gorillas-and-chimps`, `savannah-wildlife`, `nile-and-adventure` | Filters by category |
| `length` | `3`, `5`, `7`, `8plus` | Up to N days, or more than a week |
| `month` | `2026-11` (YYYY-MM) | Never removes tours. Shows "{Month}: {month note}" above the grid. Adds a **Good in {Month}** badge to tours whose `bestMonths` include that month and sorts them first. In April, May and November, adds **Cheaper permits** to tours with `includesPrimatePermits` (02-global.md) |
| `sort` | `recommended`, `shortest`, `longest`, `price` | Sort order |

All six cards are server rendered in the static HTML, so every tour is crawlable from `/tours`. A small client component reads `useSearchParams()` (inside `<Suspense>`) and hides non-matching cards. All filtered views canonicalise to `/tours`. That avoids near-duplicate indexable URLs (AGENTS.md section 13) while keeping filtered links shareable.

### 5. Sitemap

`app/sitemap.ts` returns the 22 URLs, built from the content indexes (no hand-written list):

- `url`: `new URL(path, siteUrl).toString()`
- `lastModified`: `guide.dateModified` for guides; `factsCheckedOn` for everything else (one content date for the build)
- no `changeFrequency` or `priority` (Google ignores both)

The sitemap is served on the demo too. It is harmless next to `noindex`, and it lets SEO validation run against the real output.

### 6. robots.txt, and why the demo does not use `Disallow`

```ts
// app/robots.ts
rules: { userAgent: "*", allow: "/" }, sitemap: `${siteUrl}/sitemap.xml`
```

The demo allows crawling on purpose. A `Disallow: /` would stop crawlers from fetching the pages, so they would never see the `noindex` tag, and Google can still index a disallowed URL from external links ("Indexed, though blocked by robots.txt"). `noindex` only works when the page can be crawled.

### 7. X-Robots-Tag and security headers

These go in `next.config.ts` `headers()` and are evaluated at build time from the same `isIndexable` logic:

```ts
{ source: "/:path*", headers: [
  ...(isIndexable ? [] : [{ key: "X-Robots-Tag", value: "noindex" }]),
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
]}
```

The header covers `/llms.txt`, `/sitemap.xml` and images too, which the meta tag can't. Vercel sets HSTS. A strict Content-Security-Policy is deferred to Phase 08: nonce-based CSP makes every page dynamic (see the bundled `content-security-policy.md`), which would cost the static rendering this site relies on.

### 8. llms.txt

- `app/llms.txt/route.ts`, with `export const dynamic = "force-static"`, returns `text/plain; charset=utf-8`.
- The body is the exact template from 11-emails-and-meta.md. `{SITE}` is replaced with `siteUrl.origin`. The tour, destination and guide lists are generated from the content indexes in the same order and wording as the template. A snapshot test compares the output with the copy deck text.
- `/llms-full.txt` is **not** built. The site has 21 pages and the HTML is already semantic. Revisit in Phase 07.

### 9. Structured data

These are rendered as `<script type="application/ld+json">` in the page (per the bundled JSON-LD guide), through one `components/seo/json-ld.tsx` that escapes `<` as `<`. Builders live in `lib/seo/schema.ts`, typed with `schema-dts` (dev dependency, types only). Every value comes from the same content object the page renders, so structured data always matches visible content.

| Page | Types emitted |
| --- | --- |
| All pages (root layout) | `Organization` (name, url, logo, description = brandLine). `WebSite` (name, url). No `SearchAction`, because there is no site search |
| Every page except home | `BreadcrumbList` (matches the visible breadcrumb) |
| `/tours` | `ItemList` of the six tour URLs |
| `/tours/[slug]` | `TouristTrip`: name, description, `itinerary` as an `ItemList` of the destinations' `TouristDestination` nodes, `provider` the Organization, `touristType`. **No `offers`**. Plus `FAQPage` from the tour's questions |
| `/destinations` | `ItemList` of the four destination URLs |
| `/guides` | `ItemList` of the three guide URLs |
| `/destinations/[slug]` | `TouristDestination`: name, description, `containedInPlace` `{ "@type": "Country", name: "Uganda" }`, `sameAs` (Wikipedia URL from the fact register), `touristType`, `includesAttraction` built from the activity names. Plus `FAQPage` |
| `/guides/[slug]` | `Article`: headline, `author` `{ "@type": "Organization", name: "Kanyonyi Expeditions planning team" }`, `publisher` the Organization, `datePublished` 2026-10-04, `dateModified`, image |
| `/faq` | `FAQPage` (all groups) |
| `/about` | `AboutPage`, with `mainEntity` the Organization |
| `/plan-your-trip`, policies | Breadcrumb only |

**Excluded because the operator is fictional (brief, demo content rule 3), and enforced by a unit test that walks every page's JSON-LD:**

- `Review` and `AggregateRating`: there are no real reviews, and the homepage's reviews slot is a placeholder
- `LocalBusiness` **and its subtypes**, including `TravelAgency`, the type a real operator would normally use
- `Offer` and `AggregateOffer`: this is why tours use `TouristTrip` with no `offers`, and not `Product`. A `Product` without offers or reviews is also ineligible for Google's product results, so it would add nothing
- `PostalAddress`, `telephone` and `contactPoint` on the Organization: the address is a sample, and the WhatsApp number is VeilCode Studio's, not the operator's (AGENTS.md section 14: never manufacture addresses)
- `Person` entries for the sample team on /about
- `geo` coordinates on destinations: the fact register has no sourced coordinates. To add them, put sourced values in the register first

**For a client build:** switch `Organization` to `TravelAgency` with the real address and phone. Add `offers` (with `priceCurrency`, `price` from `priceFrom()` and `validThrough` from `pricing.validUntil`) to `TouristTrip`. Add `Review` and `AggregateRating` only from real review sources. Each addition goes behind `!isDemo`.

FAQ rich results are now limited to authoritative government and health sites, so `FAQPage` won't produce rich snippets here. It is still emitted, because the copy deck asks for it and it is valid, machine readable structure for answer engines.

### 10. Internal linking and breadcrumbs

- Breadcrumbs (shadcn Breadcrumb) on every page except home: `Home › Tours › 3-Day Bwindi Gorilla Trek`. Guides use `Home › Guides › {h1}`, with "Guides" linking to `/guides`.
- Tour pages link to their destinations and to the related guides (`related` field). Destination pages link to every tour that visits (derived). Guides link to tours and destinations (`related`). The home page links to all six tours, all four destinations, and two of the three guides. `/guides` links to all three guides.
- No page is a dead end: every page ends in a `CloseCta`.

### 11. Image SEO

`next/image` with explicit `sizes`. Descriptive `alt` text comes from `media.ts`. File names are descriptive (`bwindi-silverback-resting.jpg`). The hero image uses `priority`. OG images are 1200 × 630 crops stored next to the source image.

### 12. Validation (Phase 05 exit)

- Playwright: every sitemap URL returns 200, has exactly one `<h1>`, a canonical equal to its own clean URL, `noindex` in both the meta tag and the header on the demo, and JSON-LD that parses
- Unit test: forbidden schema types are absent (see section 9)
- Manual: Schema Markup Validator and Rich Results Test on one URL per page type (the tests can fetch a noindexed page), recorded in `docs/research/seo-validation.md`. Run `/seo-audit` or `seo-technical` if available, otherwise do the same checks by hand

## Implementation notes (S5, 4 October 2026)

- **`/tours` filtering** lives in `features/tours/lib/filters.ts` (pure, unit-tested). `TourResults` reads `useSearchParams()` inside `<Suspense>`, and the fallback is the full grid in recommended order, so the static HTML always contains all six tours. Cards are server components passed to the client as props; the client only filters, sorts and overlays the "Good in {Month}" and "Cheaper permits" badges.
- **Tour FAQs** use Base UI's `hiddenUntilFound`. Closed panels otherwise unmount, which would remove the answers from the HTML that search engines and the `FAQPage` data rely on.
- **`TouristTrip`** carries name, summary, URL, image, provider and an `ItemList` of the destinations visited, with no `offers`. A browser test asserts that no Offer, Review, AggregateRating or LocalBusiness appears.
- **Unknown tour slugs** return a static 404 (`dynamicParams = false`). `next start` logs `NoFallbackError` for them; the response is still a correct 404.

## Implementation notes (S6, 4 October 2026)

- Destination hubs and guides index emit `ItemList`; destination details emit `TouristDestination` and `FAQPage`; guides emit `Article`; `/faq` emits its 16 answers as `FAQPage`; about emits `AboutPage` with the organization as `mainEntity`. All routes use `pageMetadata()` and matching breadcrumb data.
- The schema builders omit `touristType`: no approved audience value exists in the content model. The section 9 table's originally proposed field is deferred rather than invented. No forbidden type, address, coordinates, telephone or sample person is emitted; the unit check now covers all page builders recursively.
- Guide authors are visible and modelled as an `Organization`. The updated date appears once in the eyebrow, resolving C6. Article image, dates, headline and canonical are drawn from the same guide content.
- The sitemap still lists all 22 routes, including the interim `/plan-your-trip` contact page. Its form remains S8 work. The crawl compares normalized URLs because Next omits the root canonical's trailing slash while the sitemap includes it.
- `tests/e2e/pages.spec.ts` checks each new route's status, heading, canonical, demo indexing, JSON-LD, axe WCAG 2.2 AA results and 360px overflow. It also crawls every sitemap URL and checks the commercial links, shared permit table, month blocks, FAQ keyboard behaviour and demo policy variants.
- Playwright always builds its own server (`reuseExistingServer: false`). A leftover Windows test server previously caused new routes to be tested against an old build; fail explicitly if port 3100 is occupied. In this sandbox, production-test process teardown required an escalated run.

## Consequences

### Homepage implementation (S7, 4 October 2026)

- The trip finder uses `parseFilters`/`toQueryString` and navigates to the existing `/tours` query contract. A submit sends one `tour_search` event. Month links use the corresponding date in the rolling twelve-month list; filtered pages retain the `/tours` canonical.
- The future-year month list exposed an existing factual mismatch: cheaper-permit badges and notes previously extended the confirmed 2026 promotion into every year. Badges are now limited to April, May and November **2026**; future notes use the approved weather-only fallback (plan G18), with the existing 2027 rates notice. Month still never removes a tour.
- Home links to all six tours, all four parks, the permit and seasons guides, FAQ and enquiry. Its visible demo reviews remain a placeholder. The root Organization/WebSite schema is retained; no review, rating, offer or extra home-specific schema is added.


- Moving to a client domain means changing `NEXT_PUBLIC_SITE_URL` and setting `NEXT_PUBLIC_DEMO_MODE=false`. No code changes. `NEXT_PUBLIC_*` values are inlined at build time, so either change needs a redeploy.
- The noindex default is fail-safe. If someone forgets an env var, the site stays out of search rather than leaking into it.
- Tours can't win price rich results on the demo. That is by design.
