import { formatReference } from "../reference";
import type { EnquiryRepository } from "./enquiry-repository";
import { RATE_LIMIT, RATE_WINDOW_MS } from "./rate-limit";

// Test configuration is server-only and cannot be enabled on a Vercel deployment. Neither
// query strings nor headers can switch a real environment to fake storage or sending.
export function localEnquiryTestMode(env: Record<string, string | undefined>): boolean {
  if (env.ENQUIRY_TEST_MODE !== "true") return false;
  if (env.VERCEL || env.VERCEL_ENV) throw new Error("Enquiry test mode is forbidden on deployments");
  return true;
}

let sequence = 1001;
const timestamps = new Map<string, number[]>();
export function localTestRepository(scenario: string): EnquiryRepository {
  return {
    async insert(_input, _estimate, ipHash, now) {
      if (scenario === "server-error") throw new Error("TestStorageFailure");
      if (scenario === "rate-limit") return null;
      const times = (timestamps.get(ipHash) ?? []).filter((time) => time >= now.getTime() - RATE_WINDOW_MS);
      if (times.length >= RATE_LIMIT) return null;
      timestamps.set(ipHash, [...times, now.getTime()]);
      return formatReference(sequence++);
    },
    async updateEmails() {},
  };
}
