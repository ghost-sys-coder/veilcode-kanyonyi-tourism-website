import { ArrowUpIcon } from "lucide-react";
import { ui } from "@/lib/content/pages";

export function BackToTop() {
  return <a href="#main" className="inline-flex min-h-11 items-center gap-2 self-start font-semibold text-primary underline underline-offset-4">{ui.labels.backToTop}<ArrowUpIcon aria-hidden className="size-4" /></a>;
}
