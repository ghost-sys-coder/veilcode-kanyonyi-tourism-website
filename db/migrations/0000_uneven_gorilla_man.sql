CREATE SEQUENCE "public"."enquiry_ref_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1001 CACHE 1;--> statement-breakpoint
CREATE TABLE "enquiries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reference" text DEFAULT 'KX-' || nextval('enquiry_ref_seq') NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"tour_slug" text,
	"travel_month" date,
	"flexibility" text,
	"travellers" smallint NOT NULL,
	"anyone_under_15" boolean,
	"residency" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"whatsapp" text,
	"notes" text,
	"consent_at" timestamp with time zone NOT NULL,
	"estimate_usd" integer,
	"source_path" text NOT NULL,
	"utm_source" text,
	"utm_medium" text,
	"utm_campaign" text,
	"ip_hash" text NOT NULL,
	"traveller_email_status" text DEFAULT 'pending' NOT NULL,
	"operator_email_status" text DEFAULT 'pending' NOT NULL,
	"status" text DEFAULT 'new' NOT NULL,
	CONSTRAINT "enquiries_reference_unique" UNIQUE("reference"),
	CONSTRAINT "travellers_range" CHECK ("enquiries"."travellers" between 1 and 12),
	CONSTRAINT "residency_values" CHECK ("enquiries"."residency" in ('outside-east-africa','east-africa')),
	CONSTRAINT "traveller_email_status_values" CHECK ("enquiries"."traveller_email_status" in ('pending','sent','failed')),
	CONSTRAINT "operator_email_status_values" CHECK ("enquiries"."operator_email_status" in ('pending','sent','failed')),
	CONSTRAINT "status_values" CHECK ("enquiries"."status" in ('new','quoted','booked','lost'))
);
--> statement-breakpoint
CREATE INDEX "enquiries_created_at_idx" ON "enquiries" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "enquiries_ip_hash_created_at_idx" ON "enquiries" USING btree ("ip_hash","created_at");