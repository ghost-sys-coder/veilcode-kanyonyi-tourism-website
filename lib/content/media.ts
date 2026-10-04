import { media } from "@/content/media";
import type { MediaEntry, MediaRef } from "@/types/content";

/** Looks up an image. Throws on an unknown id so a typo fails the build, not the page. */
export function getMedia(ref: MediaRef): MediaEntry {
  const entry = media[ref.id];
  if (!entry) throw new Error(`Unknown media id "${ref.id}"`);
  return entry;
}

export function allMedia(): MediaEntry[] {
  return Object.values(media);
}
