# Kanyonyi Expeditions Copy Deck

This folder is the approved copy for every page of the build. Place it at `docs/copy/`.

## Rules for the coding agent

1. Use this copy word for word. Do not rewrite, shorten, "improve" or add marketing lines. If a layout needs text that is not here, use the nearest existing line and flag the gap in the pull request description instead of inventing copy.
2. Move tour, destination and guide content into typed files in `content/` (one entry per tour, destination and guide). The structure of each file here maps to fields: headings marked `Field:` are data fields, everything else is page copy.
3. Anything inside `[CLIENT: ...]` is a placeholder a real client replaces. On the demo, render it as the sample value shown, never as the bracket text.
4. Every time-sensitive fact (permit prices, visa fees, entry rules) is listed in `12-fact-register.md` with its source and the date it was checked. Render "Checked 4 October 2026" wherever a page shows those facts. When a fact changes, update the register and the content file together.
5. Spelling is British English (traveller, colour, organise), because the main markets are the UK, Europe, Australia and East Africa.
6. Never use em dashes in rendered copy.

## Files

| File | Covers |
| --- | --- |
| 01-voice.md | Voice and wording rules, banned phrases |
| 02-global.md | Navigation, footer, buttons, WhatsApp popover, currency toggle, cookie banner, form microcopy, errors, 404, demo notice |
| 03-home.md | Homepage, section by section |
| 04-tours.md | Tours listing page and all six tour pages |
| 05-destinations.md | Destinations hub and four destination pages |
| 06-guides.md | Three travel guides |
| 07-about.md | About page |
| 08-plan-your-trip.md | Enquiry page, form, success state |
| 09-faq.md | FAQ page |
| 10-policies.md | Booking terms and privacy notice |
| 11-emails-and-meta.md | Enquiry emails, page titles, meta descriptions, Open Graph, llms.txt |
| 12-fact-register.md | Every checked fact, source and date |

## URL map

```text
/                                   Home
/tours                              All tours
/tours/3-day-bwindi-gorilla-trek
/tours/4-day-murchison-falls-safari
/tours/4-day-kibale-chimps-and-queen-elizabeth
/tours/7-day-primates-and-savannah
/tours/10-day-classic-uganda
/tours/2-day-jinja-and-the-nile
/destinations                       Destinations hub
/destinations/bwindi
/destinations/kibale
/destinations/queen-elizabeth
/destinations/murchison-falls
/guides/uganda-gorilla-permits
/guides/best-time-to-visit-uganda
/guides/what-to-pack-gorilla-trekking-safari
/about
/plan-your-trip                     Enquiry form
/faq
/booking-terms
/privacy
```

The previous demo listed a Kidepo Valley trip. It is replaced by the 4-day Kibale Chimps and Queen Elizabeth tour, so every tour links to at least one destination page in this build and no tour depends on a destination we have not written.
