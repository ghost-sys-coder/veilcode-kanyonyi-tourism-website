"use client";

import { useCallback, useSyncExternalStore } from "react";
import { CURRENCY_STORAGE_KEY, type Currency } from "@/lib/ui/boot-script";

// The source of truth is html[data-currency], set before paint by the boot script and read by the
// CSS that shows one of the two server-rendered prices (004 section 7).

const CHANGED = "kx:currency-changed";

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGED, onChange);
  return () => window.removeEventListener(CHANGED, onChange);
}

function snapshot(): Currency {
  return document.documentElement.dataset.currency === "ugx" ? "ugx" : "usd";
}

export function useCurrency(): [Currency, (next: Currency) => void] {
  const currency = useSyncExternalStore<Currency>(subscribe, snapshot, () => "usd");

  const setCurrency = useCallback((next: Currency) => {
    document.documentElement.dataset.currency = next;
    try {
      localStorage.setItem(CURRENCY_STORAGE_KEY, next);
    } catch {
      // Storage blocked: the choice still applies to this page view.
    }
    window.dispatchEvent(new Event(CHANGED));
  }, []);

  return [currency, setCurrency];
}
