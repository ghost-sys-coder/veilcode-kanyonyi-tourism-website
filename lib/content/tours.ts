import { tours } from "@/content/tours";
import type { DestinationSlug, Tour, TourCategory } from "@/types/content";

// Read layer for tours (001 section 3). Pages and components use these, never content/ directly.

export function getTours(): Tour[] {
  return tours;
}

export function getTour(slug: string): Tour | undefined {
  return tours.find((tour) => tour.slug === slug);
}

export function tourSlugs(): string[] {
  return tours.map((tour) => tour.slug);
}

/** "Tours that visit {destination}": derived from Tour.destinations, never stored. */
export function getToursForDestination(slug: DestinationSlug): Tour[] {
  return tours.filter((tour) => tour.destinations.includes(slug));
}

export function getToursInCategory(category: TourCategory): Tour[] {
  return tours.filter((tour) => tour.categories.includes(category));
}
