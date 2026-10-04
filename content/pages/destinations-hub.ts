// /destinations page copy, docs/copy/05-destinations.md "Destinations hub".
// The per-park table rows come from each destination's `hub` field.

export const destinationsHub = {
  eyebrow: "Destinations",
  h1: "Where we go in Uganda",
  intro:
    "Four national parks cover most of what travellers come to Uganda for: mountain gorillas, chimpanzees, savannah wildlife and the Nile. They sit in a rough loop through the west of the country, and most trips join two or more of them.",
  // No map asset exists yet (plan.md gap G7): the caption sits above the drive-time table.
  mapCaption:
    "Drive times are from Kampala. Bwindi is the furthest, at 8 to 9 hours, or about 2 hours by scheduled flight.",
  tableColumns: ["Destination", "For", "Drive from Kampala"],
  close: { lead: "Not sure which parks fit your days?", button: "Plan my trip" },
} as const;
