import type { Guide } from "@/types/content";

// docs/copy/06-guides.md, Guide 2. No jump links in the copy for this guide.

export const bestTimeGuide = {
  slug: "best-time-to-visit-uganda",
  title: "The best time to visit Uganda, month by month",
  h1: "The best time to visit Uganda, month by month",
  cardLine: "Dry seasons, green seasons, cheaper permits, and what each month is like in each park.",
  lede: "The short answer: June to September and December to February are the driest months and the most popular. The longer answer is that every month works for gorillas and chimps, and the wetter months bring cheaper permits and quieter parks. Here's how to choose.",
  sections: [
    {
      id: "seasons",
      heading: "Uganda's seasons in one paragraph",
      blocks: [
        {
          type: "paragraph",
          text: "Uganda sits on the Equator, so temperatures change more with altitude than with the calendar. Days are warm in the savannah parks and cool in the forests of the southwest, where Bwindi climbs above 2,000 metres. What changes through the year is rain. There are two drier seasons (June to September, December to February) and two wetter ones (March to May, and October to November). Even in wet months, rain often falls as heavy afternoon showers rather than all day.",
        },
      ],
    },
    {
      id: "by-activity",
      heading: "What season means for each activity",
      blocks: [
        {
          type: "table",
          columns: ["Activity", "Drier months", "Wetter months"],
          rows: [
            [
              "Gorilla trekking",
              "Firmer, easier trails. Permits sell out first.",
              "Muddier, harder trails. Permits USD 600 in April, May, November 2026.",
            ],
            ["Chimp tracking", "Easy walking", "Plenty of fruit, chimps often easier to find"],
            ["Game drives", "Shorter grass, animals near water", "Taller grass, some tracks hard to drive in Murchison"],
            ["Boat trips", "Excellent", "Excellent"],
            ["Birding", "Good", "Best from November to April, when migrants arrive"],
            ["Photography", "Dusty light, clear mornings", "Green landscapes, dramatic skies, clean air after rain"],
          ],
        },
      ],
    },
    {
      id: "month-by-month",
      heading: "Month by month",
      blocks: [
        {
          type: "monthEntry",
          month: "January",
          text: "Dry and warm, and one of the best months for every activity on our trips. Christmas and New Year departures from Europe make the first week busy. Book four to six months ahead.",
        },
        {
          type: "monthEntry",
          month: "February",
          text: "Still dry, and the hottest month in the savannah parks. Excellent for game drives in Murchison and Queen Elizabeth. Gorilla permits are at the standard rate.",
        },
        {
          type: "monthEntry",
          month: "March",
          text: "The long rains usually begin in the second half of the month. Parks get quieter and greener. Permits are at the standard rate, so this is a good month to travel if you want space without the wettest weather.",
        },
        {
          type: "monthEntry",
          month: "April",
          text: "The wettest month in most parks. Gorilla permits drop to USD 600 for non-residents in 2026, but those permits can't be moved to another date. Some lodges close for maintenance; we'll tell you which are open.",
        },
        {
          type: "monthEntry",
          month: "May",
          text: "Wet, quiet and discounted. Forest trails can be very muddy, so good boots, gaiters and a porter matter more now. Rain often falls in heavy afternoon bursts.",
        },
        {
          type: "monthEntry",
          month: "June",
          text: "The dry season begins. Trails firm up, grass shortens and game drives improve. From mid-June, European summer holidays fill lodges and permits.",
        },
        {
          type: "monthEntry",
          month: "July",
          text: "Peak month. Permits for July and August are often the first to sell out. If these are your only possible months, decide on your dates first and confirm permits early. Everything else can follow.",
        },
        {
          type: "monthEntry",
          month: "August",
          text: "Peak month, with excellent game viewing as animals stay near permanent water. Book as early as you can.",
        },
        {
          type: "monthEntry",
          month: "September",
          text: "Still dry, and a little quieter than August. A good balance of weather and availability.",
        },
        {
          type: "monthEntry",
          month: "October",
          text: "The short rains bring afternoon showers, with mornings often clear. Migrant birds start to arrive. Good value: standard permit prices, but the parks are quieter than in the dry season.",
        },
        {
          type: "monthEntry",
          month: "November",
          text: "Short rains, discounted permits (USD 600 in 2026) and fewer vehicles at sightings. Good for birding.",
        },
        {
          type: "monthEntry",
          month: "December",
          text: "Rain eases through the month and the dry season returns. The Christmas fortnight books up early, often by the middle of the year.",
        },
      ],
    },
    {
      id: "our-advice",
      heading: "Our advice",
      blocks: [
        {
          type: "list",
          items: [
            "**If you can only travel in July or August,** book early and confirm your permit before anything else.",
            "**If your dates are flexible and budget matters,** consider late May or November: discounted permits, fewer vehicles, and rain that usually falls in the afternoon.",
            "**If you're doing a long trip with lots of game drives,** aim for January, February or June to September.",
            "**If birds are your reason,** November to April.",
          ],
        },
      ],
    },
  ],
  datePublished: "2026-10-04",
  dateModified: "2026-10-04",
  author: "Kanyonyi Expeditions planning team",
  factStamp: "Checked 4 October 2026 against Uganda Wildlife Authority and Uganda immigration sources. Prices and rules can change; we confirm current rates in your quote.",
  image: { id: "guide-best-time-to-visit-uganda" },
  close: {
    heading: "Tell us your month",
    body: "We'll tell you honestly what the weather is likely to be in the parks you're considering, and which trips fit.",
    button: { label: "Plan my trip", target: "enquiry" },
  },
  related: [
    { kind: "guide", slug: "uganda-gorilla-permits", label: "Gorilla permits explained" },
    { kind: "page", href: "/tours", label: "All tours" },
  ],
} satisfies Guide;
