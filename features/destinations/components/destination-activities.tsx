import { FactStamp } from "@/components/content/fact-stamp";
import { Inline } from "@/lib/content/inline";
import type { Activity } from "@/types/content";

export function DestinationActivities({ activities }: { activities: readonly Activity[] }) {
  return (
    <div className="flex flex-col gap-6">
      <ul className="measure flex flex-col gap-6">
        {activities.map((activity) => (
          <li key={activity.name} className="flex flex-col gap-2 border-b pb-6">
            <h3 className="text-display-m">{activity.name}</h3>
            {activity.notes?.length ? <p className="text-body-s font-medium text-muted-foreground">{activity.notes.join(" · ")}</p> : null}
            <p><Inline text={activity.body} /></p>
          </li>
        ))}
      </ul>
      <FactStamp />
    </div>
  );
}
