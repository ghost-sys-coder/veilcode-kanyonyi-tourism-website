"use client";

import type { ComponentProps } from "react";
import type { WhatsAppLocation } from "@/lib/analytics/events";
import { track } from "@/lib/analytics/track";
import { ui } from "@/content/ui";

type Props = Omit<ComponentProps<"a">, "href" | "target" | "rel"> & {
  href: string;
  location: WhatsAppLocation;
  tourSlug?: string;
};

/** Every WhatsApp link goes through here so `whatsapp_click` (a key event) is never missed. */
export function WhatsAppLink({ href, location, tourSlug, children, onClick, ...props }: Props) {
  return (
    <a
      {...props}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => {
        track("whatsapp_click", { location, ...(tourSlug ? { tour_slug: tourSlug } : {}) });
        onClick?.(event);
      }}
    >
      {children}
      <span className="sr-only"> {ui.a11y.externalLinkSuffix}</span>
    </a>
  );
}
