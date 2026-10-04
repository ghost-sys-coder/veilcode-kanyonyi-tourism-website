import type { Tour } from "@/types/content";

// docs/copy/04-tours.md, Tour 2.

export const murchisonFallsSafari = {
  slug: "4-day-murchison-falls-safari",
  name: "4-Day Murchison Falls Safari",
  categories: ["savannah-wildlife"],
  tag: "Big game",
  days: 4,
  nights: 3,
  destinations: ["murchison-falls"],
  metaLine: "4 DAYS · ZIWA · MURCHISON FALLS",
  cardSummary:
    "Rhino tracking on foot at Ziwa, giraffe and elephant on the northern plains, and a boat to the foot of the falls.",
  bestMonths: [1, 2, 6, 7, 8, 9, 12],
  includesPrimatePermits: false,
  hero: {
    summary:
      "Uganda's largest park and its most dramatic sight, with a walk among white rhinos on the way. The best savannah safari within a day's drive of Kampala.",
    keyFacts: ["4 days", "Starts and ends in Kampala or Entebbe", "Rhino tracking included", "Up to 6 guests"],
    image: { id: "tour-4-day-murchison-falls-safari" },
  },
  atAGlance: [
    { label: "Starts and ends", value: "Kampala or Entebbe" },
    { label: "Parks", value: "Ziwa Rhino Sanctuary · Murchison Falls National Park" },
    { label: "Time on the road", value: "About 6 hours on day 1 (with the Ziwa stop), 5 to 6 hours on day 4" },
    {
      label: "Fitness",
      value:
        "Easy. Rhino tracking is a 1 to 3 hour walk on flat ground; the Top of the Falls walk is short but steep in places",
    },
    {
      label: "Minimum age",
      value: "None for game drives and boats. Rhino tracking is open to children with an adult",
    },
    { label: "Group size", value: "Private, or up to 6 guests" },
    { label: "Lodges", value: "Comfortable mid-range lodges near the Nile" },
    {
      label: "Best months",
      value:
        "December to February and June to September; the plains are greener but harder to drive from April to May",
    },
  ],
  fit: {
    goodFitIf:
      "you want classic African wildlife (giraffe, elephant, lion, buffalo, hippo) without the long drive southwest; you have four days; you're travelling with children who are under 15 and can't gorilla trek.",
    thinkTwiceIf:
      "gorillas or chimps are your priority. Murchison has neither on this route. Add Kibale and Bwindi with the 10-Day Classic Uganda.",
  },
  itinerary: [
    {
      day: 1,
      title: "Kampala to Ziwa, then Murchison Falls",
      facts: [
        { label: "On the road", value: "about 6 hours with stops" },
        { label: "Activity", value: "rhino tracking on foot" },
        { label: "Overnight", value: "lodge near the Nile" },
        { label: "Meals", value: "lunch, dinner" },
      ],
      body: "Leave at 7am and drive north for about three hours to Ziwa Rhino Sanctuary. Rhinos were wiped out in Uganda by the early 1980s; Ziwa is where they are being brought back. With a ranger, you walk to within safe distance of a group of southern white rhinos. After lunch, continue to Murchison Falls, arriving in the late afternoon.",
    },
    {
      day: 2,
      title: "Game drive and the launch to the falls",
      facts: [
        { label: "Activities", value: "morning game drive, afternoon boat trip" },
        { label: "Overnight", value: "same lodge" },
        { label: "Meals", value: "breakfast, lunch, dinner" },
      ],
      body: "Cross the Nile on the early ferry for a game drive on the Buligi plains north of the river: Rothschild's giraffe, elephant, Uganda kob, buffalo, and with luck lion. After lunch, a three-hour boat trip upstream to the foot of the falls, past hippo pods, Nile crocodiles and riverbank elephants.",
    },
    {
      day: 3,
      title: "Top of the Falls and the delta",
      facts: [
        { label: "Activities", value: "optional delta boat trip, walk at the Top of the Falls" },
        { label: "Overnight", value: "same lodge" },
        { label: "Meals", value: "breakfast, lunch, dinner" },
      ],
      body: "An optional early boat trip downstream to where the Nile meets Lake Albert, the best place in the park to look for the shoebill. In the afternoon, drive to the Top of the Falls and walk to where the whole Nile pushes through a gorge seven metres wide and drops 43 metres. It's loud, and you'll feel the spray.",
    },
    {
      day: 4,
      title: "Murchison Falls to Kampala",
      facts: [
        { label: "On the road", value: "5 to 6 hours" },
        { label: "Meals", value: "breakfast, lunch" },
      ],
      body: "A last short game drive on the way out, then south through Masindi to Kampala or Entebbe, arriving mid to late afternoon.",
    },
  ],
  included: [
    "Rhino tracking at Ziwa and Ziwa entry",
    "Murchison Falls park entry for all days",
    "Launch trip to the foot of the falls and Nile ferry crossings",
    "Private 4x4 safari vehicle with pop-up roof, fuel and driver-guide",
    "3 nights' full-board lodge accommodation",
    "Bottled drinking water in the vehicle",
    "Hotel pickup and drop-off in Kampala or Entebbe",
  ],
  notIncluded: [
    "Delta boat trip (optional, priced in your quote)",
    "International flights and visa",
    "Tips, drinks and travel insurance",
  ],
  pricing: {
    validUntil: "2026-12-31",
    heading: "Prices (per person, travel until 31 December 2026)",
    perPersonCostUSD: 730,
    perVehicleCostUSD: 920,
    lowSeasonDiscountUSD: 0,
    showLowSeasonColumn: false,
    singleSupplementUSD: 150,
    extraRows: [{ label: "Children under 12 sharing with adults", value: "Ask us" }],
  },
  goodToKnow: [
    "Oil development is under way in parts of the park north of the Nile. Most game-viewing tracks remain open, and your guide plans drives around active work areas.",
    "Tsetse flies are active in some wooded parts of the park. Wear long, light-coloured clothes; dark blue and black attract them.",
  ],
  faqs: [
    {
      question: "Will we see lions?",
      answer:
        "Possibly. Lions live on the northern plains but are not seen on every drive. Giraffe, elephant, buffalo, hippo and Uganda kob are seen on almost every trip.",
    },
    {
      question: "Is this trip good for children?",
      answer:
        "Yes. It's one of our best family trips: short walks, boat trips and big animals, with no age limits on the main activities.",
    },
  ],
  related: [
    { kind: "destination", slug: "murchison-falls", label: "Murchison Falls National Park" },
    { kind: "guide", slug: "best-time-to-visit-uganda", label: "Best time to visit Uganda" },
  ],
  close: {
    heading: "Four days, the Nile and the big animals",
    body: "Tell us your dates and who's coming, and we'll send a plan within one working day.",
    button: { label: "Ask about this trip", target: "enquiry" },
  },
} satisfies Tour;
