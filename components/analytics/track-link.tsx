"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import type { AnalyticsEvents, EventName } from "@/lib/analytics/events";
import { track } from "@/lib/analytics/track";

/** A next/link that sends one analytics event on click (e.g. view_itinerary from a card). */
export function TrackLink<E extends EventName>({
  event,
  params,
  onClick,
  ...props
}: ComponentProps<typeof Link> & { event: E; params: AnalyticsEvents[E] }) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        track(event, params);
        onClick?.(e);
      }}
    />
  );
}
