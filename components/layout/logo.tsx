import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

// DESIGN.md section 8: the bird mark from the reference file beside the wordmark.
// "dark" sits on the page ground, "light" on the forest band (footer).

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const circle = tone === "dark" ? "var(--band)" : "var(--band-foreground)";

  return (
    <Link
      href="/"
      aria-label={`${site.operator.name} home`}
      className={cn("inline-flex items-center gap-2.5 rounded-sm no-underline", className)}
    >
      <svg viewBox="0 0 40 40" aria-hidden="true" className="size-9 flex-none">
        <circle cx="20" cy="20" r="19" fill={circle} />
        <path d="M9 24c5-1 8-5 11-9 2 3 5 5 10 5-3 2-6 2-8 1-2 4-6 6-13 3z" fill="var(--sun)" />
        <circle cx="25.5" cy="17" r="1.2" fill="var(--band)" />
      </svg>
      <span className="flex flex-col">
        <span className="font-heading text-[1.375rem] leading-none">{site.operator.logoText}</span>
        <span
          className={cn(
            "mt-1 font-mono text-[0.625rem] whitespace-nowrap uppercase tracking-[0.14em]",
            tone === "dark" ? "text-muted-foreground" : "opacity-80",
          )}
        >
          {site.operator.logoSubline}
        </span>
      </span>
    </Link>
  );
}
