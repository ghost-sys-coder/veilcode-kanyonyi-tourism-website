import { eq, sql } from "drizzle-orm";
import { database } from "@/db/client";
import { enquiries } from "@/db/schema";
import { MONTH_NOT_SURE, TOUR_CUSTOM } from "../options";
import type { EnquiryInput } from "../schema";
import { RATE_LIMIT, RATE_WINDOW_MS } from "./rate-limit";

export type EmailStatuses = { travellerEmailStatus: "sent" | "failed"; operatorEmailStatus: "sent" | "failed" };
export interface EnquiryRepository {
  insert(input: EnquiryInput, estimate: number | null, ipHash: string, now: Date): Promise<string | null>;
  updateEmails(reference: string, statuses: EmailStatuses): Promise<void>;
}

export const enquiryRepository: EnquiryRepository = {
  async insert(input, estimate, ipHash, now) {
    const db = database();
    const since = new Date(now.getTime() - RATE_WINDOW_MS).toISOString();
    // Acquire a transaction-scoped lock before counting. The second statement gets a fresh
    // READ COMMITTED snapshot, so simultaneous requests cannot all pass the same count.
    const results = await db.batch([
      db.execute(sql`select pg_advisory_xact_lock(hashtextextended(${ipHash}, 0))`),
      db.execute(sql`insert into enquiries
        (tour_slug, travel_month, flexibility, travellers, anyone_under_15, residency,
         name, email, whatsapp, notes, consent_at, estimate_usd, source_path,
         utm_source, utm_medium, utm_campaign, ip_hash)
        select ${input.tour === TOUR_CUSTOM ? null : input.tour},
          ${input.travelMonth === MONTH_NOT_SURE ? null : `${input.travelMonth}-01`}::date,
          ${input.flexibility ?? null}, ${input.travellers},
          ${input.anyoneUnder15 ? input.anyoneUnder15 === "yes" : null}, ${input.residency},
          ${input.name}, ${input.email}, ${input.whatsapp || null}, ${input.notes || null},
          ${now.toISOString()}::timestamptz, ${estimate}, ${input.sourcePath},
          ${input.utmSource || null}, ${input.utmMedium || null}, ${input.utmCampaign || null}, ${ipHash}
        where (select count(*) from enquiries where ip_hash = ${ipHash} and created_at >= ${since}::timestamptz) < ${RATE_LIMIT}
        returning reference`),
    ]);
    const row = results[1].rows[0] as { reference: string } | undefined;
    return row?.reference ?? null;
  },
  async updateEmails(reference, statuses) {
    await database().update(enquiries).set(statuses).where(eq(enquiries.reference, reference));
  },
};
