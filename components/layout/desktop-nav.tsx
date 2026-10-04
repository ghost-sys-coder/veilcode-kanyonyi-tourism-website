"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { cn } from "@/lib/utils";

// Five flat links, so a plain <nav><ul> instead of NavigationMenu (004 section 4): no dropdowns
// means no menu semantics to manage. Client only for aria-current.

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav aria-label={ui.a11y.mainNavLabel} className="hidden lg:block">
      <ul className="flex items-center gap-6">
        {site.nav.map((item) => {
          const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "rounded-sm py-2 text-[0.9375rem] font-medium text-muted-foreground transition-colors hover:text-foreground",
                  current && "text-foreground underline decoration-2 underline-offset-8",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
