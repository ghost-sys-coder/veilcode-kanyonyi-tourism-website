"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fill } from "@/lib/content/format";
import { planYourTrip } from "@/lib/content/pages";
import { EnquiryField } from "./enquiry-field";

export function TravellerStepper({ value, onValueChange, error, disabled }: { value: number; onValueChange: (value: number) => void; error?: string; disabled?: boolean }) {
  const copy = planYourTrip.form.fields.travellers;
  return <EnquiryField id="travellers" label={copy.label} required error={error} help={value === 12 ? copy.atLimit : undefined}>
    <div className="flex flex-wrap items-center gap-3">
      <Button type="button" size="icon" variant="outline" aria-label={copy.decrease} disabled={disabled || value <= 1} onClick={() => onValueChange(Math.max(1, value - 1))}><MinusIcon aria-hidden /></Button>
      <Input id="travellers" name="travellers" type="number" inputMode="numeric" min={1} max={12} step={1} value={Number.isNaN(value) ? "" : value} onChange={(event) => onValueChange(event.target.valueAsNumber)} disabled={disabled} required aria-invalid={Boolean(error)} aria-describedby={["travellers-readout", error ? "travellers-error" : "", value === 12 ? "travellers-help" : ""].filter(Boolean).join(" ")} className="w-18 text-center tabular-nums" />
      <Button type="button" size="icon" variant="outline" aria-label={copy.increase} disabled={disabled || value >= 12} onClick={() => onValueChange(Math.min(12, value + 1))}><PlusIcon aria-hidden /></Button>
      <span id="travellers-readout" aria-live="polite" className="text-body-s">{fill(value === 1 ? copy.readOutOne : copy.readOutMany, { n: Number.isNaN(value) ? "" : value })}</span>
    </div>
  </EnquiryField>;
}
