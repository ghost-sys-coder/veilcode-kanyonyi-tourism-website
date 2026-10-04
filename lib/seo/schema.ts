import type { BreadcrumbList, FAQPage, ItemList, Organization, Thing, TouristTrip, WebSite, WithContext } from "schema-dts";
import { absoluteUrl, siteUrl } from "@/config/site-url";
import { site } from "@/content/site";
import { getDestination } from "@/lib/content/destinations";
import { getMedia } from "@/lib/content/media";
import { richTextToPlain } from "@/lib/content/rich-text";
import type { Faq, Tour } from "@/types/content";

// Schema.org builders (docs/decisions/002 section 9). Every value comes from the content the page
// renders. For a fictional operator the brief forbids Review, AggregateRating, LocalBusiness
// (including TravelAgency), Offer and PostalAddress; tests/unit/schema.test.ts enforces it.

export const ORGANIZATION_ID = `${siteUrl.origin}/#organization`;
export const WEBSITE_ID = `${siteUrl.origin}/#website`;

export function organizationSchema(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: site.operator.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/icon.svg"),
    description: site.operator.brandLine,
  };
}

export function websiteSchema(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: site.operator.name,
    url: absoluteUrl("/"),
    inLanguage: site.locale,
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export interface Crumb {
  label: string;
  href: string;
}

export function breadcrumbSchema(crumbs: Crumb[]): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: absoluteUrl(crumb.href),
    })),
  };
}

/**
 * A tour as schema.org TouristTrip. No `offers`: the brief forbids Offer for a fictional operator,
 * and the prices are sample values. The itinerary lists the destinations the tour visits.
 */
export function touristTripSchema(tour: Tour): WithContext<TouristTrip> {
  const photo = getMedia(tour.hero.image).photo;
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.name,
    description: richTextToPlain(tour.hero.summary),
    url: absoluteUrl(`/tours/${tour.slug}`),
    ...(photo ? { image: absoluteUrl(photo.src.src) } : {}),
    provider: { "@id": ORGANIZATION_ID },
    ...(tour.destinations.length
      ? {
          itinerary: {
            "@type": "ItemList",
            itemListElement: tour.destinations.map((slug, index) => {
              const destination = getDestination(slug);
              return {
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "TouristDestination",
                  name: destination?.name ?? slug,
                  url: absoluteUrl(`/destinations/${slug}`),
                },
              };
            }),
          },
        }
      : {}),
  };
}

export function faqPageSchema(faqs: readonly Faq[]): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: richTextToPlain(faq.answer) },
    })),
  };
}

export function itemListSchema(items: { name: string; href: string }[]): WithContext<ItemList> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.href),
    })),
  };
}

/** Serialises JSON-LD for a <script> tag, escaping "<" so content can never close the tag. */
export function serializeJsonLd(data: WithContext<Thing> | WithContext<Thing>[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
