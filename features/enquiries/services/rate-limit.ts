import { createHmac } from "node:crypto";

export const RATE_LIMIT = 3;
export const RATE_WINDOW_MS = 10 * 60 * 1000;
export function hashIp(ip: string, secret: string) {
  return createHmac("sha256", secret).update(ip).digest("hex");
}
