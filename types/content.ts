import type { StaticImageData } from "next/image";

// Content model for everything in content/ (docs/decisions/001-content-architecture.md).
// A client build replaces content/ and widens the slug unions below; nothing else here changes.

/** A string that may contain **bold**, *italic* and [label](/href). Nothing else. */
export type RichText = string;

/** Calendar date, e.g. "2026-10-04". */
export type ISODate = `${number}-${number}-${number}`;

export type InternalHref = `/${string}`;

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

export type TourCategory = "gorillas-and-chimps" | "savannah-wildlife" | "nile-and-adventure";

export type MonthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/** Copy marked "Demo version" in docs/copy. The variant is chosen by NEXT_PUBLIC_DEMO_MODE. */
export interface WithDemo<T> {
  live: T;
  demo: T;
}

/** Internal reference, resolved to href and label by lib/content/links.ts. */
export type LinkRef =
  | { kind: "tour"; slug: TourSlug; label?: string }
  | { kind: "destination"; slug: DestinationSlug; label?: string }
  | { kind: "guide"; slug: GuideSlug; label?: string }
  | { kind: "page"; href: InternalHref; label: string };

export interface LabelValue {
  label: string;
  value: RichText;
}

export interface Faq {
  question: string;
  answer: RichText;
  /** True when the answer uses a fact from 12-fact-register.md (the page shows the stamp). */
  usesRegisteredFact?: boolean;
}

export interface MediaRef {
  /** Key into content/media.ts. */
  id: string;
}

export type MediaLicence =
  | "Unsplash License"
  | "Pexels License"
  | "CC BY 4.0"
  | "CC BY-SA 4.0"
  | "Operator owned";

export interface MediaEntry {
  id: string;
  /** Static import, so width, height and blurDataURL come from the file. */
  src: StaticImageData;
  alt: string;
  caption?: string;
  photographer: string;
  /** "Unsplash" or "Pexels", used in the "Photo: {photographer} / {source}" credit. */
  sourceName: string;
  sourceUrl: string;
  licence: MediaLicence;
  /** 1200 × 630 crop for Open Graph. Falls back to site.defaultOgImage. */
  og?: StaticImageData;
}

export type CtaTarget = LinkRef | "enquiry" | "whatsapp";

export interface CloseCta {
  heading: string;
  body?: RichText;
  button: { label: string; target: CtaTarget };
}

// ---------- Tours ----------

export interface ItineraryDay {
  day: number;
  /** "Kampala to Bwindi" */
  title: string;
  /** The italic meta line, split on " · " into label and value pairs. */
  facts: LabelValue[];
  body: RichText;
  /** Tour 5 day 1 shows its meta line after the body. */
  factsAfterBody?: boolean;
}

/**
 * Price model from 04-tours.md. Table rows and the 1 to 12 traveller estimate are computed
 * by lib/content/pricing.ts, never stored:
 *   vehicles  = ceil(travellers / 6)
 *   perPerson = roundHalfUpTo10(perPersonCostUSD + perVehicleCostUSD * vehicles / travellers)
 */
export interface TourPricing {
  validUntil: ISODate;
  /** "Prices (per person, for travel until 31 December 2026)" */
  heading: string;
  perPersonCostUSD: number;
  perVehicleCostUSD: number;
  /** 200 for tours with a gorilla permit, applied to April, May and November 2026 dates. */
  lowSeasonDiscountUSD: 0 | 200;
  /** Only tour 1 shows the low-season column in its table. */
  showLowSeasonColumn: boolean;
  /** Column header for the low-season column. */
  lowSeasonLabel?: string;
  singleSupplementUSD: number;
  /** Extra rows exactly as written, e.g. "Children under 12 sharing with adults" / "Ask us". */
  extraRows?: LabelValue[];
  footnote?: RichText;
}

export interface Tour {
  slug: TourSlug;
  name: string;
  /** Tours 3, 4 and 5 carry two. */
  categories: TourCategory[];
  tag: string;
  days: number;
  nights: number;
  /** Empty for the Jinja trip. */
  destinations: DestinationSlug[];
  /** "3 DAYS · BWINDI IMPENETRABLE" */
  metaLine: string;
  cardSummary: string;
  bestMonths: MonthNumber[];
  includesPrimatePermits: boolean;
  minimumAge?: number;
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
  /** First to be cut if time runs short (docs/plan.md). */
  gallery?: MediaRef[];
}

// ---------- Destinations ----------

export interface Activity {
  name: string;
  /** The " · " notes after the name: permit price, minimum age. */
  notes?: string[];
  body: RichText;
}

export interface Destination {
  slug: DestinationSlug;
  /** "Bwindi Impenetrable National Park" */
  name: string;
  /** "Bwindi" */
  shortName: string;
  /** Home and hub card name, e.g. "Bwindi Impenetrable". */
  cardName: string;
  region: string;
  cardLine: string;
  hub: { forLine: string; driveFromKampala: string };
  hero: { summary: RichText; keyFacts: string[]; image: MediaRef };
  atAGlance: LabelValue[];
  whyGo: RichText[];
  activities: Activity[];
  whenToGo: RichText;
  gettingThere: RichText;
  goodToKnow?: RichText[];
  faqs: Faq[];
  close: CloseCta;
  /** Wikipedia URL from the fact register, used as schema.org sameAs. */
  sameAs: string[];
  gallery?: MediaRef[];
  // "Tours that visit" is derived from Tour.destinations, never stored.
}

// ---------- Guides ----------

export type GuideBlock =
  | { type: "paragraph"; text: RichText }
  | { type: "list"; items: RichText[] }
  | { type: "orderedList"; items: RichText[] }
  | { type: "table"; columns: string[]; rows: RichText[][]; caption?: RichText }
  | { type: "stamp"; text: RichText }
  | { type: "monthEntry"; month: string; text: RichText };

export interface GuideSection {
  /** Anchor used by jump links, e.g. "prices". */
  id: string;
  heading: string;
  blocks: GuideBlock[];
}

export interface Guide {
  slug: GuideSlug;
  /** Card and Article headline. */
  title: string;
  /** Differs from title for the permit guide. */
  h1: string;
  cardLine: string;
  lede: RichText;
  jumpLinks?: { id: string; label: string }[];
  sections: GuideSection[];
  datePublished: ISODate;
  dateModified: ISODate;
  /** "Kanyonyi Expeditions planning team" */
  author: string;
  image: MediaRef;
  close: CloseCta;
  related: LinkRef[];
}

// ---------- Site config ----------

export interface NavLink {
  label: string;
  href: InternalHref;
}

export interface SiteConfig {
  // Demo mode comes from NEXT_PUBLIC_DEMO_MODE (config/demo.ts), and the WhatsApp number
  // from NEXT_PUBLIC_WHATSAPP_NUMBER (config/contact.ts). Neither is stored here.
  operator: {
    /** "Kanyonyi Expeditions" */
    name: string;
    /** "Kanyonyi": title suffix and running text (01-voice.md). */
    shortName: string;
    logoText: string;
    logoSubline: string;
    brandLine: string;
    nameStory: RichText;
  };
  nav: NavLink[];
  headerCta: NavLink;
  footer: {
    columns: { title: string; links: NavLink[] }[];
    contact: {
      title: string;
      /** No public mailbox exists, so this line names no address (02-global.md). */
      email: string;
      office: WithDemo<string>;
      hours: string;
    };
    licenceLine: WithDemo<RichText>;
    bottomLine: WithDemo<string>;
    cookieSettingsLabel: string;
  };
  whatsapp: {
    /** Prefilled message on the demo, used on every wa.me link. */
    demoPrefill: string;
    /** Client builds, from a tour page: "{tour}" and "{month}" are filled in. */
    tourPrefillTemplate: string;
    /** Mobile menu line under "Chat on WhatsApp". */
    replyHours: string;
  };
  currency: {
    ugxPerUsd: number;
    setOn: ISODate;
    labels: { usd: string; ugx: string };
    tooltip: string;
  };
  demoNotice: { text: RichText; linkLabel: string; linkHref: string };
  locale: "en-GB";
  timeZone: "Africa/Kampala";
  defaultOgImage?: MediaRef;
}

// ---------- Page metadata ----------

export interface PageMeta {
  /** Without the " | Kanyonyi" suffix; the root layout template adds it. */
  title: string;
  /** Overrides the template entirely (home page). */
  absoluteTitle?: string;
  description: string;
}
