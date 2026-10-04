import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { ui } from "@/content/ui";

export const metadata: Metadata = {
  title: ui.notFound.heading,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="container-page section-y flex flex-col gap-5">
      <h1 className="max-w-[18ch] text-display-l">{ui.notFound.heading}</h1>
      <p className="measure text-body-l text-muted-foreground">{ui.notFound.body}</p>
      <ul className="flex flex-col gap-3">
        {ui.notFound.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary underline underline-offset-4"
            >
              {link.label}
              <ArrowRightIcon className="size-4" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
