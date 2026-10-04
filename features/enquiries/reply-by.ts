const zone = "Africa/Kampala";

export function replyBy(now: Date): string {
  const calendar = new Intl.DateTimeFormat("en-CA", { timeZone: zone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const part = (key: string) => Number(calendar.find((p) => p.type === key)!.value);
  const date = new Date(Date.UTC(part("year"), part("month") - 1, part("day") + 1));
  if (date.getUTCDay() === 0) date.setUTCDate(date.getUTCDate() + 1);
  return new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", year: "numeric", month: "long", day: "numeric" }).format(date);
}

export function receivedAt(now: Date): string {
  return `${new Intl.DateTimeFormat("en-GB", { timeZone: zone, dateStyle: "long", timeStyle: "short", hour12: false }).format(now)} EAT`;
}
