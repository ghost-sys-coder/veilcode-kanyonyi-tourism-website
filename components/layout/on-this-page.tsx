import { ui } from "@/content/ui";

/** Jump links to the sections a page actually has ("On this page", 02-global.md). */
export function OnThisPage({ links, heading = ui.labels.onThisPage }: { links: { id: string; label: string }[]; heading?: string }) {
  return (
    <nav aria-labelledby="on-this-page" className="border-y bg-background/95">
      <div className="container-page flex items-center gap-4 overflow-x-auto py-2">
        <h2 id="on-this-page" className="shrink-0 font-mono text-label uppercase tracking-[0.08em] text-muted-foreground">
          {heading}
        </h2>
        <ul className="flex gap-1">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className="inline-flex min-h-10 items-center rounded-full px-3 text-body-s font-medium whitespace-nowrap hover:bg-secondary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
