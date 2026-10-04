import { estimateTotal } from "@/lib/content/pricing";
import { getTour } from "@/lib/content/tours";

export function enquiryEstimate(tourSlug: string, travellers: number): number | null {
  const tour = getTour(tourSlug);
  return tour ? estimateTotal(tour.pricing, travellers) : null;
}
