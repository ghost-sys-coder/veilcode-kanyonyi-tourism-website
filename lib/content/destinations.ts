import { destinations } from "@/content/destinations";
import type { Destination } from "@/types/content";

export function getDestinations(): Destination[] {
  return destinations;
}

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((destination) => destination.slug === slug);
}

export function destinationSlugs(): string[] {
  return destinations.map((destination) => destination.slug);
}
