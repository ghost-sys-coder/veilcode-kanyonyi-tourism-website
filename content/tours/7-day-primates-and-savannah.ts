import type { Tour } from "@/types/content";

// docs/copy/04-tours.md, Tour 4.

export const primatesAndSavannah = {
  slug: "7-day-primates-and-savannah",
  name: "7-Day Primates and Savannah",
  categories: ["gorillas-and-chimps", "savannah-wildlife"],
  tag: "Best first trip",
  days: 7,
  nights: 6,
  destinations: ["kibale", "queen-elizabeth", "bwindi"],
  metaLine: "7 DAYS · KIBALE · QUEEN ELIZABETH · BWINDI",
  cardSummary:
    "Chimps in Kibale, the Kazinga Channel and Ishasha's tree-climbing lions, then gorillas in Bwindi. The trip we recommend most.",
  bestMonths: [1, 2, 6, 7, 8, 9, 12],
  includesPrimatePermits: true,
  minimumAge: 15,
  hero: {
    summary:
      "Chimpanzees, savannah and mountain gorillas in one loop through western Uganda. If this is your first time in the country and you have a week, start here.",
    keyFacts: [
      "7 days",
      "Starts in Kampala or Entebbe",
      "Gorilla and chimp permits included",
      "Flight back from Bwindi included",
    ],
    image: { id: "tour-7-day-primates-and-savannah" },
  },
  atAGlance: [
    { label: "Starts and ends", value: "Starts Kampala or Entebbe, ends Entebbe by scheduled flight from Kihihi" },
    { label: "Parks", value: "Kibale · Queen Elizabeth (including Ishasha) · Bwindi Impenetrable" },
    { label: "Time on the road", value: "5 to 6 hours on day 1, then 3 to 4 hours or less on most days" },
    { label: "Fitness", value: "Moderate to hard on gorilla day; easy to moderate otherwise" },
    { label: "Minimum age", value: "15 (gorilla trekking)" },
    { label: "Group size", value: "Private, or up to 6 guests" },
    { label: "Best months", value: "June to September and December to February" },
  ],
  fit: {
    goodFitIf:
      "you want the three things Uganda does best in a single week, without retracing your route; you'd rather fly back than repeat a nine-hour drive.",
    thinkTwiceIf:
      "you want big savannah herds above all. Uganda's parks are greener and wilder than Kenya's or Tanzania's plains but hold fewer animals per square kilometre.",
  },
  itinerary: [
    {
      day: 1,
      title: "Kampala to Kibale",
      facts: [
        { label: "On the road", value: "5 to 6 hours" },
        { label: "Meals", value: "lunch, dinner" },
      ],
      body: "West to Fort Portal and the crater lakes around Kibale forest.",
    },
    {
      day: 2,
      title: "Chimp tracking and Bigodi wetland",
      facts: [{ label: "Meals", value: "breakfast, lunch, dinner" }],
      body: "Morning chimp tracking from Kanyanchu: one hour with a habituated community once you find them. Afternoon walk in Bigodi Wetland Sanctuary for birds and monkeys.",
    },
    {
      day: 3,
      title: "To Queen Elizabeth, Kazinga Channel",
      facts: [
        { label: "On the road", value: "about 3 hours" },
        { label: "Meals", value: "breakfast, lunch, dinner" },
      ],
      body: "Across the Equator to Queen Elizabeth National Park. Afternoon boat trip on the Kazinga Channel among hippos, buffalo and elephants.",
    },
    {
      day: 4,
      title: "Kasenyi plains, then Ishasha",
      facts: [
        { label: "On the road", value: "about 3 hours with game viewing" },
        { label: "Meals", value: "breakfast, lunch, dinner" },
      ],
      body: "Dawn game drive on the Kasenyi plains for lions, then south to the Ishasha sector. Afternoon drive looking for Ishasha's lions resting in the branches of fig trees, a behaviour seen in very few places.",
    },
    {
      day: 5,
      title: "Ishasha to Bwindi",
      facts: [
        { label: "On the road", value: "3 to 5 hours, depending on the road" },
        { label: "Meals", value: "breakfast, lunch, dinner" },
      ],
      body: "A morning drive in Ishasha, then up into the hills to your lodge on the edge of Bwindi. Evening briefing.",
    },
    {
      day: 6,
      title: "Gorilla trek",
      facts: [
        { label: "Trekking", value: "1 to 6 hours return" },
        { label: "Meals", value: "breakfast, packed lunch, dinner" },
      ],
      body: "Your hour with a mountain gorilla family. Afternoon free, or a community walk.",
    },
    {
      day: 7,
      title: "Fly back to Entebbe",
      facts: [
        { label: "Flight", value: "about 2 hours" },
        { label: "Meals", value: "breakfast" },
      ],
      body: "Your guide drives you to Kihihi airstrip for a scheduled flight to Entebbe, landing in time for most evening international departures. Your guide drives the vehicle back.",
    },
  ],
  included: [
    "Gorilla permit and chimp permit",
    "Park entry for Kibale, Queen Elizabeth and Bwindi",
    "Kazinga Channel boat trip, Bigodi wetland walk",
    "Scheduled flight Kihihi to Entebbe",
    "Private 4x4 vehicle with pop-up roof, fuel and driver-guide for days 1 to 7",
    "6 nights' full-board lodges, bottled water, hotel pickup",
  ],
  notIncluded: [
    "International flights, visa, porter on gorilla day (around USD 20), tips, drinks, travel insurance",
    "Excess baggage on the domestic flight (light aircraft have a soft-bag weight limit; we'll send it with your quote)",
  ],
  pricing: {
    validUntil: "2026-12-31",
    heading: "Prices (per person, travel until 31 December 2026)",
    perPersonCostUSD: 2590,
    perVehicleCostUSD: 1720,
    lowSeasonDiscountUSD: 200,
    showLowSeasonColumn: false,
    singleSupplementUSD: 330,
  },
  faqs: [
    {
      question: "Can we drive back instead of flying?",
      answer: "Yes, and the price drops. It's a full day: 8 to 9 hours from Bwindi to Entebbe.",
    },
    {
      question: "Can we add a second gorilla trek?",
      answer: "Yes. Add a night in Bwindi and a second permit.",
    },
  ],
  related: [
    { kind: "destination", slug: "kibale", label: "Kibale" },
    { kind: "destination", slug: "queen-elizabeth", label: "Queen Elizabeth" },
    { kind: "destination", slug: "bwindi", label: "Bwindi" },
    { kind: "guide", slug: "uganda-gorilla-permits", label: "Gorilla permits explained" },
  ],
  close: {
    heading: "A week, three parks, both great apes",
    button: { label: "Ask about this trip", target: "enquiry" },
  },
} satisfies Tour;
