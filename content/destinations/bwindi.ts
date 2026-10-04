import type { Destination } from "@/types/content";

// docs/copy/05-destinations.md, Bwindi Impenetrable National Park.

export const bwindi = {
  slug: "bwindi",
  name: "Bwindi Impenetrable National Park",
  shortName: "Bwindi",
  cardName: "Bwindi Impenetrable",
  region:
    "Southwest Uganda (Kanungu, Kabale and Kisoro districts), on the border with the Democratic Republic of Congo",
  cardLine: "Mountain gorillas in steep, ancient rainforest in Uganda's southwest.",
  hub: { forLine: "Mountain gorillas", driveFromKampala: "8 to 9 hours" },
  hero: {
    summary:
      "A steep, wet, very old rainforest in Uganda's southwest, and home to almost half of the world's mountain gorillas.",
    keyFacts: ["321 km²", "1,190 to 2,607 m above sea level", "UNESCO World Heritage Site since 1994"],
    image: { id: "destination-bwindi" },
  },
  atAGlance: [
    { label: "Known for", value: "Mountain gorilla trekking" },
    { label: "Size", value: "321 square kilometres" },
    { label: "Altitude", value: "1,190 to 2,607 metres" },
    { label: "Mountain gorillas", value: "459 counted in the 2018 census, out of 1,063 worldwide" },
    {
      label: "Other wildlife",
      value: "10 primate species, more than 350 bird species, more than 200 butterfly species",
    },
    { label: "Trekking sectors", value: "Buhoma (north), Ruhija (east), Rushaga and Nkuringo (south)" },
    { label: "Drive from Kampala", value: "8 to 9 hours" },
    { label: "Flight from Entebbe", value: "About 2 hours to Kihihi or Kisoro airstrips" },
    { label: "Best time", value: "June to September and December to February for drier trails" },
  ],
  whyGo: [
    "Because of the gorillas, and nothing else in Uganda comes close. Each habituated family can be visited by eight people a day for one hour. You'll sit a few metres from a silverback weighing perhaps 160 kilograms as he strips leaves from a branch, and watch young gorillas tumble over each other while their mothers ignore you. Most people say the hour feels like ten minutes.",
    "The forest itself is worth the trip. It survived the last Ice Age when much of Africa's forest did not, which is why it holds so many species. Mist sits in the valleys most mornings.",
  ],
  activities: [
    {
      name: "Gorilla trekking",
      notes: ["Permit USD 800 (USD 600 in April, May, November 2026)", "Minimum age 15"],
      body: "Rangers lead groups of up to eight to a habituated family. Treks last 1 to 6 hours return, and you have one hour with the gorillas.",
    },
    {
      name: "Gorilla habituation experience",
      notes: ["Permit USD 1,500 in 2026, USD 1,800 from 2027"],
      body: "Spend up to four hours with a family that is still being habituated, alongside the researchers and trackers. Very limited places, run in the southern sectors (mainly Rushaga).",
    },
    {
      name: "Community and Batwa visits",
      body: "The Batwa lived in this forest before it became a national park in 1991, and were moved out of it without compensation. Community-led visits, run by Batwa groups themselves, explain that history and their life now. We book only those where the fee goes to the community.",
    },
    {
      name: "Forest walks and birding",
      body: "Guided walks to waterfalls and along forest trails. Birders come for Albertine Rift endemics such as the African green broadbill.",
    },
  ],
  whenToGo:
    "Gorilla trekking runs every day of the year. June to September and December to February are drier, so trails are firmer and easier. In April, May and November, permits drop to USD 600 and the forest is quieter, but trails are muddier and those discounted permits can't be rescheduled.",
  gettingThere:
    "By road, 8 to 9 hours from Kampala through Mbarara, or 3 to 4 hours from Kigali in Rwanda for the southern sectors. By air, scheduled light aircraft fly from Entebbe to Kihihi (for Buhoma and Ruhija) and Kisoro (for Rushaga and Nkuringo) in about two hours. The sectors are hours apart from each other by road, so your lodge must be near the sector your permit is for.",
  goodToKnow: [
    "The name is accurate. Trails are steep, often muddy, and can involve cutting through undergrowth. A walking stick is handed out at the start; take it.",
    "Bwindi sits at altitude, so mornings are cool. Bring a warm layer for the briefing and the evening.",
    "If you're unwell on trek day, say so. Gorillas catch human respiratory illnesses.",
  ],
  faqs: [
    {
      question: "Which Bwindi sector is best?",
      answer:
        "None is better for the gorillas themselves. Buhoma has the most lodges and the easiest access by air; Rushaga has the most families and the habituation experience; Nkuringo has the steepest treks and the best views. We choose by permit availability on your date and how you're travelling.",
    },
    {
      question: "How close do you get to the gorillas?",
      answer:
        "Close. Rangers set a minimum distance and ask you to keep it, but gorillas don't read the rules and sometimes walk past within touching distance. If that happens, stay still and let them pass.",
    },
    {
      question: "Can children trek?",
      answer:
        "Not under 15. Families with younger children often split: one adult treks while the other stays at the lodge with the children for a nature walk.",
      usesRegisteredFact: true,
    },
  ],
  close: {
    heading: "Start with the permit",
    body: "Tell us your dates and we'll check gorilla permit availability across all four sectors.",
    button: { label: "Check permit availability", target: "enquiry" },
  },
  sameAs: ["https://en.wikipedia.org/wiki/Bwindi_Impenetrable_National_Park"],
} satisfies Destination;
