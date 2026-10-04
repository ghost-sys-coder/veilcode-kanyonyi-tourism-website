// Homepage copy from docs/copy/03-home.md, word for word, in section order.
// Tour cards, destination cards, the permit table and month notes come from their own content files.

export const home = {
  hero: {
    eyebrow: "Kampala-based · Private and small-group trips",
    h1: "Private gorilla treks and safaris in Uganda",
    lede: "Groups of up to six. One driver-guide from Entebbe arrivals to your flight home. Quotes that show every permit, park fee and lodge as its own line, so you can see exactly what you are paying for.",
    textLink: { label: "Already know your dates? Tell us and we'll plan it", href: "/plan-your-trip" },
    imageAlt:
      "A silverback mountain gorilla resting among green undergrowth in Bwindi Impenetrable Forest.",
  },

  promises: {
    srHeading: "How we run our trips",
    items: [
      {
        title: "Six seats, six windows",
        body: "No more than six guests in a vehicle, so everyone has a window and a place under the pop-up roof when the lions are on the left.",
      },
      {
        title: "One guide, start to finish",
        body: "The driver-guide who meets you at Entebbe is the one who drops you back. They know your pace by day two.",
      },
      {
        title: "Every cost on its own line",
        body: "Your quote lists each permit, park fee, lodge night and vehicle day separately. Nothing is hidden inside a package price.",
      },
      {
        title: "Real drive times",
        body: "Every itinerary day shows the hours on the road. Uganda's parks are far apart, and you should know that before you book.",
      },
    ],
  },

  signatureTrips: {
    eyebrow: "Signature trips",
    h2: "Six ways to see Uganda",
    intro:
      "Each one can start on the day you choose and can be changed: add a night, swap a lodge, fly instead of driving. These are the routes we know best.",
    link: "See all tours and compare them",
  },

  permits: {
    eyebrow: "Before you book anything else",
    h2: "The gorilla permit decides your dates",
    body: [
      "Bwindi's gorilla families can each receive eight visitors a day, and permits are sold by date. In the busiest months they sell out months ahead. That is why we confirm your permit first and build the rest of the trip around it.",
      "Since 1 March 2026, the Uganda Wildlife Authority requires permits to be paid in full when they are booked. There is no longer a free hold, so we ask for the permit cost together with your deposit.",
    ],
    link: "Read the full permit guide",
  },

  whenToGo: {
    eyebrow: "When to go",
    h2: "Every month has a reason",
    intro:
      "Uganda sits on the equator, so the seasons are about rain, not cold. Choose a month to see what it's like and which trips suit it.",
    showTrips: "Show {month} trips",
    link: "Read the month-by-month guide",
  },

  destinations: {
    eyebrow: "Where we go",
    h2: "Four parks, each for a different reason",
  },

  howItWorks: {
    eyebrow: "How it works",
    h2: "From first message to Entebbe arrivals",
    steps: [
      {
        title: "Tell us your dates",
        body: "Send an enquiry or a WhatsApp message. Within one working day you get a day-by-day plan and an itemised quote.",
      },
      {
        title: "Confirm with a deposit",
        body: "Pay 30% of the trip plus the full cost of any gorilla or chimp permits. We book the permits that day and send you the official permit confirmation.",
      },
      {
        title: "Pay the balance and travel",
        body: "The balance is due 60 days before you arrive. Your guide meets you at Entebbe arrivals with your name on a board.",
      },
    ],
    paymentMethods:
      "Bank transfer in USD, card payment (a processing fee applies), or MTN and Airtel Mobile Money for residents.",
  },

  // Demo version only: the client version embeds real reviews and has no fixed copy.
  reviews: {
    h2: "What travellers say",
    body: "On a live site, this section shows the operator's real reviews from Tripadvisor, SafariBookings or Google, pulled in with their ratings and dates. We don't write reviews for a demo.",
  },

  questions: {
    h2: "Three things people ask before booking",
    items: [
      {
        question: "Will we definitely see gorillas?",
        answer:
          "Not definitely, but very likely. Rangers send trackers out at dawn to find each habituated family before groups set off, and sightings on gorilla treks in Bwindi are extremely high. If your group doesn't find its family, ask your ranger about the park's policy on the day; we'll handle it with the park for you.",
      },
      {
        question: "How fit do I need to be?",
        answer:
          "If you can walk uphill steadily for an hour, you can do a gorilla trek. Treks take anywhere from one to six hours return, over steep and often muddy ground. Hire a porter (around USD 20): they carry your bag, help you up the steep sections, and the fee goes straight to a local family.",
      },
      {
        question: "Is Uganda safe for travellers?",
        answer:
          "Our routes run through national parks and towns that receive visitors all year, and your guide is with you throughout. Before you book, check your own government's travel advice for Uganda; we brief every traveller on current local advice before they arrive.",
      },
    ],
    link: "See all questions",
  },

  close: {
    h2: "Tell us when. We'll do the rest.",
    body: "Send your dates and who's travelling. A planner replies within one working day with a plan and a price, and there's no payment until you decide.",
    primary: "Plan my trip",
    secondary: "Chat on WhatsApp",
  },
} as const;
