import type { WithDemo } from "@/types/content";

// Fail-safe (docs/decisions/002 section 2): only the exact string "false" turns demo mode off.
// An unset or mistyped value keeps the demo bar and demo copy. Indexing is separate.
export function parseDemoMode(value: string | undefined): boolean {
  return value !== "false";
}

export const isDemo = parseDemoMode(process.env.NEXT_PUBLIC_DEMO_MODE);

export function pickVariant<T>(variants: WithDemo<T>): T {
  return isDemo ? variants.demo : variants.live;
}
