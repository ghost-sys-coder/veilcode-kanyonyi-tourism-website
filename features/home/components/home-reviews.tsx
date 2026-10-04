import { pickVariant } from "@/config/demo";
import { Section } from "@/components/layout/section";
import { home } from "@/lib/content/pages";

export function HomeReviews() {
  // Client reviews must come from real sources. Until supplied, there is no live review content.
  const content = pickVariant<typeof home.reviews | null>({ demo: home.reviews, live: null });
  if (!content) return null;
  return <Section id="reviews" aria-labelledby="reviews-heading" className="flex flex-col gap-4">
    <h2 id="reviews-heading" className="text-display-l">{content.h2}</h2>
    <p className="measure-lede text-body-l text-muted-foreground">{content.body}</p>
  </Section>;
}
