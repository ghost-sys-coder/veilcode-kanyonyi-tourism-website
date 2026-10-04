// /plan-your-trip copy, docs/copy/08-plan-your-trip.md. Word for word, including the demo
// variants chosen by NEXT_PUBLIC_DEMO_MODE. {placeholders} are filled by lib/content/format.ts.

export const planYourTrip = {
  eyebrow: "Plan your trip",
  h1: "Tell us when. We'll plan the rest.",
  lede: "Share your dates and who's travelling. Within one working day, a planner sends you a day-by-day plan and an itemised quote. No payment until you decide.",

  // Interim S6 contact body. S8 replaces the interim route with the specified form and full panel.
  interimBody: {
    live: "We adjust it until it's right. Most trips take two or three rounds.",
    demo: "Frank from VeilCode will reply personally, about the demo or about a website like this for your business.",
  },

  sidePanel: {
    live: {
      heading: "What happens next",
      steps: [
        "A planner reads your enquiry and checks permit and lodge availability for your dates.",
        "Within one working day you receive a plan and an itemised quote by email, plus a WhatsApp message so you can reply however suits you.",
        "We adjust it until it's right. Most trips take two or three rounds.",
      ],
    },
    demo: {
      heading: "This is a working demo",
      steps: [
        "Send the form and you'll get the same branded confirmation email a traveller would, within a minute.",
        "The enquiry is saved and reaches VeilCode Studio, the team that built this site.",
        "Frank from VeilCode will reply personally, about the demo or about a website like this for your business.",
      ],
    },
    preferToTalk: "Prefer to talk?",
    whatsappLabel: "Chat on WhatsApp",
    hoursLabel: "Hours:",
    hours: "Monday to Saturday, 8am to 8pm Kampala time (EAT, UTC+3)",
  },

  form: {
    fields: {
      tour: { label: "Which trip?", placeholder: "Choose a trip", custom: "Something custom" },
      travelMonth: { label: "When would you like to travel?", placeholder: "Choose a month", notSure: "Not sure yet" },
      flexibility: {
        label: "How flexible are your dates?",
        options: { fixed: "Fixed dates", "week-or-two": "Within a week or two", "any-time-that-month": "Any time that month" },
      },
      travellers: {
        label: "How many travellers?",
        decrease: "Remove a traveller",
        increase: "Add a traveller",
        readOutOne: "{n} traveller",
        readOutMany: "{n} travellers",
        atLimit: "For groups larger than 12, tell us in the notes and we'll plan it.",
      },
      anyoneUnder15: {
        label: "Is anyone under 15?",
        options: { no: "No", yes: "Yes" },
        help: "Gorilla trekking is only open to people 15 and over. We'll plan around it.",
      },
      residency: {
        label: "Where do you live?",
        placeholder: "Choose where you live",
        options: {
          "outside-east-africa": "Outside East Africa",
          "east-africa":
            "In Uganda, Kenya, Rwanda, Tanzania, Burundi, South Sudan or DRC (we may be able to use resident permit rates)",
        },
      },
      name: { label: "Your name" },
      email: { label: "Email" },
      whatsapp: {
        label: "WhatsApp or phone number",
        help: "Include your country code, for example +44 or +256. We'll only use it to reach you about this trip.",
      },
      notes: {
        label: "Anything else we should know?",
        placeholder:
          "Celebrating something? Prefer to fly rather than drive? Mobility needs, food allergies, a lodge you have in mind?",
      },
      consent: {
        label: "I agree that Kanyonyi can use these details to reply to my enquiry, as described in the privacy notice.",
      },
    },
    errors: {
      tour: 'Choose a trip, or "Something custom".',
      travelMonth: 'Choose a month, or "Not sure yet".',
      residency: "Choose where you live, so we can check permit rates.",
      travellers: "Choose between 1 and 12 travellers.",
      name: "Please add your name.",
      email: "Enter an email address like name@example.com.",
      whatsapp: "Enter a number with its country code, for example +256 750 242627.",
      consent: "Please tick the box so we can reply to you.",
    },
    errorSummary: "Please fix {n} thing(s) below before sending.",
    estimate: {
      label: "Estimated total",
      value: "{total} for {n} travellers",
      smallPrint:
        "Based on standard-season prices for travel until 31 December 2026, with rooms shared. Your quote will confirm the exact price.",
      customValue: "Priced in your quote",
      customSmallPrint: "We'll price your custom trip in your quote.",
      solo: "Includes the single room supplement.",
      sevenPlus: "Groups of seven or more travel in two vehicles, each with its own guide.",
    },
    submit: "Send enquiry",
    sending: "Sending…",
    belowButton: "We reply within one working day. Your details are used only to plan your trip; see our privacy notice.",
  },

  success: {
    live: {
      eyebrow: "Enquiry received",
      heading: "Thank you, {firstName}.",
      reference: "Your reference is **{reference}**. Keep it handy if you message us.",
      body: "We've sent a copy to {email}. A planner will reply within one working day with a plan for the {tourName} in {month}.",
      steps: [
        "We check permit and lodge availability for your dates.",
        "You receive a day-by-day plan and an itemised quote.",
        "You tell us what to change. No payment until you're happy.",
      ],
      primary: "Read the gorilla permit guide",
      secondary: "Chat on WhatsApp now",
    },
    demo: {
      eyebrow: "Enquiry received",
      heading: "That's the enquiry flow working, {firstName}.",
      body: "Your reference is **{reference}**, and a confirmation email is on its way to {email}. On a live site, the operator's team now gets the enquiry and replies with a plan and a quote. On this demo it reached VeilCode Studio, and Frank will reply to you personally.",
      primary: "See who built this",
      primaryHref: "https://veilcode.studio",
      secondary: "Chat with VeilCode on WhatsApp",
    },
    emailFallback:
      "Didn't get our email in 10 minutes? Check your spam folder, or message us your reference on WhatsApp.",
  },
} as const;
