"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FieldSet, FieldLegend, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { CircleAlertIcon } from "lucide-react";

export function EnquiryRadio({ id, label, options, value, onValueChange, help, error, disabled }: {
  id: string; label: string; options: { value: string; label: string }[]; value: string | undefined;
  onValueChange: (value: string) => void; help?: string; error?: string; disabled?: boolean;
}) {
  return <FieldSet className="gap-3">
    <FieldLegend id={`${id}-label`} className="text-base">{label}</FieldLegend>
    <RadioGroup name={id} id={id} aria-labelledby={`${id}-label`} aria-describedby={[help ? `${id}-help` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined} aria-invalid={Boolean(error)} value={value} onValueChange={(next) => onValueChange(String(next))} disabled={disabled} className="enquiry-enhanced flex flex-wrap gap-x-6 gap-y-1">
      {options.map((option) => <FieldLabel key={option.value} htmlFor={`${id}-${option.value}`} className="min-h-11 gap-3 font-normal">
        <RadioGroupItem id={`${id}-${option.value}`} value={option.value} />{option.label}
      </FieldLabel>)}
    </RadioGroup>
    <noscript>{options.map((option) => <label key={option.value} className="mr-5 inline-flex min-h-11 items-center gap-2"><input type="radio" name={id} value={option.value} defaultChecked={value === option.value} />{option.label}</label>)}</noscript>
    {help && <FieldDescription id={`${id}-help`}>{help}</FieldDescription>}
    {error && <FieldError id={`${id}-error`} className="flex gap-2"><CircleAlertIcon aria-hidden className="size-4 shrink-0" />{error}</FieldError>}
  </FieldSet>;
}
