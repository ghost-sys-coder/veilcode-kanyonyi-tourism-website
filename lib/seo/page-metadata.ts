import type { Metadata } from "next";
import { meta, type MetaPath } from "@/content/meta";
import { site } from "@/content/site";
import { getMedia } from "@/lib/content/media";
import type { MediaRef } from "@/types/content";

// Per-route metadata from content/meta.ts (docs/decisions/002 section 3).
// Canonical is always the clean path; filtered or tracked URLs never become canonical.
// og:title is the title without " | Kanyonyi"; og:image is the page's hero crop at 1200 × 630
// (11-emails-and-meta.md), falling back to the homepage hero.

export const DEFAULT_OG_IMAGE: MediaRef = { id: "home-hero" };

export function ogImageFor(ref: MediaRef = DEFAULT_OG_IMAGE) {
  const entry = getMedia(ref);
  const og = entry.photo?.og ?? getMedia(DEFAULT_OG_IMAGE).photo?.og;
  return og ? [{ url: og.src, width: og.width, height: og.height, alt: entry.alt }] : undefined;
}

export function pageMetadata(
  path: MetaPath,
  options: { type?: "website" | "article"; image?: MediaRef } = {},
): Metadata {
  const entry = meta[path];
  const absolute = "absoluteTitle" in entry ? entry.absoluteTitle : undefined;
  const images = ogImageFor(options.image);

  return {
    title: absolute ? { absolute } : entry.title,
    description: entry.description,
    alternates: { canonical: path },
    openGraph: {
      title: entry.title,
      description: entry.description,
      url: path,
      siteName: site.operator.name,
      locale: "en_GB",
      type: options.type ?? "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.description,
      images,
    },
  };
}
