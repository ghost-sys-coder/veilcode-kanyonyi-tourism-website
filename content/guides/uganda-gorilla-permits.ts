import type { Guide } from "@/types/content";

// docs/copy/06-guides.md, Guide 1. The price table renders from content/facts.ts.

export const gorillaPermitsGuide = {
  slug: "uganda-gorilla-permits",
  title: "Uganda gorilla permits: prices, rules and how to book (2026 and 2027)",
  h1: "Uganda gorilla permits: prices, rules and how to book",
  cardLine: "What a permit costs, what it includes, the 2026 payment rule change, and when to book.",
  lede: "A gorilla permit is a dated ticket from the Uganda Wildlife Authority for one person to spend one hour with one habituated gorilla family. It is the most expensive and the scarcest part of a gorilla trip, so it decides everything else. This guide covers what it costs, what changed in 2026, and how to make sure you get one.",
  jumpLinks: [
    { id: "prices", label: "Prices" },
    { id: "what-the-permit-includes", label: "What the permit includes" },
    { id: "how-to-book", label: "How to book" },
    { id: "the-2026-payment-rule", label: "The 2026 payment rule" },
    { id: "low-season-permits", label: "Low-season permits" },
    { id: "cancellations-and-illness", label: "Cancellations and illness" },
    { id: "uganda-or-rwanda", label: "Uganda or Rwanda" },
    { id: "habituation-experience", label: "Habituation experience" },
  ],
  sections: [
    {
      id: "prices",
      heading: "Prices in 2026 and 2027",
      blocks: [{ type: "permitTable", columns: "guide" }],
    },
    {
      id: "what-the-permit-includes",
      heading: "What the permit includes",
      blocks: [
        {
          type: "list",
          items: [
            "Entry to Bwindi Impenetrable National Park for the day of your trek",
            "A ranger-led trek with trackers who locate the family before you set off",
            "One hour with the gorillas once your group reaches them",
            "A group of no more than eight visitors per family per day",
          ],
        },
        {
          type: "paragraph",
          text: "It does not include the porter (around USD 20, paid on the day), transport to the park, or accommodation.",
        },
      ],
    },
    {
      id: "how-to-book",
      heading: "How to book",
      blocks: [
        {
          type: "paragraph",
          text: "Permits are sold by the Uganda Wildlife Authority, either directly or through licensed tour operators. Most travellers book through their operator because the permit date has to line up with transport, a lodge in the right sector, and the rest of the trip.",
        },
        {
          type: "orderedList",
          items: [
            "**Choose your dates, with one or two alternatives.** In July, August and the Christmas period, permits in the most popular sectors can sell out four to six months ahead.",
            "**Your operator checks availability by sector.** Bwindi has four trekking sectors (Buhoma, Ruhija, Rushaga and Nkuringo), and more than 20 habituated families. Sectors are hours apart by road, so the permit decides where you stay.",
            "**Pay for the permit in full.** See the 2026 rule below.",
            "**Receive your permit confirmation.** We send you the Uganda Wildlife Authority confirmation with your name and date. Bring your passport on trek day; it must match the permit.",
          ],
        },
      ],
    },
    {
      id: "the-2026-payment-rule",
      heading: "The 2026 payment rule",
      blocks: [
        {
          type: "paragraph",
          text: "Since **1 March 2026**, the Uganda Wildlife Authority requires gorilla and chimpanzee permits to be paid in full at the time of booking. Before then, operators could hold permits for a short period while the traveller paid. That hold no longer exists.",
        },
        {
          type: "paragraph",
          text: 'What this means for you: when you confirm a trip with us, you pay the full permit cost together with your 30% trip deposit. We buy the permit the same day. If an operator offers to "hold" a permit for you without payment, ask how.',
        },
      ],
    },
    {
      id: "low-season-permits",
      heading: "Low-season permits (April, May and November)",
      blocks: [
        {
          type: "paragraph",
          text: "In 2026, permits for April, May and November cost USD 600 for foreign non-residents and USD 500 for foreign residents. These are the wettest months: trails are muddier, but the forest is quieter and lodges often have rooms.",
        },
        {
          type: "paragraph",
          text: "The catch: **discounted low-season permits can't be rescheduled.** If your plans might move, a standard permit gives you more room.",
        },
      ],
    },
    {
      id: "cancellations-and-illness",
      heading: "Cancellations and illness",
      blocks: [
        {
          type: "list",
          items: [
            "Refunds on cancelled permits are set by the Uganda Wildlife Authority and depend on how far ahead you cancel. We send the current schedule with your quote, and we recommend travel insurance that covers permit costs.",
            "Gorillas share most of our DNA and catch human respiratory illnesses. If you have a cough, cold or fever on trek day, tell the ranger. You won't be allowed to trek, and the park may refund part of the permit to visitors who declare illness and have it confirmed by park staff.",
            "You'll be asked to wear a surgical mask while you're with the gorillas.",
          ],
        },
      ],
    },
    {
      id: "minimum-age",
      heading: "Minimum age",
      blocks: [
        {
          type: "paragraph",
          text: "15 on the day of the trek. The rule is applied strictly; bring passports for any teenagers.",
        },
      ],
    },
    {
      id: "uganda-or-rwanda",
      heading: "Uganda or Rwanda?",
      blocks: [
        {
          type: "paragraph",
          text: "Rwanda's gorilla permit costs USD 1,500 in 2026. Treks in Rwanda's Volcanoes National Park are usually shorter and the park is about two and a half hours by road from Kigali. Uganda's permit is roughly half the price, Bwindi has more habituated families, and a Uganda trip lets you add chimps in Kibale and savannah in Queen Elizabeth on the same route. Bwindi's southern sectors are also about 3 to 4 hours by road from Kigali, so some travellers fly into Rwanda and trek in Uganda.",
        },
      ],
    },
    {
      id: "habituation-experience",
      heading: "The gorilla habituation experience",
      blocks: [
        {
          type: "paragraph",
          text: "Instead of one hour, spend up to four hours with a gorilla family that is still being habituated to people, working alongside the researchers and trackers. It costs USD 1,500 for foreign non-residents in 2026 and USD 1,800 from 1 January 2027, and is offered in the southern sectors. Places are very limited.",
        },
      ],
    },
  ],
  datePublished: "2026-10-04",
  dateModified: "2026-10-04",
  author: "Kanyonyi Expeditions planning team",
  image: { id: "guide-uganda-gorilla-permits" },
  close: {
    heading: "Check availability for your dates",
    body: "Send us your dates, with a second choice if you have one. We'll check every sector and reply within one working day.",
    button: { label: "Check permit availability", target: "enquiry" },
  },
  related: [
    { kind: "tour", slug: "3-day-bwindi-gorilla-trek", label: "3-Day Bwindi Gorilla Trek" },
    { kind: "destination", slug: "bwindi", label: "Bwindi Impenetrable National Park" },
    { kind: "guide", slug: "what-to-pack-gorilla-trekking-safari", label: "What to pack for a gorilla trek" },
  ],
} satisfies Guide;
