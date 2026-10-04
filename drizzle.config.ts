import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";
import { readFileSync, existsSync } from "node:fs";
import { parseEnv } from "node:util";

loadEnvConfig(process.cwd());
let migrationUrl = process.env.DATABASE_URL_UNPOOLED;
if (process.env.DRIZZLE_PRODUCTION_CONFIRMED !== "true") {
  if (!existsSync(".env.local")) throw new Error("Local dev database configuration is required");
  const local = parseEnv(readFileSync(".env.local", "utf8")).DATABASE_URL_UNPOOLED;
  const main = existsSync(".env") ? parseEnv(readFileSync(".env", "utf8")).DATABASE_URL_UNPOOLED : undefined;
  if (!local || (main && new URL(main).hostname === new URL(local).hostname)) throw new Error("Refusing a local migration outside Neon dev");
  // drizzle-kit loads .env before evaluating config. Choose .env.local explicitly so its
  // preloaded production value cannot win Next's process-env-first precedence.
  migrationUrl = local;
}
if (!migrationUrl) throw new Error("DATABASE_URL_UNPOOLED is required");
export default defineConfig({
  schema: "./db/schema.ts", out: "./db/migrations", dialect: "postgresql",
  dbCredentials: { url: migrationUrl },
});
