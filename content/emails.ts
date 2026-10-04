// Approved email copy, transcribed from docs/copy/11-emails-and-meta.md.
export const emails = {
  traveller: {
    live: {
      fromName: "Kanyonyi Expeditions",
      subject: "Your Uganda trip enquiry ({reference})",
      preheader: "A planner will reply within one working day with a plan and a quote.",
      intro: "Thank you for your enquiry. Here's what you sent us:",
      nextHeading: "What happens next",
      steps: [
        "We check gorilla and chimp permit availability and lodges for your dates.",
        "Within one working day, you'll receive a day-by-day plan and an itemised quote.",
        "You tell us what to change. There's no payment until you're happy with it.",
      ],
      contact: "If you'd like to talk sooner, reply to this email or message us on WhatsApp at {number}, quoting {reference}.",
      guidesIntro: "While you wait, two guides most travellers find useful:",
      guides: [
        { label: "Gorilla permits: prices, rules and how to book", href: "/guides/uganda-gorilla-permits" },
        { label: "What to pack for a gorilla trek", href: "/guides/what-to-pack-gorilla-trekking-safari" },
      ],
      signature: ["Kanyonyi Expeditions", "Kampala, Uganda"],
    },
    demo: {
      fromName: "Kanyonyi Expeditions (demo by VeilCode Studio)",
      subject: "Your demo enquiry ({reference})",
      preheader: "This is the confirmation a real traveller would receive. Here's what happens next on a live site.",
      intro: 'You\'ve just tested the enquiry flow on the Kanyonyi Expeditions demo. This email is exactly what a traveller would receive, a minute after pressing "Send enquiry".',
      nextHeading: "On a live site, what happens next",
      steps: [
        "The operator's team is notified instantly, with everything above.",
        "The enquiry is saved to their records, so nothing gets lost in an inbox.",
        "Their planner replies with a day-by-day plan and an itemised quote.",
      ],
      demoHeading: "On this demo",
      demoBody: "Your enquiry reached VeilCode Studio, the team that built this site. Frank will reply to you personally. If you run a tour company, a clinic, a law firm or any business that takes enquiries online, reply to this email and tell us what you'd want your own site to do.",
      signature: ["Frank Tamale", "VeilCode Studio · Kampala"],
      contactPrefix: "WhatsApp:",
      contactSuffix: "· veilcode.studio",
    },
  },
  greeting: "Hello {firstName},",
  labels: { reference: "Reference", trip: "Trip", month: "Travel month", travellers: "Travellers", estimate: "Estimated total" },
  liveEstimateNote: "(standard-season price; your quote confirms the exact figure)",
  under15Suffix: ", including someone under 15",
  operator: {
    subject: "New enquiry {reference}: {tourName}, {month}, {n} travellers",
    heading: "New enquiry {reference}",
    received: "Received {dateTime}",
    labels: { trip: "Trip:", month: "Month:", travellers: "Travellers:", under15: "Under 15:", residency: "Residency:", estimate: "Estimate:", name: "Name:", email: "Email:", whatsapp: "WhatsApp:", notes: "Notes:", source: "Source page:", reply: "Reply by:" },
    notGiven: "not given",
  },
} as const;
