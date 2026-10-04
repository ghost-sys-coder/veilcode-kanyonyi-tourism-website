import { CheckIcon, MinusIcon } from "lucide-react";
import { Inline } from "@/lib/content/inline";
import { cn } from "@/lib/utils";
import type { RichText } from "@/types/content";

// DESIGN.md section 10.5: check and dash markers. The markers are decorative; the list's own
// heading ("What's included" / "Not included") carries the meaning, so nothing relies on icons.

export function InclusionList({
  heading,
  items,
  kind,
}: {
  heading: string;
  items: readonly RichText[];
  kind: "included" | "excluded";
}) {
  const Icon = kind === "included" ? CheckIcon : MinusIcon;
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-display-m">{heading}</h3>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <Icon
              aria-hidden
              className={cn("mt-1 size-5 shrink-0", kind === "included" ? "text-success" : "text-muted-foreground")}
            />
            <span>
              <Inline text={item} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
