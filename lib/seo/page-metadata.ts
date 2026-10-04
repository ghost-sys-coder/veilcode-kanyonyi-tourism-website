import type { Metadata } from "next";
import { meta, type MetaPath } from "@/content/meta";
import { site } from "@/content/site";

// Per-route metadata from content/meta.ts (docs/decisions/002 section 3).
// Canonical is always the clean path; filtered or tracked URLs never become canonical.
// og:title is the title without " | Kanyonyi" (11-emails-and-meta.md).

export function pageMetadata(path: MetaPath, options: { type?: "website" | "article" } = {}): Metadata {
  const entry = meta[path];
  const absolute = "absoluteTitle" in entry ? entry.absoluteTitle : undefined;

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
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.description,
    },
  };
}
