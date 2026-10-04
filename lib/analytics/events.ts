// GA4 events, limited to the names in AGENTS.md section 25 (docs/decisions/003 section 8).
// Each event answers a business question; add a name here before tracking anything new.

export type WhatsAppLocation =
  | "floating"
  | "header_menu"
  | "tour_page"
  | "success"
  | "plan_page"
  | "closing_cta"
  | "footer";

export interface AnalyticsEvents {
  destination_view: { destination_slug: string };
  tour_view: { tour_slug: string };
  tour_search: { experience: string; month: string; length: string };
  tour_filter: { filter: string; value: string };
  view_itinerary: { tour_slug: string; list: "home" | "tours" | "destination" };
  check_availability: { source_path: string };
  start_enquiry: { tour_slug: string; source_path: string };
  submit_enquiry: { tour_slug: string; travellers: number; value: number; currency: "USD"; residency: string };
  whatsapp_click: { location: WhatsAppLocation; tour_slug?: string };
}

export type EventName = keyof AnalyticsEvents;

export const CONSENT_STORAGE_KEY = "kx-analytics-consent";
export type ConsentChoice = "granted" | "denied";

/** Dispatched to reopen the consent banner from "Cookie settings". */
export const OPEN_CONSENT_EVENT = "kx:open-consent";
