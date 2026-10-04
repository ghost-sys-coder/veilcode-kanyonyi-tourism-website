import { guides } from "@/content/guides";
import type { Guide } from "@/types/content";

export function getGuides(): Guide[] {
  return guides;
}

export function getGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function guideSlugs(): string[] {
  return guides.map((guide) => guide.slug);
}
