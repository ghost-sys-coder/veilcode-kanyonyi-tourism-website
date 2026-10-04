import type { NextConfig } from "next";
import { isIndexable } from "./config/demo";

// Response headers for every route (docs/decisions/002 section 7).
// X-Robots-Tag also covers llms.txt, the sitemap and images, which a meta tag cannot.
// A strict Content-Security-Policy is deferred to Phase 08: nonce-based CSP makes every page dynamic.

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          ...(isIndexable ? [] : [{ key: "X-Robots-Tag", value: "noindex" }]),
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
