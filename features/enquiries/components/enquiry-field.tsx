import type { ReactNode } from "react";
import { CircleAlertIcon } from "lucide-react";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { ui } from "@/lib/content/pages";

export function EnquiryField({ id, label, required, help, error, children }: {
  id: string; label: string; required?: boolean; help?: string; error?: string; children: ReactNode;
}) {
  return <Field data-invalid={Boolean(error)} className="min-w-0">
    <FieldLabel id={`${id}-label`} htmlFor={id} className="flex-wrap text-base">{label}{required && <span className="text-body-s font-normal text-muted-foreground">{ui.form.requiredMarker}</span>}</FieldLabel>
    {children}
    {help && <FieldDescription id={`${id}-help`}>{help}</FieldDescription>}
    {error && <FieldError id={`${id}-error`} className="flex items-start gap-2"><CircleAlertIcon aria-hidden className="mt-0.5 size-4 shrink-0" />{error}</FieldError>}
  </Field>;
}
