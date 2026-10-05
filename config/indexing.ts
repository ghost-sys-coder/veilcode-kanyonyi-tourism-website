import { isDemo } from "./demo";

// Indexing is independent of sample copy (002 section 2, Frank's 5 October request).
// Previews stay protected even if a production override is accidentally copied.
export function resolveIndexing(demo: boolean, value: string | undefined, deployment?: string): boolean {
  if (deployment === "preview") return false;
  if (value === "true") return true;
  if (value === "false") return false;
  return !demo;
}

export const isIndexable = resolveIndexing(isDemo, process.env.SITE_INDEXING_ENABLED, process.env.VERCEL_ENV);
