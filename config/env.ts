import { z } from "zod";

const serverSchema = z.object({
  DATABASE_URL: z.string().url(),
  RESEND_API_KEY: z.string().min(1),
  EMAIL_FROM: z.string().min(1),
  EMAIL_REPLY_TO: z.email(),
  ENQUIRY_NOTIFY_TO: z.email(),
  IP_HASH_SECRET: z.string().min(64).regex(/^[a-f0-9]+$/i),
});

export function validateServerEnv(env: Record<string, string | undefined>) {
  const parsed = serverSchema.safeParse(env);
  // Zod issues can contain inputs; never expose values in logs or an error response.
  if (!parsed.success) throw new Error(`Missing or invalid server configuration: ${parsed.error.issues.map((i) => i.path[0]).join(", ")}`);
  const address = /<([^<>]+)>$/.exec(parsed.data.EMAIL_FROM)?.[1] ?? parsed.data.EMAIL_FROM;
  if (!z.email().safeParse(address).success || /kanyonyi/i.test(address)) throw new Error("Invalid sending address");
  return { ...parsed.data, fromAddress: address };
}

let cached: ReturnType<typeof validateServerEnv> | undefined;
export function serverEnv() {
  if (typeof window !== "undefined") throw new Error("Server configuration cannot be read in a browser");
  return cached ??= validateServerEnv(process.env);
}
