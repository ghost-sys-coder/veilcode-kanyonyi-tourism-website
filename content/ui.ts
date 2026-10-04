// Shared interface copy from docs/copy/02-global.md, word for word.
// {placeholders} are filled in by lib/content/format.ts.

export const ui = {
  buttons: {
    askAboutTrip: "Ask about this trip",
    planMyTrip: "Plan my trip",
    sendEnquiry: "Send enquiry",
    seeItinerary: "See itinerary",
    findTrips: "Find trips",
    clearFilters: "Clear filters",
    chatOnWhatsApp: "Chat on WhatsApp",
    readGuide: "Read the guide",
    exploreDestination: "Explore {destination}",
  },

  mobileMenu: {
    open: "Open menu",
    close: "Close menu",
  },

  whatsappPopover: {
    buttonLabel: "Chat with us on WhatsApp",
    title: "Talk to a trip planner",
    body: "Ask about dates, prices or permits. A planner replies within an hour between 8am and 8pm Kampala time, and first thing the next morning otherwise.",
    openButton: "Open WhatsApp",
    fallback: "Or message us on {number}",
    copyNumber: "Copy number",
    copied: "Copied",
    copyFailed: "Select the number to copy it",
  },

  tripFinder: {
    experience: {
      label: "What do you want to see?",
      options: {
        everything: "Everything",
        "gorillas-and-chimps": "Gorillas and chimps",
        "savannah-wildlife": "Savannah wildlife",
        "nile-and-adventure": "Nile and adventure",
      },
    },
    month: { label: "When are you travelling?", any: "Any month" },
    length: {
      label: "How much time do you have?",
      options: {
        any: "Any length",
        "3": "Up to 3 days",
        "5": "Up to 5 days",
        "7": "Up to a week",
        "8plus": "More than a week",
      },
    },
    resultsNote: "{month}: {note}",
  },

  consent: {
    text: "We use analytics cookies to see which pages help travellers plan, so we can improve them. No advertising cookies. You can change this any time from the link in the footer.",
    accept: "Accept analytics",
    reject: "Reject",
    privacyLink: "Privacy notice",
  },

  form: {
    requiredMarker: "(required)",
    genericRequired: "Please add your {field}.",
    emailError: "Enter an email address like name@example.com.",
    phoneHelp:
      "Include your country code, for example +44 or +256. We'll only use it to reach you about this trip.",
    sending: "Sending…",
    networkFailure:
      "Your enquiry didn't send. Check your connection and try again. If it keeps failing, message us on WhatsApp and we'll pick it up from there.",
    serverFailure:
      "Something went wrong on our side and your enquiry didn't send. Please try again in a minute, or message us on WhatsApp.",
    rateLimit:
      "You've sent several enquiries in a short time. Please wait a few minutes, or message us on WhatsApp.",
  },

  a11y: {
    skipLink: "Skip to main content",
    breadcrumbLabel: "Breadcrumb",
    mainNavLabel: "Main",
    footerNavLabel: "Footer",
    externalLinkSuffix: "(opens in a new tab)",
    currencyToggleLabel: "Show prices in",
    dialogClose: "Close",
  },

  breadcrumbs: {
    home: "Home",
    tours: "Tours",
    destinations: "Destinations",
    guides: "Guides",
  },

  labels: {
    backToTop: "Back to top",
    onThisPage: "On this page",
    tourAnchors: {
      overview: "Overview",
      dayByDay: "Day by day",
      included: "Included",
      prices: "Prices",
      goodToKnow: "Good to know",
      questions: "Questions",
    },
    guideJumpLinks: "In this guide",
    updated: "Updated {date}",
    priceFrom: "From, per person sharing",
    lowSeasonPrice: "April, May and November dates",
    goodInMonth: "Good in {month}",
    cheaperPermits: "Cheaper permits",
    daysNights: "{days} days · {nights} nights",
    imageCredit: "Photo: {photographer} / {source}",
    loadingTrips: "Loading trips…",
    copied: "Copied",
  },

  emptyStates: {
    tripFinder: {
      heading: "No trips match all three choices.",
      body: "Try \"Any length\", or tell us what you have in mind and we'll plan it.",
      clear: "Clear filters",
      custom: "Plan a custom trip",
    },
    guides: "More guides are on the way.",
  },

  notFound: {
    heading: "This trail doesn't go anywhere",
    body: "The page may have moved, or the link may be mistyped. These are the places most people are looking for:",
    links: [
      { label: "All tours", href: "/tours" },
      { label: "Gorilla permits explained", href: "/guides/uganda-gorilla-permits" },
      { label: "Plan my trip", href: "/plan-your-trip" },
    ],
  },

  serverError: {
    heading: "Something went wrong on our side",
    body: "Please try again in a minute. If you were sending an enquiry, it may not have gone through, so message us on WhatsApp to be sure.",
    button: "Back to the homepage",
  },

  factStamp:
    "Checked 4 October 2026 against Uganda Wildlife Authority and Uganda immigration sources. Prices and rules can change; we confirm current rates in your quote.",
} as const;
