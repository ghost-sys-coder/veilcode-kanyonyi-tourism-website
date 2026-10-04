import { isDemo } from "@/config/demo";
import { siteUrl } from "@/config/site-url";
import { buildLlmsTxt } from "@/lib/seo/llms";

// Built once at build time (002 section 8). X-Robots-Tag on the demo comes from next.config.ts.
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsTxt({ origin: siteUrl.origin, demo: isDemo }), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
