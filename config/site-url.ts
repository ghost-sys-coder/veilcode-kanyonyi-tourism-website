// The site's base URL comes from one env var (AGENTS.md section 0, default 1).
// Never hardcode the hostname: moving to a client domain must be a config change.

const raw = process.env.NEXT_PUBLIC_SITE_URL;

if (!raw && process.env.VERCEL_ENV === "production") {
  throw new Error("NEXT_PUBLIC_SITE_URL must be set for production builds");
}

export const siteUrl = new URL(raw ?? "http://localhost:3000");

/** Absolute URL for a site path, e.g. absoluteUrl("/tours") -> "https://kanyonyi.veilcode.studio/tours". */
export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}
