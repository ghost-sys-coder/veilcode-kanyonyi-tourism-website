// Fixed labels on every tour page, from docs/copy/04-tours.md ("How each tour page is laid out"
// and the section headings each tour uses). Word for word.

export const tourPage = {
  atAGlance: "At a glance",
  fit: { heading: "Is this trip for you?", goodFitIf: "Good fit if:", thinkTwiceIf: "Think twice if:" },
  dayByDay: "Day by day",
  /** Rendered as "Day 1", "Day 2"... */
  day: "Day",
  included: "What's included",
  notIncluded: "Not included",
  prices: {
    groupSize: "Group size",
    price: "Price",
    standardDates: "Standard dates",
    travellers: "{n} travellers",
    singleSupplement: "Single room supplement",
  },
  goodToKnow: "Good to know",
  questions: "Questions about this trip",
  related: "Related",
} as const;
