import type { BreadcrumbList, Organization, Thing, WebSite, WithContext } from "schema-dts";
import { absoluteUrl, siteUrl } from "@/config/site-url";
import { site } from "@/content/site";

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

/** Serialises JSON-LD for a <script> tag, escaping "<" so content can never close the tag. */
export function serializeJsonLd(data: WithContext<Thing> | WithContext<Thing>[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
