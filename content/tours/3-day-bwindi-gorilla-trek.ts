import type { Tour } from "@/types/content";

// docs/copy/04-tours.md, Tour 1. Word for word; tests/unit/content-verbatim.test.ts checks it.

export const bwindiGorillaTrek = {
  slug: "3-day-bwindi-gorilla-trek",
  name: "3-Day Bwindi Gorilla Trek",
  categories: ["gorillas-and-chimps"],
  tag: "Most booked",
  days: 3,
  nights: 2,
  destinations: ["bwindi"],
  metaLine: "3 DAYS · BWINDI IMPENETRABLE",
  cardSummary: "Drive to Bwindi, trek to a habituated gorilla family, drive back. The shortest gorilla trip that works.",
  bestMonths: [1, 2, 6, 7, 8, 9, 12],
  includesPrimatePermits: true,
  minimumAge: 15,
  hero: {
    summary:
      "Two days on the road and one in the forest. If gorillas are the reason you're coming to Uganda and time is short, this is the trip.",
    keyFacts: ["3 days", "Starts and ends in Kampala or Entebbe", "Gorilla permit included", "Up to 6 guests"],
    image: { id: "tour-3-day-bwindi-gorilla-trek" },
  },
  atAGlance: [
    { label: "Starts and ends", value: "Kampala or Entebbe" },
    { label: "Parks", value: "Bwindi Impenetrable National Park" },
    { label: "Time on the road", value: "About 8 to 9 hours each way" },
    { label: "Fitness", value: "Moderate to hard. Treks take 1 to 6 hours return on steep, muddy trails" },
    { label: "Minimum age", value: "15 (Uganda Wildlife Authority rule for gorilla trekking)" },
    { label: "Group size", value: "Private, or up to 6 guests" },
    { label: "Lodges", value: "Comfortable mid-range, en-suite rooms near your trekking sector" },
    {
      label: "Best months",
      value:
        "June to September and December to February for drier trails; April, May and November for cheaper permits",
    },
  ],
  fit: {
    goodFitIf:
      "gorillas are the one thing you must do; you have three days, perhaps at the end of a work trip or before flying on; you don't mind a long day in the car.",
    thinkTwiceIf:
      "you'd rather not spend 16 to 18 hours in a vehicle over three days. Flying to Kihihi airstrip cuts each way to about two hours, and we can quote that instead. If you have five days or more, the 7-Day Primates and Savannah trip gives you far more for the drive.",
  },
  itinerary: [
    {
      day: 1,
      title: "Kampala to Bwindi",
      facts: [
        { label: "On the road", value: "8 to 9 hours" },
        { label: "Overnight", value: "lodge near your trekking sector" },
        { label: "Meals", value: "lunch, dinner" },
      ],
      body: "Your guide collects you from your Kampala or Entebbe hotel at 6am. The road runs southwest through Masaka and Mbarara, past the long-horned Ankole cattle, and climbs into the terraced Kigezi hills. Lunch is on the way. You reach your lodge in the late afternoon, with time for a shower and a briefing on tomorrow.",
    },
    {
      day: 2,
      title: "Gorilla trek",
      facts: [
        { label: "Trekking", value: "1 to 6 hours return" },
        { label: "Overnight", value: "same lodge" },
        { label: "Meals", value: "breakfast, packed lunch, dinner" },
      ],
      body: "Breakfast at 6:30am, then a short drive to the park office for the 7:30am ranger briefing. You're assigned a gorilla family and a group of no more than eight visitors. Trackers have already gone ahead to find the family. Once you reach them, you have one hour: watching young gorillas play, the silverback feeding, the mothers with infants. You'll wear a surgical mask and keep the distance your ranger sets. The walk back is often easier than the walk in. In the afternoon, an optional community walk, or rest.",
    },
    {
      day: 3,
      title: "Bwindi to Kampala",
      facts: [
        { label: "On the road", value: "8 to 9 hours" },
        { label: "Meals", value: "breakfast, lunch" },
      ],
      body: "An early start for the drive back, with a stop at the Equator line at Kayabwe for photographs. You arrive in Kampala or Entebbe in the early evening. If you're flying out the same night, choose a flight after 11pm, or let us book you a final night near the airport.",
    },
  ],
  included: [
    "Gorilla trekking permit (USD 800, or USD 600 in April, May and November 2026)",
    "Bwindi park entry",
    "Private 4x4 safari vehicle with pop-up roof, fuel and an English-speaking driver-guide",
    "2 nights' full-board lodge accommodation",
    "Bottled drinking water in the vehicle",
    "Hotel pickup and drop-off in Kampala or Entebbe",
  ],
  notIncluded: [
    "International flights and your Uganda visa (USD 50 e-visa)",
    "Porter on the trek (around USD 20, paid in cash on the day; recommended)",
    "Tips for your guide, rangers and lodge staff",
    "Drinks other than water, and optional activities such as the community walk",
    "Travel insurance (required)",
  ],
  pricing: {
    validUntil: "2026-12-31",
    heading: "Prices (per person, for travel until 31 December 2026)",
    perPersonCostUSD: 1190,
    perVehicleCostUSD: 920,
    lowSeasonDiscountUSD: 200,
    showLowSeasonColumn: true,
    lowSeasonLabel: "April, May, November dates",
    singleSupplementUSD: 140,
    footnote: "Discounted April, May and November permits are fixed to their date and can't be rescheduled by the park.",
  },
  goodToKnow: [
    "Permits are sold by date and are paid in full at booking. Your trek date is fixed once the permit is bought, so we confirm it before anything else.",
    "If you have a cough, cold or fever on the morning of your trek, tell the ranger. Gorillas catch human illnesses; the park can refund part of the permit to visitors who declare illness, and won't let you trek if you're unwell.",
    "Bwindi has four trekking sectors (Buhoma, Ruhija, Rushaga, Nkuringo). Your sector depends on which permits are available on your date, and your lodge is booked near it.",
  ],
  faqs: [
    {
      question: "Can we fly instead of driving?",
      answer:
        "Yes. Scheduled light aircraft fly from Entebbe to Kihihi (for Buhoma) or Kisoro (for Rushaga and Nkuringo) in about two hours. We'll add the flights to your quote and your guide meets you at the airstrip.",
    },
    {
      question: "What if it rains on trek day?",
      answer:
        "The trek goes ahead. Rain jacket, gaiters and gloves for the nettles make the difference. See our [packing list](/guides/what-to-pack-gorilla-trekking-safari).",
    },
    {
      question: "Can we do two treks?",
      answer: "Yes, add a night and a second permit. Many people find the second hour with a different family as good as the first.",
    },
  ],
  related: [
    { kind: "destination", slug: "bwindi", label: "Bwindi Impenetrable" },
    { kind: "guide", slug: "uganda-gorilla-permits", label: "Gorilla permits explained" },
    { kind: "guide", slug: "what-to-pack-gorilla-trekking-safari", label: "What to pack" },
  ],
  close: {
    heading: "Ready to check permit availability?",
    body: "Send your preferred dates. We'll check which sectors have permits and reply within one working day.",
    button: { label: "Ask about this trip", target: "enquiry" },
  },
} satisfies Tour;
