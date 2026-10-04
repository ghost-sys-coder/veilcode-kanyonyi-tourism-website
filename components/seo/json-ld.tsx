import type { Thing, WithContext } from "schema-dts";
import { serializeJsonLd } from "@/lib/seo/schema";

/** Structured data rendered in the page, as the bundled Next.js JSON-LD guide recommends. */
export function JsonLd({ data }: { data: WithContext<Thing> | WithContext<Thing>[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
