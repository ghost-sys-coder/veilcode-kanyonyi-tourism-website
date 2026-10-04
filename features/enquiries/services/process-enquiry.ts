import { planYourTrip } from "@/lib/content/pages";
import type { EmailMessage } from "@/services/email/resend";
import { enquiryEstimate } from "../estimate";
import { readFormData, validateEnquiry } from "../schema";
import type { EnquiryState } from "../state";
import { buildOperatorEmail, buildTravellerEmail, enquiryLabels, type EmailContext } from "./enquiry-emails";
import type { EnquiryRepository } from "./enquiry-repository";

export interface SubmitDependencies {
  now: Date;
  ipHash: string;
  repository: EnquiryRepository;
  send: (message: EmailMessage, key: string) => Promise<string>;
  email: Omit<EmailContext, "reference" | "input" | "estimate" | "now">;
  log: (detail: { reference?: string; stage: string; errorName: string }) => void;
}

function errorName(error: unknown): string {
  return error instanceof Error ? error.name : "UnknownError";
}

export async function processEnquiry(data: FormData, deps: SubmitDependencies): Promise<EnquiryState> {
  const values = readFormData(data);
  // Bot submissions succeed without validation/storage/mail. Checking first avoids leaking
  // honeypot detection through a normal field-error response (003's original order conflicted).
  if (values.website) return {
    status: "success", reference: "KX-1001", firstName: (values.name ?? "").slice(0, 120).split(/\s+/)[0],
    email: (values.email ?? "").slice(0, 254), tourName: planYourTrip.form.fields.tour.custom,
    monthLabel: planYourTrip.form.fields.travelMonth.notSure, analytics: null,
  };
  const { parsed, fieldErrors } = validateEnquiry(values, deps.now);
  if (!parsed.success) {
    if (Object.keys(fieldErrors).some((field) => ["sourcePath", "utmSource", "utmMedium", "utmCampaign"].includes(field))) return { status: "server_error" };
    // Only bounded, known form fields go back to a no-JS page; never serialize action internals.
    const safeValues = Object.fromEntries(Object.entries(values).filter(([k]) => k in parsed.error.flatten().fieldErrors || ["tour", "travelMonth", "flexibility", "travellers", "anyoneUnder15", "residency", "name", "email", "whatsapp", "notes", "consent"].includes(k)).map(([k, v]) => [k, v.slice(0, k === "notes" ? 2000 : 254)]));
    return { status: "invalid", fieldErrors, values: safeValues };
  }
  const input = parsed.data;
  const estimate = enquiryEstimate(input.tour, input.travellers);
  let reference: string | null;
  try {
    reference = await deps.repository.insert(input, estimate, deps.ipHash, deps.now);
  } catch (error) {
    deps.log({ stage: "insert", errorName: errorName(error) });
    return { status: "server_error" };
  }
  if (!reference) return { status: "rate_limited" };
  const context: EmailContext = { ...deps.email, reference, input, estimate, now: deps.now };
  const results = await Promise.allSettled([
    (async () => deps.send(buildTravellerEmail(context), `${reference}:traveller`))(),
    (async () => deps.send(buildOperatorEmail(context), `${reference}:operator`))(),
  ]);
  results.forEach((result, i) => {
    if (result.status === "rejected") deps.log({ reference, stage: i === 0 ? "traveller_email" : "operator_email", errorName: errorName(result.reason) });
  });
  try {
    await deps.repository.updateEmails(reference, {
      travellerEmailStatus: results[0].status === "fulfilled" ? "sent" : "failed",
      operatorEmailStatus: results[1].status === "fulfilled" ? "sent" : "failed",
    });
  } catch (error) {
    deps.log({ reference, stage: "email_status", errorName: errorName(error) });
  }
  const labels = enquiryLabels(input, deps.now);
  return {
    status: "success", reference, firstName: labels.firstName, email: input.email,
    tourName: labels.tourName, monthLabel: labels.month,
    analytics: { tour_slug: input.tour, travellers: input.travellers, value: estimate ?? 0, currency: "USD", residency: input.residency },
  };
}
