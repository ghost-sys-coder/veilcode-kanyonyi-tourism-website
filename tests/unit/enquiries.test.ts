import { describe, expect, it, vi } from "vitest";
import { createEnquirySchema, validateEnquiry } from "@/features/enquiries/schema";
import { enquiryEstimate } from "@/features/enquiries/estimate";
import { formatReference } from "@/features/enquiries/reference";
import { replyBy, receivedAt } from "@/features/enquiries/reply-by";
import { getEnquiryMonths } from "@/features/enquiries/options";
import { buildOperatorEmail, buildTravellerEmail, type EmailContext } from "@/features/enquiries/services/enquiry-emails";
import { processEnquiry, type SubmitDependencies } from "@/features/enquiries/services/process-enquiry";
import { hashIp } from "@/features/enquiries/services/rate-limit";
import { localEnquiryTestMode } from "@/features/enquiries/services/local-test-adapter";
import { sendEmail } from "@/services/email/resend";
import { validateServerEnv } from "@/config/env";

const now = new Date("2026-10-04T12:00:00Z");
const input = { tour: "3-day-bwindi-gorilla-trek", travelMonth: "2026-11", flexibility: "week-or-two", travellers: 2, anyoneUnder15: "no", residency: "outside-east-africa", name: "Ada Test", email: "ada@example.com", whatsapp: "+44 7700 900000", notes: "A test", consent: "on", sourcePath: "/tours/3-day-bwindi-gorilla-trek" } as const;
const parsed = createEnquirySchema(now).parse(input);
function form(overrides: Record<string, string> = {}) {
  const data = new FormData();
  Object.entries({ ...input, ...overrides }).forEach(([k, v]) => data.set(k, String(v)));
  return data;
}
const context: EmailContext = { input: parsed, reference: "KX-1234", estimate: 3300, now, demo: true, siteUrl: "https://example.com", whatsapp: "+256 750 242627", fromAddress: "enquiries@mail.example.com", replyTo: "operator@example.com", notifyTo: "operator@example.com" };
function dependencies(): SubmitDependencies {
  return { now, ipHash: "hashed", repository: { insert: vi.fn().mockResolvedValue("KX-1234"), updateEmails: vi.fn().mockResolvedValue(undefined) }, send: vi.fn().mockResolvedValue("email-id"), email: context, log: vi.fn() };
}

describe("authoritative enquiry validation", () => {
  it("accepts optional blanks and custom / not sure choices", () => {
    expect(createEnquirySchema(now).parse({ ...input, tour: "custom", travelMonth: "not-sure", flexibility: "", anyoneUnder15: "", whatsapp: "", notes: "" })).toMatchObject({ tour: "custom", flexibility: undefined, anyoneUnder15: undefined });
  });
  it.each([
    ["tour", "missing"], ["travelMonth", "2026-09"], ["travelMonth", "2028-04"], ["travelMonth", "2026-13"],
    ["travellers", 0], ["travellers", 13], ["travellers", 1.5], ["travellers", "a"], ["residency", "unknown"],
    ["name", " "], ["name", "a".repeat(121)], ["email", "bad"], ["email", "a\r\n@example.com"], ["whatsapp", "abc1234"],
    ["notes", "a".repeat(2001)], ["consent", ""], ["flexibility", "any"], ["anyoneUnder15", "maybe"],
    ["sourcePath", "//evil.example"], ["sourcePath", "/test?personal=value"], ["utmCampaign", "a".repeat(101)],
  ])("rejects invalid %s", (field, value) => {
    expect(createEnquirySchema(now).safeParse({ ...input, [field]: value }).success).toBe(false);
  });
  it("maps invalid fields to approved messages", () => {
    expect(validateEnquiry({ email: "bad" }, now).fieldErrors).toMatchObject({ email: "Enter an email address like name@example.com.", tour: 'Choose a trip, or "Something custom".' });
  });
  it("has 18 rolling months in Kampala plus the unsure option, including the year boundary", () => {
    const months = getEnquiryMonths(new Date("2026-12-31T22:00:00Z"));
    expect(months).toHaveLength(19);
    expect(months[0].value).toBe("2027-01");
    expect(months[17].value).toBe("2028-06");
    expect(months[18].value).toBe("not-sure");
  });
});

describe("estimate, reference and operator dates", () => {
  it("uses standard prices, solo supplement and a second vehicle for seven guests", () => {
    expect(enquiryEstimate(input.tour, 2)).toBe(3300);
    expect(enquiryEstimate(input.tour, 3)).toBe(4500);
    expect(enquiryEstimate(input.tour, 1)).toBe(2250);
    expect(enquiryEstimate(input.tour, 7)).toBe(10150);
    expect(enquiryEstimate("custom", 2)).toBeNull();
  });
  it("formats a sequence without using a short random reference", () => {
    expect(formatReference(1001)).toBe("KX-1001");
    expect(formatReference(123456)).toBe("KX-123456");
    expect(() => formatReference(1.5)).toThrow();
  });
  it.each([
    ["2026-10-02T12:00:00Z", "3 October 2026"],
    ["2026-10-03T12:00:00Z", "5 October 2026"],
    ["2026-10-04T12:00:00Z", "5 October 2026"],
    ["2026-10-02T22:00:00Z", "5 October 2026"],
    ["2026-12-31T22:00:00Z", "2 January 2027"],
  ])("next working day is calculated in EAT (%s)", (date, expected) => expect(replyBy(new Date(date))).toBe(expected));
  it("includes the EAT time on notifications", () => expect(receivedAt(now)).toBe("4 October 2026 at 15:00 EAT"));
});

describe("email bodies and headers", () => {
  it("uses demo copy and the real operator reply-to", () => {
    const email = buildTravellerEmail(context);
    expect(email.from).toContain("(demo by VeilCode Studio)");
    expect(email.subject).toBe("Your demo enquiry (KX-1234)");
    expect(email.reply_to).toBe("operator@example.com");
    expect(email.text).toContain("KX-1234");
    expect(email.html).toContain("KX-1234");
    expect(email.text).toContain("USD 3,300");
  });
  it("escapes traveller-controlled HTML, including quotes and ampersands", () => {
    const email = buildTravellerEmail({ ...context, input: { ...parsed, name: '<img src=x onerror="alert(1)"> & Ada', email: "o'neil@example.com" } });
    expect(email.html).not.toContain("<img");
    expect(email.html).toContain("&lt;img");
    expect(email.html).not.toContain('onerror="');
    expect(email.text).toContain("<img");
  });
  it("live mail has absolute guides, the conditional child line and custom estimate", () => {
    const email = buildTravellerEmail({ ...context, demo: false, estimate: null, input: { ...parsed, tour: "custom", anyoneUnder15: "yes" } });
    expect(email.subject).toBe("Your Uganda trip enquiry (KX-1234)");
    expect(email.text).toContain("including someone under 15");
    expect(email.text).toContain("Priced in your quote");
    expect(email.html).toContain('href="https://example.com/guides/uganda-gorilla-permits"');
    expect(email.text).not.toContain("On this demo");
  });
  it("operator notification is plain text, with traveller reply-to and all attribution", () => {
    const email = buildOperatorEmail({ ...context, input: { ...parsed, whatsapp: "", notes: "<script>test</script>" } });
    expect(email.html).toBeUndefined();
    expect(email.reply_to).toBe(parsed.email);
    expect(email.text).toContain("not given");
    expect(email.text).toContain("<script>test</script>");
    expect(email.text).toContain(parsed.sourcePath);
    expect(email.text).toContain("5 October 2026");
    expect(email.subject).toContain("KX-1234");
  });
});

describe("submit failure boundaries", () => {
  it("validation and honeypot do not write, send or emit conversion data", async () => {
    const deps = dependencies();
    expect((await processEnquiry(form({ email: "bad" }), deps)).status).toBe("invalid");
    expect(await processEnquiry(form({ website: "filled", email: "bad" }), deps)).toMatchObject({ status: "success", analytics: null });
    expect(deps.repository.insert).not.toHaveBeenCalled();
    expect(deps.send).not.toHaveBeenCalled();
  });
  it("does not send either email when storage is down", async () => {
    const deps = dependencies();
    vi.mocked(deps.repository.insert).mockRejectedValue(new Error("sensitive message"));
    expect((await processEnquiry(form(), deps)).status).toBe("server_error");
    expect(deps.send).not.toHaveBeenCalled();
    expect(JSON.stringify(vi.mocked(deps.log).mock.calls)).not.toContain("sensitive message");
  });
  it("a limited insert sends nothing", async () => {
    const deps = dependencies(); vi.mocked(deps.repository.insert).mockResolvedValue(null);
    expect((await processEnquiry(form(), deps)).status).toBe("rate_limited");
    expect(deps.send).not.toHaveBeenCalled();
  });
  it("computes the price server-side, sends both distinct keys and records a partial failure", async () => {
    const deps = dependencies(); vi.mocked(deps.send).mockRejectedValueOnce(new Error("failed"));
    const result = await processEnquiry(form({ estimateUsd: "1" }), deps);
    expect(deps.repository.insert).toHaveBeenCalledWith(expect.anything(), 3300, "hashed", now);
    expect(vi.mocked(deps.send).mock.calls.map(([, key]) => key)).toEqual(["KX-1234:traveller", "KX-1234:operator"]);
    expect(deps.repository.updateEmails).toHaveBeenCalledWith("KX-1234", { travellerEmailStatus: "failed", operatorEmailStatus: "sent" });
    expect(result).toMatchObject({ status: "success", reference: "KX-1234", analytics: { value: 3300 } });
  });
  it("does not turn a stored enquiry into a failure when the status update fails", async () => {
    const deps = dependencies(); vi.mocked(deps.repository.updateEmails).mockRejectedValue(new Error("failed"));
    expect((await processEnquiry(form(), deps)).status).toBe("success");
    expect(deps.log).toHaveBeenCalledWith({ reference: "KX-1234", stage: "email_status", errorName: "Error" });
  });
});

describe("server-only configuration and Resend transport", () => {
  it("test mode fails closed on either Vercel marker", () => {
    expect(localEnquiryTestMode({ ENQUIRY_TEST_MODE: "true" })).toBe(true);
    expect(localEnquiryTestMode({})).toBe(false);
    expect(() => localEnquiryTestMode({ ENQUIRY_TEST_MODE: "true", VERCEL: "1" })).toThrow();
    expect(() => localEnquiryTestMode({ ENQUIRY_TEST_MODE: "true", VERCEL_ENV: "preview" })).toThrow();
  });
  it("hashes an IP with a key, and changes with either input", () => {
    const one = hashIp("192.0.2.1", "a");
    expect(one).toMatch(/^[a-f0-9]{64}$/);
    expect(one).not.toBe(hashIp("192.0.2.1", "b"));
    expect(one).not.toBe(hashIp("192.0.2.2", "a"));
  });
  it("validates private configuration without echoing invalid inputs", () => {
    expect(() => validateServerEnv({ DATABASE_URL: "secret" })).toThrow("Missing or invalid server configuration");
    try { validateServerEnv({ DATABASE_URL: "secret" }); } catch (e) { expect(String(e)).not.toContain("secret"); }
    const env = { DATABASE_URL: "postgresql://user:password@example.com/database", RESEND_API_KEY: "unused", EMAIL_FROM: "Kanyonyi <enquiries@mail.example.com>", EMAIL_REPLY_TO: "frank@example.com", ENQUIRY_NOTIFY_TO: "frank@example.com", IP_HASH_SECRET: "a".repeat(64) };
    expect(validateServerEnv(env).fromAddress).toBe("enquiries@mail.example.com");
    expect(() => validateServerEnv({ ...env, EMAIL_FROM: "Kanyonyi <hi@kanyonyi.example.com>" })).toThrow();
  });
  it("sends both parts, reply-to, a key and an eight-second abort signal", async () => {
    const transport = vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify({ id: "sent-id" })));
    const email = buildTravellerEmail(context);
    expect(await sendEmail(email, "KX-1234:traveller", "private-key", transport)).toBe("sent-id");
    const [, request] = transport.mock.calls[0];
    expect(request?.headers).toMatchObject({ "Idempotency-Key": "KX-1234:traveller" });
    expect(request?.signal).toBeInstanceOf(AbortSignal);
    expect(JSON.parse(String(request?.body))).toMatchObject({ html: expect.any(String), text: expect.any(String), reply_to: "operator@example.com" });
  });
  it("does not echo Resend error bodies containing recipient details", async () => {
    const transport = vi.fn<typeof fetch>().mockResolvedValue(new Response("ada@example.com secret", { status: 403 }));
    await expect(sendEmail(buildTravellerEmail(context), "key", "api", transport)).rejects.toThrow("ResendHTTP403");
  });
});
