import { CalendarCheckIcon } from "lucide-react";
import { ui } from "@/content/ui";
import { Inline } from "@/lib/content/inline";
import type { RichText } from "@/types/content";
import { cn } from "@/lib/utils";

/** "Checked 4 October 2026 ..." beside time-sensitive facts (00-README.md rule 4, AGENTS.md section 18). */
export function FactStamp({ text = ui.factStamp, className }: { text?: RichText; className?: string }) {
  return (
    <p className={cn("flex gap-2 text-body-s text-muted-foreground", className)}>
      <CalendarCheckIcon aria-hidden className="mt-0.5 size-4 shrink-0" />
      <span>
        <Inline text={text} />
      </span>
    </p>
  );
}
