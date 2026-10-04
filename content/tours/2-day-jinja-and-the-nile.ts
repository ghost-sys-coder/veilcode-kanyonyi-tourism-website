import type { Tour } from "@/types/content";

// docs/copy/04-tours.md, Tour 6. No destination page ("links to /tours").

export const jinjaAndTheNile = {
  slug: "2-day-jinja-and-the-nile",
  name: "2-Day Jinja and the Nile",
  categories: ["nile-and-adventure"],
  tag: "Weekend",
  days: 2,
  nights: 1,
  destinations: [],
  metaLine: "2 DAYS · JINJA · SOURCE OF THE NILE",
  cardSummary:
    "A boat to where the Nile leaves Lake Victoria, a night by the river, and a full day of white-water rafting.",
  bestMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  includesPrimatePermits: false,
  hero: {
    summary:
      "A weekend from Kampala: a sunset boat to the source of the Nile, a night on the riverbank, and a full day rafting the White Nile's rapids, or a calm family float if you'd rather.",
    keyFacts: ["2 days", "From Kampala", "Rafting included", "Good for residents and short stays"],
    image: { id: "tour-2-day-jinja-and-the-nile" },
  },
  atAGlance: [
    { label: "Starts and ends", value: "Kampala" },
    { label: "Time on the road", value: "2 to 3 hours each way, depending on Kampala traffic" },
    {
      label: "Fitness",
      value:
        "Rafting needs no experience, but you must be comfortable in water and wear the life jacket provided",
    },
    {
      label: "Minimum age",
      value:
        "Usually 16 for the full grade 5 run, set by the rafting company. Younger travellers can take the family float",
    },
    { label: "Best months", value: "All year" },
  ],
  itinerary: [
    {
      day: 1,
      title: "Kampala to Jinja, source of the Nile",
      facts: [
        { label: "On the road", value: "2 to 3 hours" },
        { label: "Meals", value: "lunch, dinner" },
      ],
      body: "Leave Kampala mid-morning, through the Mabira forest to Jinja. After lunch, a boat trip on Lake Victoria to the point where the Nile leaves the lake and begins its run north to Egypt. Evening by the river.",
    },
    {
      day: 2,
      title: "White-water rafting",
      facts: [
        { label: "Activity", value: "full-day rafting" },
        { label: "On the road", value: "2 to 3 hours" },
        { label: "Meals", value: "breakfast, lunch" },
      ],
      body: "Safety briefing and practice in calm water, then a day on the White Nile below Jinja, with rapids graded from 1 to 5 and calm stretches for swimming between them. The rafting company's safety kayakers follow every raft. Lunch on the river; back to Kampala by evening.",
    },
  ],
  included: [
    "Return transport from Kampala with driver",
    "Source of the Nile boat trip",
    "Full-day rafting with lunch, equipment and safety crew",
    "1 night riverside lodge, dinner and breakfast",
  ],
  notIncluded: ["Drinks, tips, photos and videos sold by the rafting company, travel insurance"],
  pricing: {
    validUntil: "2026-12-31",
    heading: "Prices (per person, travel until 31 December 2026)",
    perPersonCostUSD: 300,
    perVehicleCostUSD: 240,
    lowSeasonDiscountUSD: 0,
    showLowSeasonColumn: false,
    singleSupplementUSD: 60,
    extraRows: [{ label: "Residents (UGX)", value: "Ask us for a shilling price" }],
  },
  faqs: [
    {
      question: "Is rafting the Nile safe?",
      answer:
        "Reputable companies on the Nile run trained safety kayakers, rescue boats and full briefings, and we only book with them. Grade 5 rapids are serious water; if you'd rather not flip, ask for a raft that avoids the biggest lines.",
    },
    {
      question: "Can we do it as a day trip?",
      answer: "Yes. Leave Kampala at 6am and you'll be back by about 8pm. Ask us for the day-trip price.",
    },
  ],
  related: [{ kind: "page", href: "/tours", label: "All tours" }],
  close: {
    heading: "A weekend that starts at the source",
    button: { label: "Ask about this trip", target: "enquiry" },
  },
} satisfies Tour;
