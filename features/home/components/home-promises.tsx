import { UsersIcon, CompassIcon, ListChecksIcon, RouteIcon } from "lucide-react";
import { Section } from "@/components/layout/section";
import { home } from "@/lib/content/pages";

const icons = [UsersIcon, CompassIcon, ListChecksIcon, RouteIcon];

export function HomePromises() {
  return <div className="border-y bg-secondary">
    <Section aria-labelledby="promises-heading">
      <h2 id="promises-heading" className="sr-only">{home.promises.srHeading}</h2>
      <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {home.promises.items.map((item, index) => {
          const Icon = icons[index];
          return <li key={item.title} className="flex flex-col gap-3">
            <Icon className="size-5 text-primary" strokeWidth={1.5} aria-hidden />
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="measure text-body-s text-muted-foreground">{item.body}</p>
          </li>;
        })}
      </ul>
    </Section>
  </div>;
}
