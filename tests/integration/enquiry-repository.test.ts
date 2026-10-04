import { readFileSync } from "node:fs";
import { parseEnv } from "node:util";
import { randomUUID } from "node:crypto";
import { afterAll, beforeAll, expect, it } from "vitest";
import { inArray, sql } from "drizzle-orm";
import { database } from "@/db/client";
import { enquiries } from "@/db/schema";
import { enquiryRepository } from "@/features/enquiries/services/enquiry-repository";
import { hashIp } from "@/features/enquiries/services/rate-limit";
import { createEnquirySchema } from "@/features/enquiries/schema";

const local = parseEnv(readFileSync(".env.local", "utf8"));
const main = parseEnv(readFileSync(".env", "utf8"));
if (!local.DATABASE_URL || !main.DATABASE_URL || !local.IP_HASH_SECRET || new URL(local.DATABASE_URL).hostname === new URL(main.DATABASE_URL).hostname) throw new Error("Database tests require isolated Neon dev");
Object.assign(process.env, main, local);
const now = new Date();
const hash = hashIp(`s8-repository-test-${randomUUID()}`, local.IP_HASH_SECRET!);
const references: string[] = [];
const input = createEnquirySchema(now).parse({ tour: "custom", travelMonth: "not-sure", travellers: 2, residency: "outside-east-africa", name: "S8 Repository Test", email: "fixture@invalid.example", consent: "on", sourcePath: "/plan-your-trip" });

beforeAll(async () => {
  expect((await database().execute(sql`select current_database() as name`)).rows).toHaveLength(1);
});
afterAll(async () => {
  if (references.length) await database().delete(enquiries).where(inArray(enquiries.reference, references));
});

it("allows only three of five simultaneous inserts and stores typed nullable fields", async () => {
  const results = await Promise.all(Array.from({ length: 5 }, () => enquiryRepository.insert(input, null, hash, now)));
  references.push(...results.filter((r): r is string => r !== null));
  expect(references).toHaveLength(3);
  expect(new Set(references).size).toBe(3);
  expect(references.every((r) => /^KX-\d+$/.test(r))).toBe(true);
  const rows = await database().select().from(enquiries).where(inArray(enquiries.reference, references));
  expect(rows.every((r) => r.tourSlug === null && r.travelMonth === null && r.estimateUsd === null && r.ipHash === hash && r.consentAt instanceof Date)).toBe(true);
  await enquiryRepository.updateEmails(references[0], { travellerEmailStatus: "sent", operatorEmailStatus: "failed" });
  const updated = await database().select().from(enquiries).where(inArray(enquiries.reference, [references[0]]));
  expect(updated[0]).toMatchObject({ travellerEmailStatus: "sent", operatorEmailStatus: "failed" });
});

it("enforces traveller and residency constraints at the database boundary", async () => {
  const values = { name: input.name, email: input.email, travellers: 13, residency: input.residency, consentAt: now, sourcePath: input.sourcePath, ipHash: hash };
  await expect(database().insert(enquiries).values(values)).rejects.toThrow();
  await expect(database().insert(enquiries).values({ ...values, travellers: 2, residency: "invalid" })).rejects.toThrow();
});
