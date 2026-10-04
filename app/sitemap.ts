import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site-url";
import { meta } from "@/content/meta";

// Every indexable route has an entry in content/meta.ts, so the sitemap is built from it rather
// than a second hand-written list (002 section 5). No changeFrequency or priority: Google ignores both.
// S3 replaces the single date with each guide's dateModified.
const CONTENT_UPDATED = "2026-10-04";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.keys(meta).map((path) => ({
    url: absoluteUrl(path),
    lastModified: CONTENT_UPDATED,
  }));
}
