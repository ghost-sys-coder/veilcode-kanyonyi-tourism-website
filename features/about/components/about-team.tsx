import { isDemo, pickVariant } from "@/config/demo";
import { Section } from "@/components/layout/section";
import { about } from "@/lib/content/pages";

export function AboutTeam() {
  // Sample identities never carry over to a live client; their content swap supplies the team.
  const members = pickVariant({ live: about.team.liveMembers, demo: about.team.members });
  if (!members.length) return null;
  return <Section className="flex flex-col gap-6 pt-0 md:pt-0">
    <h2 className="text-display-l">{about.team.heading}</h2>
    {isDemo ? <p className="measure text-body-s text-muted-foreground">{about.team.demoNote}</p> : null}
    <ul className="grid grid-cols-1 gap-8 min-[720px]:grid-cols-3">
      {members.map((member) => <li key={member.name} className="flex flex-col gap-3 border-t pt-5">
        <h3 className="text-display-m">{member.name}</h3>
        <p className="font-semibold text-primary">{member.role}</p>
        <p className="measure">{member.line}</p>
      </li>)}
    </ul>
  </Section>;
}
