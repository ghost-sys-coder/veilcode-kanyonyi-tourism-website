import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site-url";

// Crawling is always allowed, even on the demo (002 section 6): a crawler blocked by robots.txt
// never sees the noindex tag, and Google can still index a blocked URL from links elsewhere.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
