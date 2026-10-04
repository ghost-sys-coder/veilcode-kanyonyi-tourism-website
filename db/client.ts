import { drizzle } from "drizzle-orm/neon-http";
import { serverEnv } from "@/config/env";
import * as schema from "./schema";

let cached: ReturnType<typeof drizzle<typeof schema>> | undefined;
export function database() {
  return cached ??= drizzle(serverEnv().DATABASE_URL, { schema });
}
