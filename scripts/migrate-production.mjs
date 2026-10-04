import { readFileSync } from "node:fs";
import { parseEnv } from "node:util";
import { createInterface } from "node:readline/promises";
import { spawnSync } from "node:child_process";

const env = parseEnv(readFileSync(".env", "utf8"));
if (!env.DATABASE_URL_UNPOOLED) throw new Error("Production migration URL is missing");
const prompt = createInterface({ input: process.stdin, output: process.stdout });
const answer = await prompt.question("Apply the reviewed migrations to Neon main? Type migrate-main: ");
prompt.close();
if (answer !== "migrate-main") { console.log("Production migration cancelled."); process.exit(1); }
const result = spawnSync(process.execPath, ["node_modules/drizzle-kit/bin.cjs", "migrate"], {
  stdio: "inherit", env: { ...process.env, ...env, DRIZZLE_PRODUCTION_CONFIRMED: "true" },
});
process.exit(result.status ?? 1);
