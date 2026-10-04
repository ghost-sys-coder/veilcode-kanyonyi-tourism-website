import type { LinkRef } from "@/types/content";
import { getDestination } from "@/lib/content/destinations";
import { getGuide } from "@/lib/content/guides";
import { getTour } from "@/lib/content/tours";

export interface ResolvedLink {
  href: string;
  label: string;
}

/**
 * Turns a content LinkRef into an href and label. Throws on a reference to content that
 * doesn't exist, so a broken link fails the build instead of shipping a 404.
 */
export function resolveLink(ref: LinkRef): ResolvedLink {
  switch (ref.kind) {
    case "tour": {
      const tour = getTour(ref.slug);
      if (!tour) throw new Error(`Unknown tour "${ref.slug}"`);
      return { href: `/tours/${tour.slug}`, label: ref.label ?? tour.name };
    }
    case "destination": {
      const destination = getDestination(ref.slug);
      if (!destination) throw new Error(`Unknown destination "${ref.slug}"`);
      return { href: `/destinations/${destination.slug}`, label: ref.label ?? destination.name };
    }
    case "guide": {
      const guide = getGuide(ref.slug);
      if (!guide) throw new Error(`Unknown guide "${ref.slug}"`);
      return { href: `/guides/${guide.slug}`, label: ref.label ?? guide.h1 };
    }
    case "page":
      return { href: ref.href, label: ref.label };
  }
}
