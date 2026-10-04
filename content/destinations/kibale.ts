import type { Destination } from "@/types/content";

// docs/copy/05-destinations.md, Kibale National Park. The copy has no closing body or
// "Good to know" for Kibale (plan.md gap G9), so neither is invented.

export const kibale = {
  slug: "kibale",
  name: "Kibale National Park",
  shortName: "Kibale",
  cardName: "Kibale",
  region: "Western Uganda, near Fort Portal",
  cardLine: "Uganda's best chimpanzee tracking, and 13 primate species in all.",
  hub: { forLine: "Chimpanzees and forest primates", driveFromKampala: "5 to 6 hours" },
  hero: {
    summary:
      "A tall, moist forest near Fort Portal with 13 primate species, and the most reliable place in Uganda to track chimpanzees.",
    keyFacts: ["776 km²", "13 primate species", "Near Fort Portal and the crater lakes"],
    image: { id: "destination-kibale" },
  },
  atAGlance: [
    { label: "Known for", value: "Chimpanzee tracking" },
    { label: "Size", value: "776 square kilometres" },
    { label: "Altitude", value: "1,100 to 1,600 metres" },
    {
      label: "Primates",
      value:
        "13 species, including chimpanzees, Ugandan red colobus, black-and-white colobus and L'Hoest's monkey",
    },
    { label: "Birds", value: "More than 300 species" },
    { label: "Drive from Kampala", value: "5 to 6 hours" },
    { label: "Best time", value: "All year; drier June to September and December to February" },
  ],
  whyGo: [
    "Chimpanzees are loud, quick and social, and a morning with them is nothing like an hour with gorillas. You often hear a community before you see it: pant-hoots rolling through the canopy, drumming on tree buttresses. Then they come down to the ground, and you're following them through the undergrowth as they move between fig trees.",
    "Kibale also works as a base. The crater lakes around Fort Portal are some of the most beautiful countryside in Uganda, and Queen Elizabeth is about three hours south.",
  ],
  activities: [
    {
      name: "Chimp tracking",
      notes: [
        "Permit USD 250 in 2026 (USD 200 in April, May and November), USD 300 from 1 January 2027",
        "Minimum age 12",
      ],
      body: "Morning or afternoon walks from the Kanyanchu visitor centre with a ranger. Tracking takes 2 to 4 hours, with one hour once you reach the chimps.",
    },
    {
      name: "Chimpanzee habituation experience",
      body: "Most of a day with a community as it is habituated. Limited places, booked well ahead.",
    },
    {
      name: "Bigodi Wetland Sanctuary",
      body: "A community-run swamp walk on boardwalks just outside the park. Good for red colobus, grey-cheeked mangabey and birds such as the great blue turaco. Fees support local schools and projects.",
    },
    {
      name: "Crater lakes",
      body: "Walks and viewpoints around the volcanic crater lakes between Kibale and Fort Portal.",
    },
  ],
  whenToGo:
    "Chimp tracking runs all year. In the wetter months (March to May and October to November) trails are muddier, but the forest is full of fruit and chimps are often easier to find.",
  gettingThere:
    "5 to 6 hours by road from Kampala through Mubende and Fort Portal. About 3 hours north of Queen Elizabeth, so most trips pair the two.",
  faqs: [
    {
      question: "Is chimp tracking harder than gorilla trekking?",
      answer:
        "Usually easier. Kibale's trails are flatter, but chimps move fast, so expect to walk briskly and sometimes leave the trail.",
    },
    {
      question: "Can we see chimps somewhere else?",
      answer:
        "Yes, in Kyambura Gorge in Queen Elizabeth National Park. It's a beautiful sunken forest, but its small community is harder to find. For a reliable chimp sighting, Kibale is the better choice.",
    },
  ],
  close: {
    heading: "Chimps are best in the morning",
    button: { label: "Plan a trip to Kibale", target: "enquiry" },
  },
  sameAs: ["https://en.wikipedia.org/wiki/Kibale_National_Park"],
} satisfies Destination;
