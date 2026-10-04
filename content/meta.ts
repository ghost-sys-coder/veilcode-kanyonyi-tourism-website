import type { PageMeta } from "@/types/content";

// Titles and descriptions from docs/copy/11-emails-and-meta.md (and 06-guides.md for /guides).
// Titles are stored without " | Kanyonyi"; the root layout's title template adds it.

export const meta = {
  "/": {
    title: "Private Gorilla Treks and Safaris in Uganda",
    absoluteTitle: "Private Gorilla Treks and Safaris in Uganda · Kanyonyi",
    description:
      "Private and small-group Uganda safaris from Kampala: gorilla trekking in Bwindi, chimps in Kibale, Murchison Falls. Itemised quotes, up to 6 per vehicle.",
  },
  "/tours": {
    title: "Uganda Tours and Safari Itineraries",
    description:
      "Six Uganda itineraries from 2 to 10 days, with day-by-day plans, real drive times and prices including gorilla and chimp permits.",
  },
  "/tours/3-day-bwindi-gorilla-trek": {
    title: "3-Day Bwindi Gorilla Trek from Kampala",
    description:
      "Three days from Kampala to Bwindi for a gorilla trek, permit included. Drive times, inclusions and 2026 prices from USD 1,650 per person.",
  },
  "/tours/4-day-murchison-falls-safari": {
    title: "4-Day Murchison Falls Safari with Ziwa Rhinos",
    description:
      "Rhino tracking at Ziwa, game drives and a boat to the foot of Murchison Falls. Day-by-day plan and prices from USD 1,190 per person.",
  },
  "/tours/4-day-kibale-chimps-and-queen-elizabeth": {
    title: "4-Day Kibale Chimps and Queen Elizabeth",
    description:
      "Chimp tracking in Kibale and a Kazinga Channel boat trip in Queen Elizabeth. Four days from Kampala, from USD 1,480 per person.",
  },
  "/tours/7-day-primates-and-savannah": {
    title: "7-Day Uganda Gorillas, Chimps and Safari",
    description:
      "Chimps in Kibale, Queen Elizabeth's lions and channel, gorillas in Bwindi, flight back included. Seven days from USD 3,450 per person.",
  },
  "/tours/10-day-classic-uganda": {
    title: "10-Day Classic Uganda Safari Itinerary",
    description:
      "Ziwa rhinos, Murchison Falls, Kibale chimps, Queen Elizabeth and Bwindi gorillas in ten days. Full itinerary and prices.",
  },
  "/tours/2-day-jinja-and-the-nile": {
    title: "2-Day Jinja Trip: Source of the Nile and Rafting",
    description:
      "A weekend from Kampala: boat to the source of the Nile and a full day of white-water rafting. Itinerary and prices from USD 420.",
  },
  "/destinations": {
    title: "Uganda Safari Destinations",
    description:
      "Bwindi, Kibale, Queen Elizabeth and Murchison Falls: what each park is best for, how far they are from Kampala, and when to go.",
  },
  "/destinations/bwindi": {
    title: "Bwindi Impenetrable National Park Guide",
    description:
      "Gorilla trekking in Bwindi: the four sectors, permit prices, how hard the treks are, how to get there and the best time to go.",
  },
  "/destinations/kibale": {
    title: "Kibale National Park: Chimp Tracking Guide",
    description:
      "Chimp tracking in Kibale: permit prices for 2026 and 2027, what a tracking morning is like, Bigodi wetland and how to get there.",
  },
  "/destinations/queen-elizabeth": {
    title: "Queen Elizabeth National Park Guide",
    description:
      "Kazinga Channel boat trips, Kasenyi game drives and Ishasha's tree-climbing lions: planning a visit to Queen Elizabeth National Park.",
  },
  "/destinations/murchison-falls": {
    title: "Murchison Falls National Park Guide",
    description:
      "Uganda's largest park: the falls, Nile boat trips, game drives north of the river, shoebills in the delta, and Ziwa rhinos on the way.",
  },
  "/guides": {
    title: "Uganda Travel Guides: Permits, Seasons, Packing",
    description:
      "Practical guides for planning a Uganda trip: gorilla permit prices and rules, the best time to visit month by month, and what to pack.",
  },
  "/guides/uganda-gorilla-permits": {
    title: "Uganda Gorilla Permits 2026 and 2027",
    description:
      "Gorilla permit prices for 2026 and 2027, the March 2026 full-payment rule, low-season permits, refunds and how to book. Checked October 2026.",
  },
  "/guides/best-time-to-visit-uganda": {
    title: "Best Time to Visit Uganda, Month by Month",
    description:
      "Dry and wet seasons, cheaper low-season permits, and what each month is like for gorilla trekking, chimps and game drives.",
  },
  "/guides/what-to-pack-gorilla-trekking-safari": {
    title: "What to Pack for Gorilla Trekking in Uganda",
    description:
      "The kit that matters on a Bwindi gorilla trek and a Uganda safari, plus visa, yellow fever and malaria notes checked October 2026.",
  },
  "/about": {
    title: "About Kanyonyi Expeditions",
    description:
      "A Kampala-based operator running private Uganda trips with up to six guests per vehicle, one guide throughout and itemised quotes.",
  },
  "/plan-your-trip": {
    title: "Plan Your Uganda Trip",
    description:
      "Send your dates and who's travelling. A planner replies within one working day with a day-by-day plan and an itemised quote.",
  },
  "/faq": {
    title: "Uganda Safari FAQ",
    description:
      "Booking, payments, visas, yellow fever, safety, children, vehicles and lodges: answers to the questions travellers ask before booking.",
  },
  "/booking-terms": {
    title: "Booking Terms",
    description:
      "Deposits, balance, cancellations, permits and insurance for trips booked with Kanyonyi Expeditions.",
  },
  "/privacy": {
    title: "Privacy Notice",
    description:
      "How Kanyonyi Expeditions collects, uses and protects the details you share when you enquire or book.",
  },
} satisfies Record<string, PageMeta>;

export type MetaPath = keyof typeof meta;

/** The suffix the root layout's title template appends. */
export const titleSuffix = " | Kanyonyi";
