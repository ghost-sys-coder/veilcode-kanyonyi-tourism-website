import { z } from "zod";
import { planYourTrip, ui } from "@/lib/content/pages";
import { tourSlugs } from "@/lib/content/tours";
import { fill } from "@/lib/content/format";
import { getEnquiryMonths, MONTH_NOT_SURE, TOUR_CUSTOM } from "./options";

const E = planYourTrip.form.errors;
const optionalChoice = (values: [string, ...string[]], label: string) => z.preprocess(
  (v) => v === "" ? undefined : v,
  z.enum(values, { error: fill(ui.form.genericRequired, { field: label }) }).optional(),
);

export function createEnquirySchema(now: Date) {
  const months = new Set(getEnquiryMonths(now).map(({ value }) => value));
  return z.object({
    tour: z.enum([TOUR_CUSTOM, ...tourSlugs()], { error: E.tour }),
    travelMonth: z.string({ error: E.travelMonth }).refine((v) => v === MONTH_NOT_SURE || months.has(v), E.travelMonth),
    flexibility: optionalChoice(["fixed", "week-or-two", "any-time-that-month"], planYourTrip.form.fields.flexibility.label),
    travellers: z.coerce.number({ error: E.travellers }).int(E.travellers).min(1, E.travellers).max(12, E.travellers),
    anyoneUnder15: optionalChoice(["no", "yes"], planYourTrip.form.fields.anyoneUnder15.label),
    residency: z.enum(["outside-east-africa", "east-africa"], { error: E.residency }),
    name: z.string({ error: E.name }).trim().min(1, E.name).max(120, E.name),
    email: z.string({ error: E.email }).trim().max(254, E.email).pipe(z.email({ error: E.email })),
    whatsapp: z.string({ error: E.whatsapp }).trim().max(32, E.whatsapp).refine((v) => !v || /^\+?[0-9 ()-]{7,}$/.test(v), E.whatsapp).optional(),
    notes: z.string().trim().max(2000, fill(ui.form.genericRequired, { field: planYourTrip.form.fields.notes.label })).optional(),
    consent: z.literal("on", { error: E.consent }),
    sourcePath: z.string().max(200).regex(/^\/(?!\/)[^\r\n?#]*$/).default("/plan-your-trip"),
    utmSource: z.string().max(100).optional(),
    utmMedium: z.string().max(100).optional(),
    utmCampaign: z.string().max(100).optional(),
  });
}

export type EnquiryInput = z.output<ReturnType<typeof createEnquirySchema>>;
export type FieldErrors = Partial<Record<keyof EnquiryInput, string>>;
export type FormValues = Record<string, string>;

export function readFormData(data: FormData): FormValues {
  const values: FormValues = {};
  // Native <noscript> controls follow the enhanced controls; use their values on a no-JS POST.
  for (const [key, value] of data) if (!key.startsWith("$ACTION_") && typeof value === "string") values[key] = value;
  return values;
}

export function validateEnquiry(values: FormValues, now: Date) {
  const parsed = createEnquirySchema(now).safeParse(values);
  const fieldErrors: FieldErrors = {};
  if (!parsed.success) for (const issue of parsed.error.issues) {
    const field = issue.path[0] as keyof EnquiryInput;
    if (!fieldErrors[field]) fieldErrors[field] = issue.message;
  }
  return { parsed, fieldErrors };
}
