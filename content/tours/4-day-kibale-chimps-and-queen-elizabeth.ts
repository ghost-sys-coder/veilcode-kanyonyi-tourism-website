import type { Tour } from "@/types/content";

// docs/copy/04-tours.md, Tour 3.

export const kibaleChimpsQueenElizabeth = {
  slug: "4-day-kibale-chimps-and-queen-elizabeth",
  name: "4-Day Kibale Chimps and Queen Elizabeth",
  categories: ["gorillas-and-chimps", "savannah-wildlife"],
  tag: "Primates and plains",
  days: 4,
  nights: 3,
  destinations: ["kibale", "queen-elizabeth"],
  metaLine: "4 DAYS · KIBALE · QUEEN ELIZABETH",
  cardSummary:
    "Chimp tracking in Kibale's forest, then hippos, elephants and buffalo from a boat on the Kazinga Channel.",
  bestMonths: [1, 2, 6, 7, 8, 9, 10, 12],
  includesPrimatePermits: true,
  minimumAge: 12,
  hero: {
    summary:
      "Forest one day, savannah the next. Track chimpanzees in Kibale, then take a boat along the Kazinga Channel, home to one of Africa's largest concentrations of hippos.",
    keyFacts: ["4 days", "Starts and ends in Kampala or Entebbe", "Chimp permit included", "Up to 6 guests"],
    image: { id: "tour-4-day-kibale-chimps-and-queen-elizabeth" },
  },
  atAGlance: [
    { label: "Starts and ends", value: "Kampala or Entebbe" },
    { label: "Parks", value: "Kibale National Park · Queen Elizabeth National Park" },
    { label: "Time on the road", value: "5 to 6 hours on day 1, about 3 hours on day 3, 6 to 7 hours on day 4" },
    { label: "Fitness", value: "Easy to moderate. Chimp tracking is 2 to 4 hours on forest trails, mostly flat" },
    { label: "Minimum age", value: "12 for chimp tracking" },
    { label: "Group size", value: "Private, or up to 6 guests" },
    { label: "Best months", value: "All year. Drier from June to September and December to February" },
  ],
  fit: {
    goodFitIf:
      "you want primates and savannah in four days; you're too young for gorilla trekking (12 to 14); you want a first taste of western Uganda.",
    thinkTwiceIf: "you also want gorillas. Add three days with the 7-Day Primates and Savannah.",
  },
  itinerary: [
    {
      day: 1,
      title: "Kampala to Kibale",
      facts: [
        { label: "On the road", value: "5 to 6 hours" },
        { label: "Overnight", value: "lodge near Kibale forest" },
        { label: "Meals", value: "lunch, dinner" },
      ],
      body: "West through Mubende to Fort Portal and the crater lakes that sit around the edge of Kibale forest. Afternoon free, or a walk around a crater lake with your guide.",
    },
    {
      day: 2,
      title: "Chimp tracking and Bigodi wetland",
      facts: [
        { label: "Activities", value: "chimp tracking (2 to 4 hours), Bigodi wetland walk" },
        { label: "Overnight", value: "same lodge" },
        { label: "Meals", value: "breakfast, lunch, dinner" },
      ],
      body: "The morning briefing is at the Kanyanchu visitor centre. Rangers lead small groups to a habituated chimpanzee community, often found by their calls before you see them. You have one hour with the chimps once you reach them. In the afternoon, walk the boardwalks of Bigodi Wetland Sanctuary, a community-run reserve known for birds and red colobus monkeys.",
    },
    {
      day: 3,
      title: "Kibale to Queen Elizabeth, Kazinga Channel",
      facts: [
        { label: "On the road", value: "about 3 hours" },
        { label: "Activity", value: "2-hour boat trip" },
        { label: "Overnight", value: "lodge in or near Queen Elizabeth" },
        { label: "Meals", value: "breakfast, lunch, dinner" },
      ],
      body: "South past the Rwenzori foothills and across the Equator into Queen Elizabeth National Park. In the afternoon, a two-hour boat trip on the Kazinga Channel between Lake George and Lake Edward: hippos, buffalo, elephants at the water's edge, and pied kingfishers, fish eagles and pelicans.",
    },
    {
      day: 4,
      title: "Game drive, then Kampala",
      facts: [
        { label: "Activity", value: "early game drive" },
        { label: "On the road", value: "6 to 7 hours" },
        { label: "Meals", value: "breakfast, lunch" },
      ],
      body: "A dawn drive on the Kasenyi plains, the best time for lions hunting Uganda kob. Then the drive back to Kampala, arriving in the early evening.",
    },
  ],
  included: [
    "Chimp tracking permit in Kibale",
    "Park entry for Kibale and Queen Elizabeth",
    "Kazinga Channel boat trip and Kasenyi game drive",
    "Bigodi wetland walk",
    "Private 4x4 safari vehicle with pop-up roof, fuel and driver-guide",
    "3 nights' full-board lodge accommodation, bottled water, hotel transfers",
  ],
  notIncluded: ["International flights, visa, tips, drinks, travel insurance"],
  pricing: {
    validUntil: "2026-12-31",
    heading: "Prices (per person, travel until 31 December 2026)",
    perPersonCostUSD: 1020,
    perVehicleCostUSD: 920,
    lowSeasonDiscountUSD: 0,
    showLowSeasonColumn: false,
    singleSupplementUSD: 160,
  },
  goodToKnow: [
    "Chimp permits are USD 250 for foreign non-residents in 2026 (USD 200 in April, May and November) and rise to USD 300 from 1 January 2027.",
    "Chimps move fast through the canopy and on the ground. Long trousers, closed shoes and a light rain jacket are enough.",
  ],
  faqs: [
    {
      question: "How likely are we to see chimps?",
      answer:
        "Very likely. Kibale's habituated communities are tracked daily, and sightings on the morning walks are high. They're wild animals, so it's never certain.",
    },
    {
      question: "Can we spend longer with the chimps?",
      answer:
        "Yes. The chimpanzee habituation experience gives you most of a day with a community as researchers work with them. It costs more and has limited places; ask us.",
    },
  ],
  related: [
    { kind: "destination", slug: "kibale", label: "Kibale National Park" },
    { kind: "destination", slug: "queen-elizabeth", label: "Queen Elizabeth National Park" },
  ],
  close: {
    heading: "Forest, channel and plains in four days",
    button: { label: "Ask about this trip", target: "enquiry" },
  },
} satisfies Tour;
