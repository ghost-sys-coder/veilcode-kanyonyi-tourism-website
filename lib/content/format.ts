/**
 * Fills {placeholders} in copy strings, e.g. fill("Explore {destination}", { destination: "Bwindi" }).
 * Throws on a missing value so a broken template never renders "{destination}" to a traveller.
 */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    if (!(key in values)) throw new Error(`Missing value for {${key}} in "${template}"`);
    return String(values[key]);
  });
}

/** Content dates are calendar dates; UTC keeps them stable across build-machine timezones. */
export function formatContentDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
