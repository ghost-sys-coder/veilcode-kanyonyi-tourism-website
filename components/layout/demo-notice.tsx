"use client";

import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { DEMO_DISMISSED_KEY } from "@/lib/ui/boot-script";

// Thin bar above the header, dismissible per session (02-global.md). Hidden by CSS via
// html[data-demo-dismissed], which the boot script sets before paint, so it never flashes.

export function DemoNotice() {
  function dismiss() {
    document.documentElement.dataset.demoDismissed = "1";
    try {
      sessionStorage.setItem(DEMO_DISMISSED_KEY, "1");
    } catch {
      // Storage blocked: the bar stays hidden for this page view only.
    }
  }

  return (
    <div className="demo-notice bg-band text-band-foreground">
      <div className="container-page flex items-start gap-3 py-2 text-body-s">
        <p className="flex-1">
          {site.demoNotice.text}{" "}
          <a
            href={site.demoNotice.linkHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-band-accent underline underline-offset-4"
          >
            {site.demoNotice.linkLabel}
            <span className="sr-only"> {ui.a11y.externalLinkSuffix}</span>
          </a>
        </p>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={dismiss}
          aria-label={ui.a11y.dialogClose}
          className="-my-1 text-band-foreground hover:bg-white/10 hover:text-band-foreground focus-visible:ring-band-accent"
        >
          <XIcon aria-hidden />
        </Button>
      </div>
    </div>
  );
}
