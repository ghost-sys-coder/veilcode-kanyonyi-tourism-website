"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function FinderSelect({ id, label, items, value, onValueChange }: {
  id: string;
  label: string;
  items: { value: string | null; label: string }[];
  value: string | null;
  onValueChange: (value: string | null) => void;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <label id={`${id}-label`} htmlFor={id} className="text-body-s font-semibold">{label}</label>
      <Select name={id} items={items} value={value} onValueChange={onValueChange}>
        <SelectTrigger id={id} aria-labelledby={`${id}-label ${id}`} className="w-full"><SelectValue /></SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
          {items.map((item) => <SelectItem key={item.value ?? "any"} value={item.value}>{item.label}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );
}
