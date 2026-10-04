import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Page section with the container and DESIGN.md section rhythm (56px mobile, 72px desktop). */
export function Section({ className, children, ...props }: ComponentProps<"section">) {
  return (
    <section {...props} className={cn("container-page section-y scroll-mt-24", className)}>
      {children}
    </section>
  );
}
