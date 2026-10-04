import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site-url";
import { factsCheckedOn } from "@/content/facts";
import { meta } from "@/content/meta";
import { getGuides } from "@/lib/content/guides";

// Every indexable route has an entry in content/meta.ts, so the sitemap is built from it rather
// than a second hand-written list (002 section 5). Guides use their own dateModified; everything
// else uses the date the content and facts were last checked. No changeFrequency or priority:
// Google ignores both.

export default function sitemap(): MetadataRoute.Sitemap {
  const guideDates = new Map(getGuides().map((g) => [`/guides/${g.slug}`, g.dateModified]));
  return Object.keys(meta).map((path) => ({
    url: absoluteUrl(path),
    lastModified: guideDates.get(path) ?? factsCheckedOn,
  }));
}
