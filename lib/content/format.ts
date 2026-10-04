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
