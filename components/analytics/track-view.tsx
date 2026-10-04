"use client";

import { useEffect } from "react";
import type { AnalyticsEvents, EventName } from "@/lib/analytics/events";
import { track } from "@/lib/analytics/track";

/** Fires a page-view style event once per mount (e.g. tour_view). Renders nothing. */
export function TrackView<E extends EventName>({ event, params }: { event: E; params: AnalyticsEvents[E] }) {
  const key = JSON.stringify(params);
  useEffect(() => {
    track(event, JSON.parse(key) as AnalyticsEvents[E]);
  }, [event, key]);
  return null;
}
