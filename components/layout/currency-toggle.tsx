"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { useCurrency } from "@/hooks/use-currency";

// Prices are server-rendered in both currencies; this only flips html[data-currency]
// (docs/decisions/004 section 7), so no price component ever hydrates.

export function CurrencyToggle() {
  const [currency, setCurrency] = useCurrency();

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <ToggleGroup
            aria-label={ui.a11y.currencyToggleLabel}
            value={[currency]}
            onValueChange={(value) => {
              const next = value[0];
              if (next === "usd" || next === "ugx") setCurrency(next);
            }}
            size="sm"
            spacing={0}
            className="rounded-full border border-border bg-card p-0.5"
          />
        }
      >
        <ToggleGroupItem
          value="usd"
          className="h-8 rounded-full! px-3 font-mono text-label aria-pressed:bg-primary aria-pressed:text-primary-foreground"
        >
          {site.currency.labels.usd}
        </ToggleGroupItem>
        <ToggleGroupItem
          value="ugx"
          className="h-8 rounded-full! px-3 font-mono text-label aria-pressed:bg-primary aria-pressed:text-primary-foreground"
        >
          {site.currency.labels.ugx}
        </ToggleGroupItem>
      </TooltipTrigger>
      <TooltipContent className="max-w-60 text-body-s">{site.currency.tooltip}</TooltipContent>
    </Tooltip>
  );
}
