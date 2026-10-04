import { sql } from "drizzle-orm";
import { pgTable, pgSequence, uuid, text, timestamp, date, smallint, boolean, integer, index, check } from "drizzle-orm/pg-core";

export const enquiryRefSeq = pgSequence("enquiry_ref_seq", { startWith: 1001 });
export const enquiries = pgTable("enquiries", {
  id: uuid("id").primaryKey().defaultRandom(),
  reference: text("reference").notNull().unique().default(sql`'KX-' || nextval('enquiry_ref_seq')`),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  tourSlug: text("tour_slug"),
  travelMonth: date("travel_month"),
  flexibility: text("flexibility"),
  travellers: smallint("travellers").notNull(),
  anyoneUnder15: boolean("anyone_under_15"),
  residency: text("residency").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  whatsapp: text("whatsapp"),
  notes: text("notes"),
  consentAt: timestamp("consent_at", { withTimezone: true }).notNull(),
  estimateUsd: integer("estimate_usd"),
  sourcePath: text("source_path").notNull(),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  ipHash: text("ip_hash").notNull(),
  travellerEmailStatus: text("traveller_email_status").notNull().default("pending"),
  operatorEmailStatus: text("operator_email_status").notNull().default("pending"),
  status: text("status").notNull().default("new"),
}, (t) => [
  index("enquiries_created_at_idx").on(t.createdAt),
  index("enquiries_ip_hash_created_at_idx").on(t.ipHash, t.createdAt),
  check("travellers_range", sql`${t.travellers} between 1 and 12`),
  check("residency_values", sql`${t.residency} in ('outside-east-africa','east-africa')`),
  check("traveller_email_status_values", sql`${t.travellerEmailStatus} in ('pending','sent','failed')`),
  check("operator_email_status_values", sql`${t.operatorEmailStatus} in ('pending','sent','failed')`),
  check("status_values", sql`${t.status} in ('new','quoted','booked','lost')`),
]);
