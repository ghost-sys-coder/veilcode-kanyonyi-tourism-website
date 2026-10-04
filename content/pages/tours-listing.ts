// /tours page copy, docs/copy/04-tours.md "Tours listing page". Word for word.

export const toursListing = {
  eyebrow: "All tours",
  h1: "Uganda tours, from a weekend on the Nile to ten days across the country",
  intro:
    "Every trip is private or small-group (up to six guests), starts on the date you choose, and can be changed. Prices are per person with two people sharing, for travel until 31 December 2026, and include gorilla and chimp permits where the trip has them.",
  filters: {
    all: "All",
    "gorillas-and-chimps": "Gorillas and chimps",
    "savannah-wildlife": "Savannah wildlife",
    "nile-and-adventure": "Nile and adventure",
  },
  sort: {
    label: "Sort by",
    options: {
      recommended: "Recommended",
      shortest: "Shortest first",
      longest: "Longest first",
      price: "Price, low to high",
    },
  },
  resultsLine: "Showing {n} of 6 trips",
  resultsLineFiltered: "Showing {n} trips: {filters}",
  priceNote:
    "Group of three or more? Your price per person drops, because vehicle and guide costs are shared. Travelling alone? Ask about joining another small group or a single-traveller price.",
  callout2027: {
    title: "Travelling in 2027?",
    body: "The Uganda Wildlife Authority's new rates start on 1 January 2027. Chimp tracking in Kibale rises from USD 250 to USD 300 and the gorilla habituation experience from USD 1,500 to USD 1,800. Gorilla trekking stays at USD 800. We quote 2027 trips at the new rates.",
  },
  close: {
    heading: "Don't see your trip?",
    body: "Most of our travellers end up with a mix of these routes. Tell us how many days you have and what you most want to see, and we'll draw it up.",
    button: "Plan a custom trip",
  },
} as const;
