"use client";

import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverDescription, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";
import { WhatsAppIcon } from "@/components/layout/whatsapp-icon";
import { WhatsAppLink } from "@/components/layout/whatsapp-link";
import { ui } from "@/content/ui";
import { cn } from "@/lib/utils";
import { fill } from "@/lib/content/format";

type CopyState = "idle" | "copied" | "failed";

// Floating round button, bottom right (DESIGN.md sections 6 and 10.8). Forest, not the
// reference's sun: a sun FAB beside "Find trips" would break the one-sun-per-viewport rule.

export function WhatsAppFab({ href, displayNumber }: { href: string; displayNumber: string }) {
  const [copy, setCopy] = useState<CopyState>("idle");

  async function copyNumber() {
    try {
      await navigator.clipboard.writeText(displayNumber);
      setCopy("copied");
    } catch {
      setCopy("failed");
    }
  }

  return (
    <div className="fixed right-4 bottom-[calc(env(safe-area-inset-bottom,0px)+1rem)] z-40">
      <Popover onOpenChange={(open) => !open && setCopy("idle")}>
        <PopoverTrigger
          render={
            <Button
              size="icon-lg"
              aria-label={ui.whatsappPopover.buttonLabel}
              className="size-14 shadow-[0_14px_30px_-12px_rgb(0_0_0/0.45)]"
            />
          }
        >
          <WhatsAppIcon className="size-7" />
        </PopoverTrigger>
        <PopoverContent side="top" align="end" sideOffset={12} className="w-[min(20rem,calc(100vw-2rem))] gap-3 rounded-lg p-4 shadow-lg">
          <PopoverTitle className="text-base font-semibold">{ui.whatsappPopover.title}</PopoverTitle>
          <PopoverDescription className="text-body-s text-muted-foreground">
            {ui.whatsappPopover.body}
          </PopoverDescription>
          <WhatsAppLink href={href} location="floating" className={cn(buttonVariants(), "w-full")}>
            <WhatsAppIcon className="size-5" />
            {ui.whatsappPopover.openButton}
          </WhatsAppLink>
          <div className="flex items-center justify-between gap-2 rounded-sm bg-secondary px-3 py-2 text-body-s">
            <span>
              {fill(ui.whatsappPopover.fallback, { number: "" })}
              <span className="font-mono select-all">{displayNumber}</span>
            </span>
            <button
              type="button"
              onClick={copyNumber}
              className="min-h-8 shrink-0 rounded-sm px-1 font-semibold text-primary underline-offset-4 hover:underline"
            >
              {ui.whatsappPopover.copyNumber}
            </button>
          </div>
          <p role="status" aria-live="polite" className="min-h-5 text-body-s">
            {copy === "copied" ? <span className="text-success">{ui.whatsappPopover.copied}</span> : null}
            {copy === "failed" ? ui.whatsappPopover.copyFailed : null}
          </p>
        </PopoverContent>
      </Popover>
    </div>
  );
}
