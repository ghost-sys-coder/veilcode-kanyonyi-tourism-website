import type { Tour } from "@/types/content";

// docs/copy/04-tours.md, Tour 5. The copy has no "Is this trip for you", "Group size" or
// "Good to know" for this tour, so those are left out rather than invented.

export const classicUganda = {
  slug: "10-day-classic-uganda",
  name: "10-Day Classic Uganda",
  categories: ["gorillas-and-chimps", "savannah-wildlife"],
  tag: "The full country",
  days: 10,
  nights: 9,
  destinations: ["murchison-falls", "kibale", "queen-elizabeth", "bwindi"],
  metaLine: "10 DAYS · MURCHISON · KIBALE · QUEEN ELIZABETH · BWINDI",
  cardSummary:
    "Rhinos and the Nile in the north, chimps and lions in the west, gorillas in the southwest. Every park on this site in one trip.",
  bestMonths: [1, 2, 6, 7, 8, 9, 12],
  includesPrimatePermits: true,
  minimumAge: 15,
  hero: {
    summary:
      "North to the Nile, west to the forests, south to the gorillas. Ten days, four national parks and a rhino sanctuary, ending with a flight back so you don't repeat the road.",
    keyFacts: ["10 days", "Starts in Entebbe", "All permits included", "Flight back from Bwindi included"],
    image: { id: "tour-10-day-classic-uganda" },
  },
  atAGlance: [
    { label: "Starts and ends", value: "Starts Entebbe, ends Entebbe by scheduled flight from Kihihi" },
    { label: "Parks", value: "Ziwa · Murchison Falls · Kibale · Queen Elizabeth (with Ishasha) · Bwindi" },
    {
      label: "Time on the road",
      value: "The longest day is day 4, about 7 hours from Murchison to Kibale. Most days are 3 to 4 hours",
    },
    { label: "Fitness", value: "Moderate to hard on gorilla day; easy to moderate otherwise" },
    { label: "Minimum age", value: "15 (gorilla trekking)" },
    { label: "Best months", value: "June to September and December to February" },
  ],
  itinerary: [
    {
      day: 1,
      title: "Arrive Entebbe",
      facts: [{ label: "Meals", value: "dinner" }],
      body: "Met at the airport and taken to a hotel near Lake Victoria. Briefing with your guide over dinner.",
      factsAfterBody: true,
    },
    {
      day: 2,
      title: "Ziwa rhinos, then Murchison Falls",
      facts: [
        { label: "On the road", value: "about 6 hours with stops" },
        { label: "Meals", value: "breakfast, lunch, dinner" },
      ],
      body: "North to Ziwa for rhino tracking on foot, then on to Murchison Falls.",
    },
    {
      day: 3,
      title: "Game drive and launch to the falls",
      facts: [{ label: "Meals", value: "breakfast, lunch, dinner" }],
      body: "Morning game drive on the Buligi plains; afternoon boat to the foot of the falls.",
    },
    {
      day: 4,
      title: "Top of the Falls, then south to Kibale",
      facts: [
        { label: "On the road", value: "about 7 hours" },
        { label: "Meals", value: "breakfast, lunch, dinner" },
      ],
      body: "The walk at the Top of the Falls in the morning, then the long drive south along the Albertine Rift to Fort Portal.",
    },
    {
      day: 5,
      title: "Chimp tracking and Bigodi wetland",
      facts: [{ label: "Meals", value: "breakfast, lunch, dinner" }],
      body: "Chimpanzees in the morning, wetland walk in the afternoon.",
    },
    {
      day: 6,
      title: "To Queen Elizabeth, Kazinga Channel",
      facts: [
        { label: "On the road", value: "about 3 hours" },
        { label: "Meals", value: "breakfast, lunch, dinner" },
      ],
      body: "Afternoon boat trip on the Kazinga Channel.",
    },
    {
      day: 7,
      title: "Kasenyi plains, then Ishasha",
      facts: [
        { label: "On the road", value: "about 3 hours with game viewing" },
        { label: "Meals", value: "breakfast, lunch, dinner" },
      ],
      body: "Dawn game drive, then south to look for Ishasha's tree-climbing lions.",
    },
    {
      day: 8,
      title: "Ishasha to Bwindi",
      facts: [
        { label: "On the road", value: "3 to 5 hours" },
        { label: "Meals", value: "breakfast, lunch, dinner" },
      ],
      body: "Up into the hills to the forest edge.",
    },
    {
      day: 9,
      title: "Gorilla trek",
      facts: [
        { label: "Trekking", value: "1 to 6 hours return" },
        { label: "Meals", value: "breakfast, packed lunch, dinner" },
      ],
      body: "Your hour with a mountain gorilla family.",
    },
    {
      day: 10,
      title: "Fly back to Entebbe",
      facts: [
        { label: "Flight", value: "about 2 hours" },
        { label: "Meals", value: "breakfast" },
      ],
      body: "Scheduled flight from Kihihi to Entebbe in time for evening international departures.",
    },
  ],
  included: [
    "Gorilla permit, chimp permit, rhino tracking",
    "All park entry fees on the route",
    "Launch to the foot of Murchison Falls, Kazinga Channel boat trip, Bigodi wetland walk",
    "Scheduled flight Kihihi to Entebbe",
    "Private 4x4 vehicle with pop-up roof, fuel and driver-guide",
    "9 nights: 1 in Entebbe on bed and breakfast, 8 full-board in lodges",
    "Airport transfers and bottled water",
  ],
  notIncluded: [
    "International flights, visa, porter on gorilla day, tips, drinks, travel insurance",
    "Optional delta boat trip in Murchison",
  ],
  pricing: {
    validUntil: "2026-12-31",
    heading: "Prices (per person, travel until 31 December 2026)",
    perPersonCostUSD: 3610,
    perVehicleCostUSD: 2680,
    lowSeasonDiscountUSD: 200,
    showLowSeasonColumn: false,
    singleSupplementUSD: 450,
  },
  faqs: [
    {
      question: "Is ten days too much driving?",
      answer:
        "It's the right amount if you like seeing the country between parks: tea estates, crater lakes, the Rwenzori foothills, roadside markets. No day is longer than about seven hours, and the flight saves the longest leg.",
    },
    {
      question: "Can we add Lake Mburo or a second gorilla trek?",
      answer:
        "Yes to both. Lake Mburo adds zebra, eland and walking safaris; a second trek adds a night in Bwindi.",
    },
  ],
  // "All four destination pages" in the copy: labels come from each destination's name.
  related: [
    { kind: "destination", slug: "murchison-falls" },
    { kind: "destination", slug: "kibale" },
    { kind: "destination", slug: "queen-elizabeth" },
    { kind: "destination", slug: "bwindi" },
    { kind: "guide", slug: "best-time-to-visit-uganda", label: "Best time to visit Uganda" },
  ],
  close: {
    heading: "The whole country, in the right order",
    button: { label: "Ask about this trip", target: "enquiry" },
  },
} satisfies Tour;
