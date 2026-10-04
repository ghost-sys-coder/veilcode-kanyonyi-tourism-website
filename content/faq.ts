import type { Faq } from "@/types/content";

// /faq copy, docs/copy/09-faq.md. Answers marked † in the copy carry usesRegisteredFact,
// which shows the "Checked" stamp at the bottom of the page.

export interface FaqGroup {
  heading: string;
  items: Faq[];
}

export const faqPage = {
  h1: "Questions travellers ask us",
  lede: "Grouped by topic. If yours isn't here, message us on WhatsApp.",
  stamp: "Checked 4 October 2026. Rules and prices can change; we confirm them in your quote.",
};

export const faqGroups: FaqGroup[] = [
  {
    heading: "Planning",
    items: [
      {
        question: "How far ahead should we book?",
        answer:
          "For July, August and the Christmas period, four to six months ahead, because gorilla permits for popular sectors sell out. For other months, two to three months is usually enough. Shorter notice is often possible; ask.",
      },
      {
        question: "Can we change the itinerary?",
        answer:
          "Yes. Every trip on this site is a starting point. Add nights, swap a lodge, fly instead of driving, add Lake Mburo or a second gorilla trek.",
      },
      {
        question: "Do you run group departures?",
        answer:
          "Most of our trips are private, for your own group. If you're travelling alone or as a couple and would like to share the cost, ask and we'll tell you if another small group is going on similar dates.",
      },
      {
        question: "Can we travel with children?",
        answer:
          "Yes. Gorilla trekking is 15 and over, and chimp tracking 12 and over, but game drives, boat trips and most walks have no age limit. Murchison Falls is especially good for families.",
        usesRegisteredFact: true,
      },
    ],
  },
  {
    heading: "Money",
    items: [
      {
        question: "How do we pay?",
        answer:
          "A 30% deposit plus the full cost of any gorilla or chimp permits confirms your trip, because the Uganda Wildlife Authority requires permits to be paid in full when booked. The balance is due 60 days before you arrive. You can pay by bank transfer in USD or by card (a processing fee applies). Residents can also pay in UGX by MTN or Airtel Mobile Money.",
        usesRegisteredFact: true,
      },
      {
        question: "What isn't included in the price?",
        answer:
          "International flights, your visa, tips, drinks, porters on treks, travel insurance and optional activities. Each tour page lists exactly what's included and what isn't.",
      },
      {
        question: "How much should we tip?",
        answer:
          "Tipping is appreciated, not required. As a guide: USD 15 to 20 per traveller for the gorilla-trek ranger team, USD 5 to 10 for a porter on top of their fee, and for your driver-guide, whatever reflects the trip you had. Many travellers give around USD 15 to 25 per day from the group.",
      },
      {
        question: "Can we pay the balance in cash on arrival?",
        answer:
          "No. For your security and ours, the balance is paid by bank transfer, card or Mobile Money before you travel.",
      },
    ],
  },
  {
    heading: "Entry and health",
    items: [
      {
        question: "Do we need a visa?",
        answer:
          "Most visitors need one. Apply online for the Uganda e-visa (USD 50, single entry) before you travel. If you're also visiting Kenya and Rwanda, the East Africa Tourist Visa (USD 100) covers all three countries.",
        usesRegisteredFact: true,
      },
      {
        question: "Do we need a yellow fever certificate?",
        answer:
          "On 2 October 2026, Uganda's immigration directorate said a yellow fever certificate is no longer required for entry. Some airlines and foreign government websites still list it, so check with your airline before flying and carry your certificate if you have one.",
        usesRegisteredFact: true,
      },
      {
        question: "What about malaria?",
        answer:
          "Malaria is present in Uganda. See a travel clinic about antimalarial tablets at least six weeks before you travel, and use repellent in the evenings.",
      },
      {
        question: "Is Uganda safe for travellers?",
        answer:
          "Our routes run through national parks and towns that receive visitors all year, and your guide is with you throughout. Check your own government's travel advice for Uganda before you book. We brief every traveller on current local advice before they arrive.",
      },
    ],
  },
  {
    heading: "On the trip",
    items: [
      {
        question: "What vehicle will we travel in?",
        answer:
          "A 4x4 safari vehicle (usually a Toyota Land Cruiser) with a pop-up roof, charging points, a cool box for water, and a window seat for every guest.",
      },
      {
        question: "What are the lodges like?",
        answer:
          "Our standard trips use comfortable mid-range lodges with en-suite rooms, hot water and good food. We name your exact lodges in your quote once we've checked availability. Upgrades to luxury lodges are available on every route.",
      },
      {
        question: "Is there Wi-Fi and phone signal?",
        answer:
          "Most lodges have Wi-Fi in the main area, sometimes slow. Mobile signal is good in towns and patchy in parks. A local SIM card from MTN or Airtel, bought at Entebbe airport with your passport, is the easiest way to stay connected.",
      },
      {
        question: "What if someone gets ill or injured?",
        answer:
          "Your guide carries a first-aid kit and knows the nearest clinics and hospitals on every route. For anything serious, evacuation to Kampala is by road or air, which is why travel insurance with medical evacuation cover is a condition of booking.",
      },
    ],
  },
];
