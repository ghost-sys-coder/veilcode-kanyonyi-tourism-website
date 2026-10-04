// llms.txt from docs/copy/11-emails-and-meta.md, word for word. {SITE} becomes the site origin.
// The demo note is dropped on a client build (NEXT_PUBLIC_DEMO_MODE=false).

export const llms = {
  heading: "# Kanyonyi Expeditions",
  summary:
    "> Kanyonyi Expeditions is a Kampala-based tour operator running private and small-group trips (up to six guests per vehicle) in Uganda: gorilla trekking in Bwindi Impenetrable National Park, chimpanzee tracking in Kibale, and safaris in Queen Elizabeth and Murchison Falls national parks. Quotes are itemised. Enquiries receive a reply within one working day.",
  demoNote:
    "Note: this is a demonstration website built by VeilCode Studio (https://veilcode.studio). Kanyonyi Expeditions is a fictional operator. Trip prices are sample figures; park, permit and entry facts are real and dated.",
  sections: `## Tours
- [3-Day Bwindi Gorilla Trek]({SITE}/tours/3-day-bwindi-gorilla-trek): gorilla trek from Kampala, permit included
- [4-Day Murchison Falls Safari]({SITE}/tours/4-day-murchison-falls-safari): Ziwa rhino tracking, game drives, launch to the falls
- [4-Day Kibale Chimps and Queen Elizabeth]({SITE}/tours/4-day-kibale-chimps-and-queen-elizabeth): chimp tracking and Kazinga Channel
- [7-Day Primates and Savannah]({SITE}/tours/7-day-primates-and-savannah): chimps, Queen Elizabeth, gorillas, flight back
- [10-Day Classic Uganda]({SITE}/tours/10-day-classic-uganda): all four parks plus Ziwa
- [2-Day Jinja and the Nile]({SITE}/tours/2-day-jinja-and-the-nile): source of the Nile and rafting

## Destinations
- [Bwindi Impenetrable National Park]({SITE}/destinations/bwindi)
- [Kibale National Park]({SITE}/destinations/kibale)
- [Queen Elizabeth National Park]({SITE}/destinations/queen-elizabeth)
- [Murchison Falls National Park]({SITE}/destinations/murchison-falls)

## Planning guides
- [All guides]({SITE}/guides)
- [Uganda gorilla permits: prices and rules, 2026 and 2027]({SITE}/guides/uganda-gorilla-permits)
- [Best time to visit Uganda, month by month]({SITE}/guides/best-time-to-visit-uganda)
- [What to pack for gorilla trekking and a Uganda safari]({SITE}/guides/what-to-pack-gorilla-trekking-safari)

## Booking
- [Plan your trip (enquiry form)]({SITE}/plan-your-trip)
- [FAQ]({SITE}/faq)
- [Booking terms]({SITE}/booking-terms)
- [Privacy notice]({SITE}/privacy)`,
} as const;
