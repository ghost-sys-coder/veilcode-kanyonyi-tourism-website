// /about page copy, docs/copy/07-about.md. Team names are sample values on the demo
// (00-README.md rule 3); a client build replaces them.

export const about = {
  eyebrow: "About Kanyonyi",
  h1: "A small Kampala operator that tells you the drive takes nine hours",
  lede: "We plan private and small-group trips through Uganda's parks, and we run them ourselves: our vehicles, our guides, our phones. We'd rather lose a booking by being honest about a long drive than win it and have you find out on the road.",
  howWeWork: {
    heading: "How we work",
    items: [
      {
        title: "Itemised quotes",
        body: "Your quote lists every permit, park fee, lodge night, vehicle day and flight on its own line, with the official price where there is one. You can see what we charge for planning and running the trip, and compare us properly with anyone else.",
      },
      {
        title: "Six guests, maximum",
        body: "Our Land Cruisers seat six with a window each and a pop-up roof for game viewing. We never fill a seventh seat.",
      },
      {
        title: "One guide, the whole way",
        body: "The driver-guide who meets you at Entebbe drives you back. They handle every park gate, permit check and lodge check-in, and they know by day two whether you want to talk about birds or sit quietly.",
      },
      {
        title: "Permits first",
        body: "We buy your gorilla and chimp permits the day your payment arrives and send you the official confirmation. Nothing else gets booked until the permit is secure.",
      },
      {
        title: "Real times, real distances",
        body: "Every itinerary shows the hours on the road and the length of every walk. Uganda's parks are far apart and some roads are slow. You should plan around that, not discover it.",
      },
    ],
  },
  whatWeDont: {
    heading: "What we don't do",
    items: [
      "We don't promise sightings. Animals are wild. We tell you how likely they are, honestly.",
      "We don't sell trips we wouldn't take ourselves. If a route is too rushed, we say so.",
      "We don't book activities that harm the communities around the parks. Community visits we use are run by the communities themselves.",
    ],
  },
  team: {
    heading: "Our team",
    members: [
      {
        name: "Sarah Namutebi",
        role: "Founder and trip planning",
        line: "Plans every itinerary and answers most WhatsApp messages. Has trekked to more than half of Bwindi's habituated families.",
      },
      {
        name: "Moses Tumusiime",
        role: "Senior driver-guide",
        line: "Grew up near Kibale. Hears chimps before anyone else in the vehicle does.",
      },
      {
        name: "Grace Atim",
        role: "Bookings and permits",
        line: "Handles every permit, lodge and flight booking, and sends you the confirmations.",
      },
    ],
  },
  licences: {
    heading: "Licences and memberships",
    demo: "On a live site, licence numbers and association memberships are listed here so travellers can check them.",
  },
  close: {
    heading: "Ask us anything",
    body: "About a route, a lodge, a permit date, or whether Uganda is right for you at all. A planner replies within one working day.",
    primary: "Plan my trip",
    secondary: "Chat on WhatsApp",
  },
} as const;
