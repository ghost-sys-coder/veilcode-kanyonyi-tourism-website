# 001: Content architecture

**Status:** Proposed (Phase 01, 4 October 2026)
**Applies to:** Phases 02 to 05

## Context

AGENTS.md section 0 makes two content requirements:

1. Tours, destinations and guides are typed files in `content/` until an operator needs to edit them without a developer.
2. All operator specific content and branding sit in `content/` and the design tokens, so a client build is a content and brand swap, not a rebuild.

The copy deck in `docs/copy/` is approved word for word. Lines marked `Field:` are data fields. Everything else is page copy, and that copy is operator specific too, so it also belongs in `content/` and not in JSX.

The copy is not uniform across entries, and the model has to accept that without inventing text:

- Tours 5 and 6 have no "Is this trip for you" section. Tour 6 has no destinations.
- At-a-glance tables have different rows per tour. Some have Lodges or Group size and others don't.
- Tour 1's price table has two columns (standard, low season). The others have one. Tours 2 and 6 add "Ask us" rows.
- Tours 3 to 6 have no closing body. Tours 4, 5 and 6 have no "Good to know".
- Tour 5's day 1 puts its meta line after the body.

## Decision

### 1. Where things live

```text
types/content.ts              All content types (code, not swapped per client)
lib/content/                  Read functions + integrity helpers (code)
  tours.ts                    getTours(), getTour(slug), getToursForDestination(slug)
  destinations.ts             getDestinations(), getDestination(slug)
  guides.ts                   getGuides(), getGuide(slug)
  pricing.ts                  priceFrom(tour), estimateTotal(tour, travellers)
  links.ts                    resolveLink(ref) -> { href, label }
  inline.tsx                  <Inline text="..."/>: renders **bold**, *italic*, [label](href)
content/                      Everything a client build replaces
  site.ts                     Operator identity, nav, footer, contact, currency, demo flag
  facts.ts                    Fact-register values shared across pages (permit table, checked date)
  seasons.ts                  12 month notes for the month picker and /tours?month=
  media.ts                    Image registry with attribution
  tours/
    3-day-bwindi-gorilla-trek.ts
    4-day-murchison-falls-safari.ts
    4-day-kibale-chimps-and-queen-elizabeth.ts
    7-day-primates-and-savannah.ts
    10-day-classic-uganda.ts
    2-day-jinja-and-the-nile.ts
    index.ts                  Ordered array (order = "Recommended" sort)
  destinations/
    bwindi.ts  kibale.ts  queen-elizabeth.ts  murchison-falls.ts  index.ts
  guides/
    uganda-gorilla-permits.ts  best-time-to-visit-uganda.ts
    what-to-pack-gorilla-trekking-safari.ts  index.ts
  faq.ts                      /faq groups
  pages/                      Copy for pages that are not entity entries
    home.ts  tours-listing.ts  destinations-hub.ts  guides-index.ts  about.ts
    plan-your-trip.ts  booking-terms.ts  privacy.ts  not-found.ts  error.ts
  emails.ts                   Subject lines and body copy for both emails
  meta.ts                     Title + description per route (from 11-emails-and-meta.md)
  llms.ts                     llms.txt intro and note text
  ui.ts                       Shared microcopy: buttons, form errors, empty states,
                              cookie banner, WhatsApp popover, demo notice
public/images/                Image files referenced by content/media.ts
```

Types live in `types/` and not in `content/`. A client build replaces the files in `content/`, and the compiler checks the new content against the unchanged types.

### 2. Types

Rich text is a plain string with three inline marks: `**bold**`, `*italic*` and `[label](/href)`. The copy needs only these. `lib/content/inline.tsx` renders them and has unit tests. MDX was rejected: it adds `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react` and `@types/mdx`, and with only three guides it gives no benefit over a block model.

```ts
// types/content.ts

/** A string that may contain **bold**, *italic* and [label](/href). Nothing else. */
export type RichText = string;

export type ISODate = `${number}-${number}-${number}`; // "2026-10-04"

export type Slug<T extends string = string> = T;

export type TourSlug =
  | "3-day-bwindi-gorilla-trek"
  | "4-day-murchison-falls-safari"
  | "4-day-kibale-chimps-and-queen-elizabeth"
  | "7-day-primates-and-savannah"
  | "10-day-classic-uganda"
  | "2-day-jinja-and-the-nile";
export type DestinationSlug = "bwindi" | "kibale" | "queen-elizabeth" | "murchison-falls";
export type GuideSlug =
  | "uganda-gorilla-permits"
  | "best-time-to-visit-uganda"
  | "what-to-pack-gorilla-trekking-safari";
// Client builds widen these unions in their own content; the literal unions here
// make broken cross-references a compile error in the demo.

export type MonthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/** Copy marked "Demo version" in docs/copy. The variant is chosen by NEXT_PUBLIC_DEMO_MODE. */
export interface WithDemo<T> {
  live: T;
  demo: T;
}

export type TourCategory = "gorillas-and-chimps" | "savannah-wildlife" | "nile-and-adventure";

/** Internal reference resolved to href + label by lib/content/links.ts. */
export type LinkRef =
  | { kind: "tour"; slug: TourSlug; label?: string }
  | { kind: "destination"; slug: DestinationSlug; label?: string }
  | { kind: "guide"; slug: GuideSlug; label?: string }
  | { kind: "page"; href: `/${string}`; label: string };

export interface LabelValue {
  label: string;
  value: RichText;
}

export interface Faq {
  question: string;
  answer: RichText;
  /** True when the answer uses a fact from 12-fact-register.md (shows the stamp). */
  usesRegisteredFact?: boolean;
}

export interface MediaRef {
  id: string; // key into content/media.ts
}

export interface MediaEntry {
  id: string;
  /** Static import, so width/height/blurDataURL come from the file. */
  src: import("next/image").StaticImageData;
  alt: string;
  caption?: string;
  photographer: string;
  sourceUrl: string;
  licence: "Unsplash License" | "Pexels License" | "CC BY 4.0" | "CC BY-SA 4.0" | "Operator owned";
  /** 1200x630 crop for Open Graph. Falls back to site.defaultOgImage. */
  og?: import("next/image").StaticImageData;
}

export interface CloseCta {
  heading: string;
  body?: RichText;
  button: { label: string; href: LinkRef | "enquiry" | "whatsapp" };
}

// ---------- Tours ----------

export interface ItineraryDay {
  day: number;
  title: string; // "Kampala to Bwindi"
  /** The italic meta line, split on " · ". Label/value so labels render in mono. */
  facts: LabelValue[]; // [{label:"On the road", value:"8 to 9 hours"}, ...]
  body: RichText;
  /** Tour 5 day 1 renders the meta after the body. */
  factsAfterBody?: boolean;
}

/**
 * Price model from 04-tours.md. The 2/4/6 table rows and the 1 to 12 enquiry estimate
 * are both computed, never stored:
 *   vehicles = ceil(travellers / 6)
 *   perPerson = roundHalfUpTo10(perPersonCostUSD + perVehicleCostUSD * vehicles / travellers)
 * Checked 4 October 2026: the formula reproduces all six copy tables exactly.
 */
export interface TourPricing {
  validUntil: ISODate; // "2026-12-31"
  heading: string; // "Prices (per person, for travel until 31 December 2026)"
  perPersonCostUSD: number;
  perVehicleCostUSD: number;
  /** 200 for tours with a gorilla permit (1, 4, 5), else 0. Applied to April, May, November 2026. */
  lowSeasonDiscountUSD: 0 | 200;
  /** Tour 1 only shows the low-season column in its table. */
  showLowSeasonColumn: boolean;
  singleSupplementUSD: number;
  /** Extra rows exactly as written: "Children under 12 sharing with adults" / "Ask us". */
  extraRows?: LabelValue[];
  /** Column header for the low-season column. */
  lowSeasonLabel?: string; // "April, May, November dates"
  footnote?: RichText;
}

export interface Tour {
  slug: TourSlug;
  name: string;
  categories: TourCategory[]; // tours 3, 4, 5 carry two
  tag: string; // "Most booked"
  days: number;
  nights: number;
  destinations: DestinationSlug[]; // [] for tour 6
  metaLine: string; // "3 DAYS · BWINDI IMPENETRABLE"
  cardSummary: string;
  hero: { summary: RichText; keyFacts: string[]; image: MediaRef };
  atAGlance: LabelValue[];
  fit?: { goodFitIf: RichText; thinkTwiceIf: RichText };
  itinerary: ItineraryDay[];
  included: RichText[];
  notIncluded: RichText[];
  pricing: TourPricing;
  goodToKnow?: RichText[];
  faqs: Faq[];
  related: LinkRef[];
  close: CloseCta;
  gallery?: MediaRef[]; // cut-first item, see docs/plan.md
  /** Drives the "Good in {Month}" badge and sort on /tours?month= (02-global.md). */
  bestMonths: MonthNumber[];
  /** Drives the "Cheaper permits" badge in April, May and November. */
  includesPrimatePermits: boolean;
  /** Fields that also feed structured data. */
  minimumAge?: number; // 15 for gorilla tours, 12 for tour 3
}

// ---------- Destinations ----------

export interface Activity {
  name: string; // "Gorilla trekking"
  /** The " · " notes after the name: permit price, minimum age. */
  notes?: string[];
  body: RichText;
}

export interface Destination {
  slug: DestinationSlug;
  name: string; // "Bwindi Impenetrable National Park"
  shortName: string; // "Bwindi"
  /** Home and hub card label, which differs from shortName for Bwindi ("Bwindi Impenetrable"). */
  cardName: string;
  region: string;
  cardLine: string;
  hub: { forLine: string; driveFromKampala: string }; // hub table row
  hero: { summary: RichText; keyFacts: string[]; image: MediaRef };
  atAGlance: LabelValue[];
  whyGo: RichText[]; // paragraphs
  activities: Activity[];
  whenToGo: RichText;
  gettingThere: RichText;
  goodToKnow?: RichText[];
  faqs: Faq[];
  close: CloseCta;
  /** Wikipedia URL from the fact register; used as schema.org sameAs. */
  sameAs: string[];
  gallery?: MediaRef[];
  // "Tours that visit" is derived from Tour.destinations, not stored.
}

// ---------- Guides ----------

export type GuideBlock =
  | { type: "paragraph"; text: RichText }
  | { type: "list"; items: RichText[] }
  | { type: "orderedList"; items: RichText[] }
  | { type: "table"; columns: string[]; rows: RichText[][]; caption?: RichText }
  | { type: "stamp"; text: RichText } // "Checked 4 October 2026 ..."
  | { type: "monthEntry"; month: string; text: RichText }; // best-time guide

export interface GuideSection {
  id: string; // anchor used by jump links: "prices", "how-to-book"
  heading: string;
  blocks: GuideBlock[];
}

export interface Guide {
  slug: GuideSlug;
  title: string; // the Field: title (used for card + Article headline)
  h1: string; // differs from title for the permit guide
  cardLine: string;
  eyebrow: string;
  lede: RichText;
  jumpLinks?: { id: string; label: string }[];
  sections: GuideSection[];
  datePublished: ISODate;
  dateModified: ISODate;
  author: string; // "Kanyonyi Expeditions planning team"
  image: MediaRef;
  close: CloseCta;
  related: LinkRef[];
}

// ---------- Site config ----------

export interface SiteConfig {
  // Demo mode is not stored here. It comes from NEXT_PUBLIC_DEMO_MODE (AGENTS.md section 0),
  // read once in config/demo.ts. Copy with a demo variant uses WithDemo<T>.
  operator: {
    name: string; // "Kanyonyi Expeditions"
    shortName: string; // "Kanyonyi" (title suffix, voice rule)
    logoText: string;
    logoSubline: string;
    brandLine: string;
    nameStory: RichText;
  };
  nav: { label: string; href: `/${string}` }[];
  headerCta: { label: string; href: `/${string}` };
  footer: { columns: { title: string; links: { label: string; href: `/${string}` }[] }[] };
  contact: {
    // The WhatsApp number comes from NEXT_PUBLIC_WHATSAPP_NUMBER (digits only, for wa.me).
    // config/contact.ts formats it for display: "+256 750 242627".
    whatsappPrefill: string; // "Hi, I'm interested in the Kanyonyi demo site."
    officeDisplay: string; // "Kololo, Kampala (sample address)"
    hours: string;
    replyPromise: string;
    licenceLine: RichText;
  };
  currency: { ugxPerUsd: number; setOn: ISODate; tooltip: string };
  demo?: { notice: RichText; linkLabel: string; linkHref: string; footerLine: string };
  locale: "en-GB";
  timeZone: "Africa/Kampala";
  defaultOgImage: MediaRef;
  copyrightLine: string;
}
```

`content/facts.ts` holds the facts that are rendered as structured tables in more than one place, so a fee change happens in one file:

```ts
export const factsCheckedOn: ISODate = "2026-10-04";
export const factStamp = "Checked 4 October 2026 against Uganda Wildlife Authority and Uganda immigration sources. ...";
export const gorillaPermitRows: {
  visitor: string;        // "Foreign resident"
  visitorLong?: string;   // "Foreign resident (with a valid Ugandan or East African residence permit)"
  standard: string;       // "USD 700"
  lowSeason2026: string;  // "USD 500" | "Ask us"
  from2027: string;
}[];
```

The homepage reads three columns and the permit guide reads four, both from these rows. The same figures also appear inside prose sentences (for example "Permit USD 800" on the Bwindi page). That can't be de-duplicated without rewriting approved copy. The fact register is the cross-reference, and section 5 adds a test that catches drift.

### 3. How pages read content

- All content is imported synchronously at build time. There is no fetch and no database, so every content route is statically generated.
- Dynamic routes (`/tours/[slug]`, `/destinations/[slug]`, `/guides/[slug]`) export `generateStaticParams()` from the slug list and `export const dynamicParams = false`, so an unknown slug is a static 404.
- Page files call `getTour(slug)` (which throws `notFound()` on a miss) and pass plain props down to section components (`tour-hero.tsx`, `tour-itinerary.tsx`, and so on). Components never import from `content/` directly. Only `lib/content/*` and route files do. Swapping content therefore only touches one layer.
- Derived values are computed and never stored:
  - `pricePerPerson(tour, travellers, { lowSeason })` implements the 04-tours.md formula. `priceFrom(tour)` is that value for 2 travellers. The copy's `priceFromUSD` field and table rows aren't stored; tests assert the formula reproduces them.
  - "Tours that visit {destination}" filters tours by `destinations`. A test asserts the results match the lists in 05-destinations.md.
  - Destination card lists on the home page and hub use the `destinations/index.ts` order.
- Server Components read content. Client components (trip finder, month picker, tour filters, enquiry form) get the minimum serialisable data as props, for example `{slug, name, tiers}` for the estimate. They never get whole tour objects.

### 4. Client swap procedure

1. Replace every file in `content/` and `public/images/`. The compiler reports any missing required field.
2. Widen the slug unions in `types/content.ts` to the new slugs. This is the only edit outside `content/`, and it is deliberate: it keeps cross-references type checked.
3. Replace the brand tokens in `app/globals.css` (`:root` block only) and the three `next/font` families in `app/fonts.ts`.
4. Set the env vars from `env.example`: `NEXT_PUBLIC_DEMO_MODE=false`, the client's `NEXT_PUBLIC_WHATSAPP_NUMBER`, the site URL, email addresses and GA ID.
5. Run `npm test`. The content integrity suite checks slugs, references, meta lengths, banned phrases and em dashes.

### 5. Content integrity tests (Vitest)

`tests/content/integrity.test.ts` checks that:

- slugs are unique, every `LinkRef` resolves, and every `MediaRef` exists in `media.ts`
- the price formula reproduces every 2, 4 and 6 traveller row in 04-tours.md, including tour 1's low-season column, and the worked check (tour 1: 1 → 2,110, 3 → 1,500, 5 → 1,370, 7 → 1,450, 12 → 1,340)
- derived "Tours that visit" lists match 05-destinations.md
- titles are 60 characters or fewer and descriptions 155 or fewer (11-emails-and-meta.md)
- no rendered string contains an em dash, `[CLIENT:` bracket text, or a banned phrase from 01-voice.md
- every month in `seasons.ts` exists once and in order
- `bestMonths` and `includesPrimatePermits` match the `Field:` lines in 04-tours.md
- every `WithDemo` entry has both variants filled
- permit prices in prose match `facts.ts`: a small allow-list maps each fact to the strings that must appear (e.g. `"USD 800"` in Bwindi activities). This catches drift when facts.ts changes but prose doesn't.

## Implementation notes (S3, 4 October 2026)

- **Verbatim enforcement.** `tests/unit/content-verbatim.test.ts` checks every string in `content/` against `docs/copy/*.md` after stripping Markdown, "†" fact markers and placeholder names. It inspects more than 300 strings and fails on any rewording. Image alt text is excluded, because it is written at sourcing time.
- **Field checks.** `tests/unit/content-integrity.test.ts` parses the `Field:` lines in 04-tours.md and 05-destinations.md and compares names, tags, meta lines, costs, the from price, best months, destinations and every price-table row with the content files. It also checks that the derived "Tours that visit" lists match the copy, and that every link, image and jump link resolves.
- **Media model.** `MediaEntry.photo` is optional. Each planned shot from 13-photo-brief.md is registered now, with its aspect ratio and alt text. Until S4 adds the photo, pages render the brief's placeholder: a flat `--muted` block with the alt text.
- **Permit table** is a `permitTable` block that reads `content/facts.ts`, so the home page and the permit guide share one set of fees.
- **Policies** are `WithDemo<PolicySection[]>`. `[CLIENT: ...]` placeholders with no demo value are omitted from the live variant rather than rendered.
- **Emails** move to `content/emails.ts` in S8, with the enquiry flow.

## Implementation notes (S6, 4 October 2026)

- Destination and guide routes are statically generated from the existing read layer, with `dynamicParams = false` and `notFound()` for unknown content.
- `lib/content/pages.ts` exposes the hub, index, about, FAQ, policy and interface copy; `lib/content/facts.ts` exposes the shared permit data. New destination headings and the dated guide eyebrow live in `content/pages/` and are exported from `lib/content/all.ts` for verbatim enforcement.
- `GuideBlock` renders paragraphs, unordered/ordered lists, tables, stamps, `permitTable` and `monthEntry`. `PermitTable` supports both the guide's four columns and the S7 homepage's three columns, retaining the official currency of each fee.
- `Guide.factStamp` is an optional closing stamp. The best-time guide uses the approved global stamp because it repeats permit prices without a stamp block (plan gap G17).
- About content has `team.liveMembers`, initially empty, alongside the sample members. `pickVariant()` selects the real or sample list; the demo explicitly labels the sample entries. A client fills `liveMembers` and the live licence text in its content swap.
- Policies use the existing `content/pages/policies.ts` model, with `pickVariant()` and the demo notice. No new policy wording was authored.
- `/plan-your-trip` is an interim contact page so the sitemap and conversion links work in S6. Its approved heading, lede, WhatsApp contact/hours and `interimBody` variants are in content. S8 must replace it with the specified form and full side panel. The interim page omits claims about sending a form, database storage or confirmation emails.

## Consequences

### Homepage implementation (S7, 4 October 2026)

- The homepage composes ten section components from the approved `home` object through `lib/content/pages.ts`. Cards, permit fees, seasonal notes and interface labels retain their existing content sources. No marketing copy was rewritten.
- `getTravelMonths(now)` supplies the current month and following eleven using `Africa/Kampala`, including year boundaries. The server passes the same serialisable list to the trip finder and month picker; home revalidates daily (`86400`).
- `MonthNote.futureNote` holds the nearest approved weather-only lines for April, May and November when their linked travel date is in 2027 or later (G18). The existing 2027 rates notice accompanies those choices. The tours listing consumes the same fallback; the original 2026 notes remain verbatim.
- The reviews section uses `pickVariant`: the honest placeholder is demo only; the live variant is absent until genuine client reviews are supplied. No review identities or ratings are generated.


- Content edits need a developer and a deploy. That is acceptable until an operator needs self-service editing, which is the CMS trigger named in the brief.
- Prose that repeats a fact can drift. The integrity test reduces the risk but doesn't remove it.
- The data model stays open to bookings later: `Tour.pricing.tiers` and `slug` are what an availability or booking table would reference.

## Alternatives considered

- **MDX for guides:** four extra dependencies and Turbopack loader configuration, for three pages. Rejected.
- **JSON files with Zod validation at build:** this gives runtime validation but loses literal slug unions and `StaticImageData` imports. TypeScript `satisfies` gives the same checking at compile time. Rejected.
- **Content in Neon now:** the brief says files until the operator needs to edit. Rejected.
