import nextEnv from "@next/env";
import { neon } from "@neondatabase/serverless";

nextEnv.loadEnvConfig(process.cwd());
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is missing");
const db = neon(process.env.DATABASE_URL);
const demo = process.env.NEXT_PUBLIC_DEMO_MODE !== "false";
// Dry run is the default. Scheduling must explicitly use --apply and the correct branch URL.
const condition = demo ? "created_at < now() - interval '12 months'" : "created_at < now() - interval '24 months' and status <> 'booked'";
if (!process.argv.includes("--apply")) {
  const [row] = await db.query(`select count(*)::integer as count from enquiries where ${condition}`);
  console.log(`Retention dry run: ${row.count} rows eligible. Use --apply to delete eligible rows.`);
} else {
  const rows = await db.query(`delete from enquiries where ${condition} returning id`);
  console.log(`Retention: deleted ${rows.length} expired rows.`);
}
