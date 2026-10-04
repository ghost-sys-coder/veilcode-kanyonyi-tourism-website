import Image from "next/image";
import { ui } from "@/content/ui";
import { fill } from "@/lib/content/format";
import { getMedia } from "@/lib/content/media";
import { cn } from "@/lib/utils";
import type { MediaRef } from "@/types/content";

// Every photo goes through here (DESIGN.md section 7, 004 section 9).
// Presets set `sizes` so the browser never downloads an image wider than it renders:
//   hero: full width, 4:5 on phones and 16:9 from 768px, priority (it is the LCP element)
//   card: 3:2 in a 1/2/3 column grid capped by the 1180px container
//   inline: content-width figure inside a page column

const PRESETS = {
  hero: { sizes: "100vw", aspect: "aspect-[4/5] md:aspect-video" },
  card: { sizes: "(min-width: 1024px) 380px, (min-width: 720px) 50vw, 100vw", aspect: "aspect-[3/2]" },
  inline: { sizes: "(min-width: 1180px) 760px, 100vw", aspect: "aspect-video" },
} as const;

export function SiteImage({
  media,
  preset,
  priority = false,
  showCaption = false,
  sizes: sizesOverride,
  className,
}: {
  media: MediaRef;
  preset: keyof typeof PRESETS;
  priority?: boolean;
  showCaption?: boolean;
  /** Only when the image sits in a narrower column than its preset assumes. */
  sizes?: string;
  className?: string;
}) {
  const entry = getMedia(media);
  const { aspect } = PRESETS[preset];
  const sizes = sizesOverride ?? PRESETS[preset].sizes;
  const frame = cn("relative overflow-hidden bg-muted", aspect, className);

  const picture = entry.photo ? (
    <div className={frame}>
      <Image
        src={entry.photo.src}
        alt={entry.alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        className="object-cover"
      />
    </div>
  ) : (
    // 13-photo-brief.md rule 5: until a photo is in place, a flat --muted block with the alt text.
    <div role="img" aria-label={entry.alt} className={cn(frame, "flex items-center justify-center p-6")}>
      <p aria-hidden className="measure text-center text-body-s text-muted-foreground">
        {entry.alt}
      </p>
    </div>
  );

  if (!showCaption || !entry.caption) return picture;

  return (
    <figure className="flex flex-col gap-2">
      {picture}
      <figcaption className="text-body-s text-muted-foreground">
        {entry.caption}
        {entry.photo ? (
          <>
            {" "}
            <a
              href={entry.photo.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              {fill(ui.labels.imageCredit, {
                photographer: entry.photo.photographer,
                source: entry.photo.sourceName,
              })}
              <span className="sr-only"> {ui.a11y.externalLinkSuffix}</span>
            </a>
          </>
        ) : null}
      </figcaption>
    </figure>
  );
}
