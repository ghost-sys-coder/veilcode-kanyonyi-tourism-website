"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ui } from "@/content/ui";
import { body, display } from "./fonts";
import "./globals.css";

// Replaces the root layout when the layout itself fails, so it brings its own <html>, fonts and
// styles (bundled Next.js docs, error.md).

export default function GlobalError({ error }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error("Root layout error", { digest: error.digest, name: error.name });
  }, [error]);

  return (
    <html lang="en-GB" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <title>{ui.serverError.heading}</title>
        <main className="container-page section-y flex flex-col items-start gap-5">
          <h1 className="max-w-[18ch] text-display-l">{ui.serverError.heading}</h1>
          <p className="measure text-body-l text-muted-foreground">{ui.serverError.body}</p>
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-full bg-primary px-5 font-semibold text-primary-foreground"
          >
            {ui.serverError.button}
          </Link>
        </main>
      </body>
    </html>
  );
}
