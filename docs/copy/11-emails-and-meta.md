# Emails, page metadata and llms.txt

## Email 1: confirmation to the traveller

- **From name:** Kanyonyi Expeditions
- **Reply-to:** the operator's inbox (demo: frank@veilcode.studio)
- **Subject:** Your Uganda trip enquiry ({reference})
- **Preheader:** A planner will reply within one working day with a plan and a quote.

**Body**

Hello {first name},

Thank you for your enquiry. Here's what you sent us:

| | |
| --- | --- |
| Reference | {reference} |
| Trip | {tour name} |
| Travel month | {month} ({flexibility}) |
| Travellers | {n}{, including someone under 15 if yes} |
| Estimated total | {estimate} (standard-season price; your quote confirms the exact figure) |

**What happens next**

1. We check gorilla and chimp permit availability and lodges for your dates.
2. Within one working day, you'll receive a day-by-day plan and an itemised quote.
3. You tell us what to change. There's no payment until you're happy with it.

If you'd like to talk sooner, reply to this email or message us on WhatsApp at {number}, quoting {reference}.

While you wait, two guides most travellers find useful:
- Gorilla permits: prices, rules and how to book → {link}
- What to pack for a gorilla trek → {link}

Kanyonyi Expeditions
Kampala, Uganda

*This version is used on client builds. The demo uses the demo version below.*

### Demo version of Email 1 (when `NEXT_PUBLIC_DEMO_MODE=true`)

- **From name:** Kanyonyi Expeditions (demo by VeilCode Studio)
- **Reply-to:** frank@veilcode.studio
- **Subject:** Your demo enquiry ({reference})
- **Preheader:** This is the confirmation a real traveller would receive. Here's what happens next on a live site.

**Body**

Hello {first name},

You've just tested the enquiry flow on the Kanyonyi Expeditions demo. This email is exactly what a traveller would receive, a minute after pressing "Send enquiry".

| | |
| --- | --- |
| Reference | {reference} |
| Trip | {tour name} |
| Travel month | {month} ({flexibility}) |
| Travellers | {n} |
| Estimated total | {estimate} |

**On a live site, what happens next**

1. The operator's team is notified instantly, with everything above.
2. The enquiry is saved to their records, so nothing gets lost in an inbox.
3. Their planner replies with a day-by-day plan and an itemised quote.

**On this demo**

Your enquiry reached VeilCode Studio, the team that built this site. Frank will reply to you personally. If you run a tour company, a clinic, a law firm or any business that takes enquiries online, reply to this email and tell us what you'd want your own site to do.

Frank Tamale
VeilCode Studio · Kampala
WhatsApp: +256 750 242627 · veilcode.studio

---

## Email 2: notification to the operator

- **Subject:** New enquiry {reference}: {tour name}, {month}, {n} travellers
- **Body:** plain and scannable:

```
New enquiry {reference}
Received {date time EAT}

Trip:          {tour name}
Month:         {month} ({flexibility})
Travellers:    {n}   Under 15: {yes/no}
Residency:     {residency}
Estimate:      {estimate}

Name:          {name}
Email:         {email}
WhatsApp:      {whatsapp or "not given"}

Notes:
{notes}

Source page:   {page path}
Reply by:      {date + 1 working day}
```

---

## Page titles and meta descriptions

Titles end with " | Kanyonyi" except the homepage. Keep titles under 60 characters and descriptions under 155.

| URL | Title | Meta description |
| --- | --- | --- |
| / | Private Gorilla Treks and Safaris in Uganda · Kanyonyi | Private and small-group Uganda safaris from Kampala: gorilla trekking in Bwindi, chimps in Kibale, Murchison Falls. Itemised quotes, up to 6 per vehicle. |
| /tours | Uganda Tours and Safari Itineraries \| Kanyonyi | Six Uganda itineraries from 2 to 10 days, with day-by-day plans, real drive times and prices including gorilla and chimp permits. |
| /tours/3-day-bwindi-gorilla-trek | 3-Day Bwindi Gorilla Trek from Kampala \| Kanyonyi | Three days from Kampala to Bwindi for a gorilla trek, permit included. Drive times, inclusions and 2026 prices from USD 1,650 per person. |
| /tours/4-day-murchison-falls-safari | 4-Day Murchison Falls Safari with Ziwa Rhinos \| Kanyonyi | Rhino tracking at Ziwa, game drives and a boat to the foot of Murchison Falls. Day-by-day plan and prices from USD 1,190 per person. |
| /tours/4-day-kibale-chimps-and-queen-elizabeth | 4-Day Kibale Chimps and Queen Elizabeth \| Kanyonyi | Chimp tracking in Kibale and a Kazinga Channel boat trip in Queen Elizabeth. Four days from Kampala, from USD 1,480 per person. |
| /tours/7-day-primates-and-savannah | 7-Day Uganda Gorillas, Chimps and Safari \| Kanyonyi | Chimps in Kibale, Queen Elizabeth's lions and channel, gorillas in Bwindi, flight back included. Seven days from USD 3,450 per person. |
| /tours/10-day-classic-uganda | 10-Day Classic Uganda Safari Itinerary \| Kanyonyi | Ziwa rhinos, Murchison Falls, Kibale chimps, Queen Elizabeth and Bwindi gorillas in ten days. Full itinerary and prices. |
| /tours/2-day-jinja-and-the-nile | 2-Day Jinja Trip: Source of the Nile and Rafting \| Kanyonyi | A weekend from Kampala: boat to the source of the Nile and a full day of white-water rafting. Itinerary and prices from USD 420. |
| /destinations | Uganda Safari Destinations \| Kanyonyi | Bwindi, Kibale, Queen Elizabeth and Murchison Falls: what each park is best for, how far they are from Kampala, and when to go. |
| /destinations/bwindi | Bwindi Impenetrable National Park Guide \| Kanyonyi | Gorilla trekking in Bwindi: the four sectors, permit prices, how hard the treks are, how to get there and the best time to go. |
| /destinations/kibale | Kibale National Park: Chimp Tracking Guide \| Kanyonyi | Chimp tracking in Kibale: permit prices for 2026 and 2027, what a tracking morning is like, Bigodi wetland and how to get there. |
| /destinations/queen-elizabeth | Queen Elizabeth National Park Guide \| Kanyonyi | Kazinga Channel boat trips, Kasenyi game drives and Ishasha's tree-climbing lions: planning a visit to Queen Elizabeth National Park. |
| /destinations/murchison-falls | Murchison Falls National Park Guide \| Kanyonyi | Uganda's largest park: the falls, Nile boat trips, game drives north of the river, shoebills in the delta, and Ziwa rhinos on the way. |
| /guides/uganda-gorilla-permits | Uganda Gorilla Permits 2026 and 2027 \| Kanyonyi | Gorilla permit prices for 2026 and 2027, the March 2026 full-payment rule, low-season permits, refunds and how to book. Checked October 2026. |
| /guides/best-time-to-visit-uganda | Best Time to Visit Uganda, Month by Month \| Kanyonyi | Dry and wet seasons, cheaper low-season permits, and what each month is like for gorilla trekking, chimps and game drives. |
| /guides/what-to-pack-gorilla-trekking-safari | What to Pack for Gorilla Trekking in Uganda \| Kanyonyi | The kit that matters on a Bwindi gorilla trek and a Uganda safari, plus visa, yellow fever and malaria notes checked October 2026. |
| /about | About Kanyonyi Expeditions \| Kanyonyi | A Kampala-based operator running private Uganda trips with up to six guests per vehicle, one guide throughout and itemised quotes. |
| /plan-your-trip | Plan Your Uganda Trip \| Kanyonyi | Send your dates and who's travelling. A planner replies within one working day with a day-by-day plan and an itemised quote. |
| /faq | Uganda Safari FAQ \| Kanyonyi | Booking, payments, visas, yellow fever, safety, children, vehicles and lodges: answers to the questions travellers ask before booking. |
| /booking-terms | Booking Terms \| Kanyonyi | Deposits, balance, cancellations, permits and insurance for trips booked with Kanyonyi Expeditions. |
| /privacy | Privacy Notice \| Kanyonyi | How Kanyonyi Expeditions collects, uses and protects the details you share when you enquire or book. |

**Open Graph:** og:title = page title without the " | Kanyonyi" suffix; og:description = meta description; og:image = the page's hero image at 1200 × 630.

---

## llms.txt (served at /llms.txt)

```markdown
# Kanyonyi Expeditions

> Kanyonyi Expeditions is a Kampala-based tour operator running private and small-group trips (up to six guests per vehicle) in Uganda: gorilla trekking in Bwindi Impenetrable National Park, chimpanzee tracking in Kibale, and safaris in Queen Elizabeth and Murchison Falls national parks. Quotes are itemised. Enquiries receive a reply within one working day.

Note: this is a demonstration website built by VeilCode Studio (https://veilcode.studio). Kanyonyi Expeditions is a fictional operator. Trip prices are sample figures; park, permit and entry facts are real and dated.

## Tours
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
- [Privacy notice]({SITE}/privacy)
```

`{SITE}` is replaced at build time with `NEXT_PUBLIC_SITE_URL`.
