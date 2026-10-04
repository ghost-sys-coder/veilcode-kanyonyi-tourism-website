import type { Destination } from "@/types/content";

// docs/copy/05-destinations.md, Queen Elizabeth National Park.

export const queenElizabeth = {
  slug: "queen-elizabeth",
  name: "Queen Elizabeth National Park",
  shortName: "Queen Elizabeth",
  cardName: "Queen Elizabeth",
  region: "Western Uganda, between Lake George and Lake Edward, on the Equator",
  cardLine: "Savannah, the Kazinga Channel's hippos and buffalo, and the tree-climbing lions of Ishasha.",
  hub: { forLine: "Savannah, boat trips, tree-climbing lions", driveFromKampala: "6 to 7 hours" },
  hero: {
    summary:
      "Savannah, crater lakes and the Kazinga Channel, with tree-climbing lions in the south. Uganda's most varied park, crossing the Equator.",
    keyFacts: ["1,978 km²", "95 mammal species", "More than 600 bird species"],
    image: { id: "destination-queen-elizabeth" },
  },
  atAGlance: [
    { label: "Known for", value: "Kazinga Channel boat trips, the Ishasha tree-climbing lions, game drives" },
    { label: "Size", value: "1,978 square kilometres" },
    {
      label: "Wildlife",
      value: "95 mammal species, including lion, leopard, elephant, buffalo, hippo and Uganda kob",
    },
    { label: "Birds", value: "More than 600 species" },
    { label: "Established", value: "1952" },
    { label: "Drive from Kampala", value: "6 to 7 hours" },
    {
      label: "Best time",
      value: "June to September and December to February for game drives; the boat trip runs all year",
    },
  ],
  whyGo: [
    "Variety, in one park. In a single day you can watch lions hunting kob on the Kasenyi plains at dawn, take a boat along the Kazinga Channel past hundreds of hippos in the afternoon, and look down into a crater lake on the way back. In the far south, the Ishasha sector is one of very few places where lions regularly rest in the branches of fig trees.",
  ],
  activities: [
    {
      name: "Kazinga Channel boat trip",
      body: "A two-hour trip along the channel that links Lake George and Lake Edward. Hippos, buffalo and elephants at the water's edge, Nile crocodiles, and water birds at close range.",
    },
    {
      name: "Game drives on the Kasenyi plains",
      body: "Best at dawn, when lions are active and the kob are on the open grass.",
    },
    {
      name: "Ishasha sector",
      body: "Looking for lions in the fig trees, usually in the heat of the day. Ishasha lies on the way to Bwindi, so it fits naturally on gorilla trips.",
    },
    {
      name: "Kyambura Gorge",
      body: "Chimp tracking in a forested gorge cut into the savannah. Fewer chimps than Kibale and harder to find; we recommend it as a second primate walk, not a first.",
    },
  ],
  whenToGo:
    "The dry months (June to September, December to February) are best for game drives, because animals stay near water and grass is shorter. The boat trip is good all year.",
  gettingThere:
    "About 3 hours south of Kibale, 6 to 7 hours from Kampala. Ishasha is a further 2 to 3 hours south, and Bwindi 3 to 5 hours on from there.",
  goodToKnow: [
    "Tree-climbing lions are not seen on every visit. They move between trees and sometimes rest out of sight.",
    "The park is crossed by public roads, so you'll pass villages, fishing settlements and the occasional truck. It's a lived-in landscape.",
  ],
  faqs: [
    {
      question: "Is Queen Elizabeth worth visiting if we're also going to Kenya or Tanzania?",
      answer:
        "Go for the channel and the combination with Kibale and Bwindi, not to out-do the Serengeti for herds. The boat trip is one of the best wildlife boat trips in East Africa.",
    },
    {
      question: "How many days do we need?",
      answer: "Two nights: one near the channel and Kasenyi, one in Ishasha if you're heading on to Bwindi.",
    },
  ],
  close: {
    heading: "Combine it with chimps and gorillas",
    button: { label: "Plan a trip to Queen Elizabeth", target: "enquiry" },
  },
  sameAs: ["https://en.wikipedia.org/wiki/Queen_Elizabeth_National_Park"],
} satisfies Destination;
