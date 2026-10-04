import type { MediaEntry } from "@/types/content";
import aboutVehicle from "@/public/images/about/safari-vehicle-pop-up-roof.jpg";
import bwindiHills from "@/public/images/destinations/bwindi-forest-hills.jpg";
import kibaleChimp from "@/public/images/destinations/kibale-chimpanzee.jpg";
import murchisonFalls from "@/public/images/destinations/murchison-falls-rainbow.jpg";
import queenElizabethElephant from "@/public/images/destinations/queen-elizabeth-elephant-shore.jpg";
import fortPortalHills from "@/public/images/guides/fort-portal-hills-rwenzori.jpg";
import muddyBoots from "@/public/images/guides/muddy-hiking-boots.jpg";
import trekkersBwindi from "@/public/images/guides/trekkers-bwindi-forest.jpg";
import silverback from "@/public/images/home/silverback-bwindi.jpg";
import ogBwindiHills from "@/public/images/og/bwindi-forest-hills.jpg";
import ogBoatNile from "@/public/images/og/boat-river-nile-jinja.jpg";
import ogChimpResting from "@/public/images/og/chimpanzee-resting-kibale.jpg";
import ogFortPortal from "@/public/images/og/fort-portal-hills-rwenzori.jpg";
import ogKibaleChimp from "@/public/images/og/kibale-chimpanzee.jpg";
import ogBoots from "@/public/images/og/muddy-hiking-boots.jpg";
import ogMurchison from "@/public/images/og/murchison-falls-rainbow.jpg";
import ogQueenElizabeth from "@/public/images/og/queen-elizabeth-elephant-shore.jpg";
import ogRoad from "@/public/images/og/road-green-hills-uganda.jpg";
import ogGiraffes from "@/public/images/og/rothschild-giraffes-murchison.jpg";
import ogSilverback from "@/public/images/og/silverback-bwindi.jpg";
import ogLion from "@/public/images/og/tree-climbing-lion-queen-elizabeth.jpg";
import ogTrekkers from "@/public/images/og/trekkers-bwindi-forest.jpg";
import ogYoungGorilla from "@/public/images/og/young-mountain-gorilla-bwindi.jpg";
import boatNile from "@/public/images/tours/boat-river-nile-jinja.jpg";
import chimpResting from "@/public/images/tours/chimpanzee-resting-kibale.jpg";
import roadHills from "@/public/images/tours/road-green-hills-uganda.jpg";
import giraffes from "@/public/images/tours/rothschild-giraffes-murchison.jpg";
import treeLion from "@/public/images/tours/tree-climbing-lion-queen-elizabeth.jpg";
import youngGorilla from "@/public/images/tours/young-mountain-gorilla-bwindi.jpg";

// Image registry (docs/copy/13-photo-brief.md). Sourced 4 October 2026 from Unsplash; each photo's
// location was checked on its Unsplash page. Alt text describes what the photo shows; captions
// give place and subject, and the credit "Photo: {photographer} / Unsplash" is added on render.
// Files are re-encoded at 2400px wide with metadata stripped; og/ holds 1200 × 630 crops.

const unsplash = { sourceName: "Unsplash", licence: "Unsplash License" } as const;

export const media: Record<string, MediaEntry> = {
  "home-hero": {
    id: "home-hero",
    shot: 1,
    aspect: "16:9",
    alt: "A silverback mountain gorilla resting among green undergrowth in Bwindi Impenetrable Forest.",
    caption: "Silverback mountain gorilla, Bwindi Impenetrable National Park.",
    photo: {
      src: silverback,
      og: ogSilverback,
      photographer: "Gabriel Schumacher",
      sourceUrl: "https://unsplash.com/photos/a-close-up-of-a-gorilla-in-a-forest--C8tnpEG7so",
      ...unsplash,
    },
  },
  "destination-bwindi": {
    id: "destination-bwindi",
    shot: 2,
    aspect: "16:9",
    alt: "Forested hills and valleys of Bwindi Impenetrable National Park.",
    caption: "Bwindi Impenetrable National Park.",
    photo: {
      src: bwindiHills,
      og: ogBwindiHills,
      photographer: "Bike and Boat Motorcycle Tours",
      sourceUrl: "https://unsplash.com/photos/green-trees-on-mountain-during-daytime-WJb-xJq-Ze8",
      ...unsplash,
    },
  },
  "destination-kibale": {
    id: "destination-kibale",
    shot: 3,
    aspect: "16:9",
    alt: "A chimpanzee sitting among the trees in Kibale National Park.",
    caption: "Chimpanzee, Kibale National Park.",
    photo: {
      src: kibaleChimp,
      og: ogKibaleChimp,
      photographer: "Simone Dinoia",
      sourceUrl: "https://unsplash.com/photos/chimpanzee-sitting-on-a-tree-branch-in-the-forest-zIZUrCRQjkM",
      ...unsplash,
    },
  },
  "destination-queen-elizabeth": {
    id: "destination-queen-elizabeth",
    shot: 4,
    aspect: "16:9",
    alt: "An elephant at the water's edge in Queen Elizabeth National Park.",
    caption: "Elephant at the water's edge, Queen Elizabeth National Park.",
    photo: {
      src: queenElizabethElephant,
      og: ogQueenElizabeth,
      photographer: "Simone Dinoia",
      sourceUrl: "https://unsplash.com/photos/an-elephant-stands-near-water-in-its-habitat-xxxvYWmZIAw",
      ...unsplash,
    },
  },
  "destination-murchison-falls": {
    id: "destination-murchison-falls",
    shot: 5,
    aspect: "16:9",
    alt: "A rainbow over the falls at Murchison Falls National Park.",
    caption: "Murchison Falls, Murchison Falls National Park.",
    photo: {
      src: murchisonFalls,
      og: ogMurchison,
      photographer: "Jonathan Göhner",
      sourceUrl: "https://unsplash.com/photos/a-waterfall-with-a-rainbow-in-the-middle-of-it-dB9uhIxlHyE",
      ...unsplash,
    },
  },
  "tour-3-day-bwindi-gorilla-trek": {
    id: "tour-3-day-bwindi-gorilla-trek",
    shot: 6,
    aspect: "3:2",
    alt: "A young mountain gorilla chewing leaves in Bwindi Impenetrable Forest.",
    caption: "Mountain gorilla, Bwindi Impenetrable National Park.",
    photo: {
      src: youngGorilla,
      og: ogYoungGorilla,
      photographer: "Gabriel Schumacher",
      sourceUrl: "https://unsplash.com/photos/a-close-up-of-a-gorilla-with-a-tree-in-the-background-DICiPcdLDXY",
      ...unsplash,
    },
  },
  "tour-4-day-murchison-falls-safari": {
    id: "tour-4-day-murchison-falls-safari",
    shot: 7,
    aspect: "3:2",
    alt: "Three Rothschild's giraffes walking across dry grassland in Uganda.",
    caption: "Rothschild's giraffes, Uganda.",
    photo: {
      src: giraffes,
      og: ogGiraffes,
      photographer: "Andrew S",
      sourceUrl: "https://unsplash.com/photos/brown-and-black-giraffe-standing-on-green-grass-field-during-daytime-wlix-adjMn8",
      ...unsplash,
    },
  },
  "tour-4-day-kibale-chimps-and-queen-elizabeth": {
    id: "tour-4-day-kibale-chimps-and-queen-elizabeth",
    shot: 8,
    aspect: "3:2",
    alt: "A chimpanzee resting on the forest floor in Kibale National Park.",
    caption: "Chimpanzee, Kibale National Park.",
    photo: {
      src: chimpResting,
      og: ogChimpResting,
      photographer: "Simone Dinoia",
      sourceUrl: "https://unsplash.com/photos/a-chimpanzee-sits-relaxed-amidst-greenery-9sssA1nSKe8",
      ...unsplash,
    },
  },
  "tour-7-day-primates-and-savannah": {
    id: "tour-7-day-primates-and-savannah",
    shot: 9,
    aspect: "3:2",
    alt: "Two lionesses resting along the branch of a fig tree in Queen Elizabeth National Park.",
    caption: "Tree-climbing lions, Queen Elizabeth National Park.",
    photo: {
      src: treeLion,
      og: ogLion,
      photographer: "Simone Dinoia",
      sourceUrl: "https://unsplash.com/photos/lion-rests-in-a-tree-blending-with-nature-53SNlWBasRk",
      ...unsplash,
    },
  },
  "tour-10-day-classic-uganda": {
    id: "tour-10-day-classic-uganda",
    shot: 10,
    aspect: "3:2",
    alt: "A road curving through green hills and farmland in Uganda.",
    caption: "Hill country, Uganda.",
    photo: {
      src: roadHills,
      og: ogRoad,
      photographer: "Random Institute",
      sourceUrl: "https://unsplash.com/photos/green-mountain-road-scenery-v6MSchd3bAU",
      ...unsplash,
    },
  },
  "tour-2-day-jinja-and-the-nile": {
    id: "tour-2-day-jinja-and-the-nile",
    shot: 11,
    aspect: "3:2",
    alt: "A yellow tour boat with passengers on the River Nile near Jinja.",
    caption: "River Nile, Jinja.",
    photo: {
      src: boatNile,
      og: ogBoatNile,
      photographer: "Derricks Nature Book",
      sourceUrl: "https://unsplash.com/photos/a-group-of-people-on-a-yellow-boat-on-a-river-iSGFaRTro1Q",
      ...unsplash,
    },
  },
  "guide-uganda-gorilla-permits": {
    id: "guide-uganda-gorilla-permits",
    shot: 24,
    aspect: "16:9",
    alt: "Trekkers walking through dense rainforest in Bwindi Impenetrable National Park.",
    caption: "Trekkers, Bwindi Impenetrable National Park.",
    photo: {
      src: trekkersBwindi,
      og: ogTrekkers,
      photographer: "william pietermans",
      sourceUrl: "https://unsplash.com/photos/a-group-of-people-walking-through-a-lush-green-forest-5SujvqCTuJc",
      ...unsplash,
    },
  },
  "guide-best-time-to-visit-uganda": {
    id: "guide-best-time-to-visit-uganda",
    shot: 25,
    aspect: "16:9",
    alt: "Green hills and villages below the Rwenzori Mountains near Fort Portal.",
    caption: "Near Fort Portal, with the Rwenzori Mountains beyond.",
    photo: {
      src: fortPortalHills,
      og: ogFortPortal,
      photographer: "Itote Rubombora",
      sourceUrl: "https://unsplash.com/photos/green-trees-on-mountain-during-daytime-8PF8fl6e6yE",
      ...unsplash,
    },
  },
  "guide-what-to-pack-gorilla-trekking-safari": {
    id: "guide-what-to-pack-gorilla-trekking-safari",
    shot: 26,
    aspect: "16:9",
    alt: "Muddy hiking boots on wet, grassy ground.",
    caption: "Walking boots after a wet trail.",
    photo: {
      src: muddyBoots,
      og: ogBoots,
      photographer: "Thomas Marquize",
      sourceUrl: "https://unsplash.com/photos/muddy-hiking-boots-resting-on-wet-ground-rgZMErtznRc",
      ...unsplash,
    },
  },
  "about-vehicle": {
    id: "about-vehicle",
    shot: 27,
    aspect: "16:9",
    // Photographed in Akagera, Rwanda, so the alt text and caption name no Ugandan place.
    alt: "A green safari vehicle with its pop-up roof raised.",
    caption: "Safari vehicle with a pop-up roof.",
    photo: {
      src: aboutVehicle,
      photographer: "Emmy Shingiro",
      sourceUrl: "https://unsplash.com/photos/a-green-vehicle-with-a-canopy--_rGUSzN9tI",
      ...unsplash,
    },
  },
};
