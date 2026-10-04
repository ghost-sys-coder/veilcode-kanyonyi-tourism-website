import type { Destination } from "@/types/content";

// docs/copy/05-destinations.md, Murchison Falls National Park.

export const murchisonFalls = {
  slug: "murchison-falls",
  name: "Murchison Falls National Park",
  shortName: "Murchison Falls",
  cardName: "Murchison Falls",
  region: "Northwest Uganda, on the Victoria Nile where it reaches Lake Albert",
  cardLine: "The Nile forced through a 7-metre gap, with giraffe and elephant on the plains above it.",
  hub: { forLine: "The falls, giraffe, elephant, the Nile", driveFromKampala: "5 to 6 hours" },
  hero: {
    summary:
      "Uganda's largest national park, cut in two by the Nile. At its heart, the whole river forces itself through a gorge seven metres wide.",
    keyFacts: ["3,893 km²", "Uganda's largest national park", "Falls drop 43 metres"],
    image: { id: "destination-murchison-falls" },
  },
  atAGlance: [
    { label: "Known for", value: "The falls, boat trips on the Nile, savannah game drives" },
    { label: "Size", value: "3,893 square kilometres" },
    {
      label: "Wildlife",
      value:
        "76 mammal species, including Rothschild's giraffe, elephant, lion, buffalo, hippo and Uganda kob",
    },
    { label: "Birds", value: "About 450 species, including the shoebill in the Nile delta" },
    { label: "Established", value: "1952" },
    { label: "Drive from Kampala", value: "5 to 6 hours (about 6 with a stop at Ziwa Rhino Sanctuary)" },
    { label: "Best time", value: "December to February and June to September" },
  ],
  whyGo: [
    "For the falls first. The Victoria Nile, already a big river, is squeezed into a rock gap about seven metres wide and drops 43 metres. Standing at the top you hear it before you see it, and the spray soaks the path.",
    "Then for the wildlife. North of the river, the Buligi plains hold giraffe, elephant, buffalo, large herds of Uganda kob and the lions that follow them. Below the falls, the river is thick with hippos and crocodiles. Where the Nile enters Lake Albert, the papyrus delta is one of Uganda's best places to see a shoebill.",
  ],
  activities: [
    {
      name: "Boat trip to the foot of the falls",
      body: "About three hours upstream from Paraa, past hippos, crocodiles and riverbank elephants, to the bottom of the falls.",
    },
    {
      name: "Top of the Falls walk",
      body: "A short, steep path to the edge of the gorge. Go in the afternoon after the boat trip.",
    },
    {
      name: "Game drives north of the Nile",
      body: "Crossing by ferry at Paraa to the Buligi plains. Dawn drives are best.",
    },
    {
      name: "Nile delta boat trip",
      body: "An early trip downstream to the Lake Albert delta, mainly for the shoebill.",
    },
    {
      name: "Ziwa Rhino Sanctuary (on the way)",
      body: "Rhinos were wiped out in Uganda by 1982. At Ziwa, a breeding herd of southern white rhinos is being used to bring them back, and you track them on foot with a ranger.",
    },
  ],
  whenToGo:
    "The dry months are best for game drives. From March to May the grass grows tall and some tracks become hard to drive, but the boat trips run all year.",
  gettingThere: "About three hours north to Masindi, then roughly 90 minutes into the park. Ziwa is on the way.",
  goodToKnow: [
    "Oil development is under way in parts of the park north of the Nile, including near some game-drive areas. Most tracks remain open; your guide plans routes around active work areas.",
    "Tsetse flies are active in some wooded areas. Wear light-coloured clothing and insect repellent.",
  ],
  faqs: [
    {
      question: "Is Murchison good for a first safari?",
      answer:
        "Yes, especially for families or anyone not trekking gorillas. Big animals, boat trips and short walks, without the long drive southwest.",
    },
    {
      question: "Can we combine Murchison with gorillas?",
      answer: "Yes, on the 10-Day Classic Uganda. The drive from Murchison south to Kibale takes about seven hours.",
    },
  ],
  close: {
    heading: "The Nile at its most violent",
    button: { label: "Plan a trip to Murchison Falls", target: "enquiry" },
  },
  sameAs: ["https://en.wikipedia.org/wiki/Murchison_Falls_National_Park"],
} satisfies Destination;
