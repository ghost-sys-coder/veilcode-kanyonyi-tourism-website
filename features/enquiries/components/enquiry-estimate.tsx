import { Price } from "@/components/content/price";
import { planYourTrip } from "@/lib/content/pages";
import { enquiryEstimate } from "../estimate";

export function EnquiryEstimate({ tour, travellers }: { tour: string | null; travellers: number }) {
  if (!tour || !Number.isInteger(travellers) || travellers < 1 || travellers > 12) return null;
  const total = enquiryEstimate(tour, travellers);
  const copy = planYourTrip.form.estimate;
  const [beforeTotal, afterTotal] = copy.value.split("{total}");
  return <section aria-labelledby="estimate-label" className="rounded-sm border bg-secondary p-5" aria-live="polite" aria-atomic="true">
    <h2 id="estimate-label" className="eyebrow">{copy.label}</h2>
    <p className="mt-3 text-body-l font-semibold">{total === null ? copy.customValue : <>{beforeTotal}<Price usd={total} />{afterTotal.replace("{n}", String(travellers))}</>}</p>
    <p className="mt-2 text-body-s text-muted-foreground">{total === null ? copy.customSmallPrint : copy.smallPrint}</p>
    {total !== null && travellers === 1 && <p className="mt-2 text-body-s">{copy.solo}</p>}
    {travellers >= 7 && <p className="mt-2 text-body-s">{copy.sevenPlus}</p>}
  </section>;
}
