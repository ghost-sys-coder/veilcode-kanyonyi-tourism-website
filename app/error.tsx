"use client";

import Link from "next/link";
import { useEffect } from "react";
import { buttonVariants } from "@/components/ui/button";
import { ui } from "@/content/ui";

// 500 copy from 02-global.md. Never shows the raw error to the traveller (AGENTS.md section 33);
// the digest is logged so it can be matched to the server log.

export default function ErrorPage({ error }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error("Page error", { digest: error.digest, name: error.name });
  }, [error]);

  return (
    <section className="container-page section-y flex flex-col items-start gap-5">
      <h1 className="max-w-[18ch] text-display-l">{ui.serverError.heading}</h1>
      <p className="measure text-body-l text-muted-foreground">{ui.serverError.body}</p>
      <Link href="/" className={buttonVariants()}>
        {ui.serverError.button}
      </Link>
    </section>
  );
}
