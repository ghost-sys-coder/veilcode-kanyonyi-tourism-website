import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { resolveLink } from "@/lib/content/links";
import type { LinkRef } from "@/types/content";

/** "Related:" links that tie tours, destinations and guides together (002 section 10). */
export function RelatedLinks({ heading, links }: { heading: string; links: readonly LinkRef[] }) {
  if (links.length === 0) return null;
  return (
    <nav aria-labelledby="related-heading" className="flex flex-col gap-3">
      <h2 id="related-heading" className="eyebrow">
        {heading}
      </h2>
      <ul className="flex flex-wrap gap-x-6 gap-y-2">
        {links.map((ref) => {
          const { href, label } = resolveLink(ref);
          return (
            <li key={href}>
              <Link href={href} className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary underline underline-offset-4">
                {label}
                <ArrowRightIcon aria-hidden className="size-4" />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
