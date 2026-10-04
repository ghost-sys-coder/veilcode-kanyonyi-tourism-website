import type { FieldErrors, FormValues } from "./schema";

export type EnquiryState =
  | { status: "idle" }
  | { status: "invalid"; fieldErrors: FieldErrors; values: FormValues }
  | { status: "rate_limited" | "server_error" | "network_error" }
  | { status: "success"; reference: string; firstName: string; email: string; tourName: string; monthLabel: string; analytics: null | { tour_slug: string; travellers: number; value: number; currency: "USD"; residency: string } };

export const initialEnquiryState: EnquiryState = { status: "idle" };
