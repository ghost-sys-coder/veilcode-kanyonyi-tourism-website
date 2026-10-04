import type { SiteConfig } from "@/types/content";

// Operator identity, navigation and footer. Copy from docs/copy/02-global.md, word for word.

export const site = {
  operator: {
    name: "Kanyonyi Expeditions",
    shortName: "Kanyonyi",
    logoText: "Kanyonyi",
    logoSubline: "Expeditions · Uganda",
    brandLine: "Private safaris and gorilla treks across Uganda, planned from Kampala.",
    nameStory:
      "Kanyonyi comes from *akanyonyi*, Luganda for a small bird. Guides spot them first and move quietly to see them. We try to travel the same way.",
  },
  nav: [
    { label: "Tours", href: "/tours" },
    { label: "Destinations", href: "/destinations" },
    { label: "Gorilla permits", href: "/guides/uganda-gorilla-permits" },
    { label: "When to go", href: "/guides/best-time-to-visit-uganda" },
    { label: "About", href: "/about" },
  ],
  headerCta: { label: "Plan my trip", href: "/plan-your-trip" },
  footer: {
    columns: [
      {
        title: "Tours",
        links: [
          { label: "Gorilla trekking", href: "/tours/3-day-bwindi-gorilla-trek" },
          { label: "Primates and savannah", href: "/tours/7-day-primates-and-savannah" },
          { label: "Classic Uganda", href: "/tours/10-day-classic-uganda" },
          { label: "Murchison Falls", href: "/tours/4-day-murchison-falls-safari" },
          { label: "All tours", href: "/tours" },
        ],
      },
      {
        title: "Plan",
        links: [
          { label: "Gorilla permits", href: "/guides/uganda-gorilla-permits" },
          { label: "Best time to visit", href: "/guides/best-time-to-visit-uganda" },
          { label: "What to pack", href: "/guides/what-to-pack-gorilla-trekking-safari" },
          { label: "FAQ", href: "/faq" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About us", href: "/about" },
          { label: "Booking terms", href: "/booking-terms" },
          { label: "Privacy", href: "/privacy" },
        ],
      },
    ],
    contact: {
      title: "Contact",
      email: "Email: replies come from our team within one working day",
      office: {
        live: "Office: Plot 00, Kololo, Kampala",
        demo: "Office: Kololo, Kampala (sample address)",
      },
      hours: "Hours: Monday to Saturday, 8am to 8pm EAT",
    },
    licenceLine: {
      live: "Registered with the Uganda Tourism Board, licence no. 0000. Member of the Association of Uganda Tour Operators (AUTO).",
      demo: "Licence and association details appear here on a live site.",
    },
    bottomLine: {
      // The copy gives the demo line only; the live line drops the demo credit.
      live: "© 2026 Kanyonyi Expeditions",
      demo: "© 2026 Kanyonyi Expeditions · Demo built by VeilCode Studio",
    },
    cookieSettingsLabel: "Cookie settings",
  },
  whatsapp: {
    demoPrefill: "Hi, I'm interested in the Kanyonyi demo site.",
    tourPrefillTemplate: "Hi, I'm interested in the {tour} for {month}. Can you help?",
    replyHours: "Usually replies within an hour, 8am to 8pm Kampala time (EAT).",
  },
  currency: {
    ugxPerUsd: 3960,
    setOn: "2026-10-02",
    labels: { usd: "USD", ugx: "UGX" },
    tooltip:
      "Prices converted at UGX 3,960 to USD 1, set 2 October 2026. Your quote is issued in USD.",
  },
  demoNotice: {
    text: "Demo site. Kanyonyi Expeditions is a fictional operator built by VeilCode Studio to show what a tour operator website can do. Trip prices are sample figures; park and permit facts are real and dated.",
    linkLabel: "See who built this",
    linkHref: "https://veilcode.studio",
  },
  locale: "en-GB",
  timeZone: "Africa/Kampala",
} satisfies SiteConfig;
