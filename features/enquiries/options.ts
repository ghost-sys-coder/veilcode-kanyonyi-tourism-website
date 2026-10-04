import { getTravelMonths } from "@/features/home/lib/travel-months";
import { planYourTrip } from "@/lib/content/pages";
import { getTours } from "@/lib/content/tours";

export const TOUR_CUSTOM = "custom";
export const MONTH_NOT_SURE = "not-sure";
export const flexibilityOptions = Object.entries(planYourTrip.form.fields.flexibility.options).map(([value, label]) => ({ value, label }));
export const residencyOptions = Object.entries(planYourTrip.form.fields.residency.options).map(([value, label]) => ({ value, label }));
export const under15Options = Object.entries(planYourTrip.form.fields.anyoneUnder15.options).map(([value, label]) => ({ value, label }));
export const tourOptions = [...getTours().map(({ slug, name }) => ({ value: slug, label: name })), { value: TOUR_CUSTOM, label: planYourTrip.form.fields.tour.custom }];
export function getEnquiryMonths(now: Date) {
  return [...getTravelMonths(now, 18), { value: MONTH_NOT_SURE, label: planYourTrip.form.fields.travelMonth.notSure }];
}
