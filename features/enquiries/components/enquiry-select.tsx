"use client";

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { EnquiryField } from "./enquiry-field";

export function EnquirySelect({ id, label, placeholder, items, value, onValueChange, error, disabled }: {
  id: string; label: string; placeholder: string; items: { value: string; label: string }[];
  value: string | null; onValueChange: (value: string | null) => void; error?: string; disabled?: boolean;
}) {
  const choices = [{ value: null, label: placeholder }, ...items];
  return <EnquiryField id={id} label={label} required error={error}>
    <div className="enquiry-enhanced min-w-0">
      <Select name={id} items={choices} value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger id={id} aria-labelledby={`${id}-label ${id}`} aria-required aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className="h-auto min-h-11 w-full whitespace-normal py-3 *:data-[slot=select-value]:line-clamp-none">
          <SelectValue />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
          {choices.map((item) => <SelectItem key={item.value ?? "placeholder"} value={item.value} className="whitespace-normal">{item.label}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
    <noscript>
      <label htmlFor={`${id}-native`} className="sr-only">{label}</label>
      <select id={`${id}-native`} name={id} defaultValue={value ?? ""} required aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className="w-full rounded-sm border bg-card p-3">
        {choices.map((item) => <option key={item.value ?? "placeholder"} value={item.value ?? ""}>{item.label}</option>)}
      </select>
    </noscript>
  </EnquiryField>;
}
