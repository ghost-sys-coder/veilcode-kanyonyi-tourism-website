import type { MediaEntry } from "@/types/content";

// Image registry (docs/copy/13-photo-brief.md). S4 sources each photo and adds `photo`.
// Alt text here describes the planned shot and is rewritten to match the actual photo at
// sourcing time (plan.md gap G8): "what's in the picture and where, in one sentence".

export const media: Record<string, MediaEntry> = {
  "home-hero": {
    id: "home-hero",
    shot: 1,
    aspect: "16:9",
    alt: "A silverback mountain gorilla resting among green undergrowth in Bwindi Impenetrable Forest.",
  },
  "destination-bwindi": {
    id: "destination-bwindi",
    shot: 2,
    aspect: "16:9",
    alt: "Mist lying in the forested valleys of Bwindi Impenetrable National Park.",
  },
  "destination-kibale": {
    id: "destination-kibale",
    shot: 3,
    aspect: "16:9",
    alt: "A wild chimpanzee in the forest of Kibale National Park.",
  },
  "destination-queen-elizabeth": {
    id: "destination-queen-elizabeth",
    shot: 4,
    aspect: "16:9",
    alt: "Hippos in the water along the Kazinga Channel, Queen Elizabeth National Park.",
  },
  "destination-murchison-falls": {
    id: "destination-murchison-falls",
    shot: 5,
    aspect: "16:9",
    alt: "The Nile forcing through the narrow gorge at Murchison Falls.",
  },
  "tour-3-day-bwindi-gorilla-trek": {
    id: "tour-3-day-bwindi-gorilla-trek",
    shot: 6,
    aspect: "3:2",
    alt: "A young mountain gorilla in Bwindi Impenetrable Forest.",
  },
  "tour-4-day-murchison-falls-safari": {
    id: "tour-4-day-murchison-falls-safari",
    shot: 7,
    aspect: "3:2",
    alt: "A Rothschild's giraffe on the savannah of Murchison Falls National Park.",
  },
  "tour-4-day-kibale-chimps-and-queen-elizabeth": {
    id: "tour-4-day-kibale-chimps-and-queen-elizabeth",
    shot: 8,
    aspect: "3:2",
    alt: "A safari boat on the Kazinga Channel, Queen Elizabeth National Park.",
  },
  "tour-7-day-primates-and-savannah": {
    id: "tour-7-day-primates-and-savannah",
    shot: 9,
    aspect: "3:2",
    alt: "A lion resting in the branches of a fig tree in the Ishasha sector.",
  },
  "tour-10-day-classic-uganda": {
    id: "tour-10-day-classic-uganda",
    shot: 10,
    aspect: "3:2",
    alt: "A crater lake among green hills near Fort Portal, western Uganda.",
  },
  "tour-2-day-jinja-and-the-nile": {
    id: "tour-2-day-jinja-and-the-nile",
    shot: 11,
    aspect: "3:2",
    alt: "A raft in white water on the Nile below Jinja.",
  },
  "guide-uganda-gorilla-permits": {
    id: "guide-uganda-gorilla-permits",
    shot: 24,
    aspect: "16:9",
    alt: "Trekkers with walking sticks at a ranger briefing before a gorilla trek.",
  },
  "guide-best-time-to-visit-uganda": {
    id: "guide-best-time-to-visit-uganda",
    shot: 25,
    aspect: "16:9",
    alt: "Green hills under a rainy-season sky in western Uganda.",
  },
  "guide-what-to-pack-gorilla-trekking-safari": {
    id: "guide-what-to-pack-gorilla-trekking-safari",
    shot: 26,
    aspect: "16:9",
    alt: "Muddy walking boots, gloves and a daypack after a forest trek.",
  },
  "about-vehicle": {
    id: "about-vehicle",
    shot: 27,
    aspect: "16:9",
    alt: "A safari vehicle with its pop-up roof raised on a park track in Uganda.",
  },
};
