"use server";

import { headers } from "next/headers";
import { serverEnv } from "@/config/env";
import { isDemo } from "@/config/demo";
import { siteUrl } from "@/config/site-url";
import { whatsappDisplay } from "@/config/contact";
import { sendEmail } from "@/services/email/resend";
import type { EnquiryState } from "../state";
import { enquiryRepository } from "../services/enquiry-repository";
import { localEnquiryTestMode, localTestRepository } from "../services/local-test-adapter";
import { processEnquiry } from "../services/process-enquiry";
import { hashIp } from "../services/rate-limit";

export async function submitEnquiry(_previous: EnquiryState, data: FormData): Promise<EnquiryState> {
  try {
    const requestHeaders = await headers();
    const test = localEnquiryTestMode(process.env);
    const env = test ? { fromAddress: "enquiries@mail.veilcode.studio", EMAIL_REPLY_TO: "frank@veilcode.studio", ENQUIRY_NOTIFY_TO: "frank@veilcode.studio", IP_HASH_SECRET: "0".repeat(64), RESEND_API_KEY: "unused" } : serverEnv();
    const scenario = test ? requestHeaders.get("x-kx-test-scenario") ?? "" : "";
    const ip = test ? requestHeaders.get("x-kx-test-id") ?? "local-test" : requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
    return await processEnquiry(data, {
      now: new Date(), ipHash: hashIp(ip, env.IP_HASH_SECRET),
      repository: test ? localTestRepository(scenario) : enquiryRepository,
      send: test ? async () => { if (scenario === "email-failure") throw new Error("TestEmailFailure"); return "test-email"; } : (message, key) => sendEmail(message, key, env.RESEND_API_KEY),
      email: { demo: isDemo, siteUrl: siteUrl.toString(), whatsapp: whatsappDisplay ?? "", fromAddress: env.fromAddress, replyTo: env.EMAIL_REPLY_TO, notifyTo: env.ENQUIRY_NOTIFY_TO },
      log: (detail) => console.error(detail),
    });
  } catch (error) {
    console.error({ stage: "configuration", errorName: error instanceof Error ? error.name : "UnknownError" });
    return { status: "server_error" };
  }
}
