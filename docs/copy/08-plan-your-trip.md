# Plan your trip (/plan-your-trip)

**Eyebrow:** Plan your trip
**H1:** Tell us when. We'll plan the rest.
**Lede:** Share your dates and who's travelling. Within one working day, a planner sends you a day-by-day plan and an itemised quote. No payment until you decide.

## Side panel (beside the form on desktop, below it on mobile)

**What happens next**
1. A planner reads your enquiry and checks permit and lodge availability for your dates.
2. Within one working day you receive a plan and an itemised quote by email, plus a WhatsApp message so you can reply however suits you.
3. We adjust it until it's right. Most trips take two or three rounds.

**Prefer to talk?** Chat on WhatsApp · [number]
**Hours:** Monday to Saturday, 8am to 8pm Kampala time (EAT, UTC+3)

## The form

Only what we need to quote. Fields in this order:

| Field | Label | Type | Required | Help text / options |
| --- | --- | --- | --- | --- |
| tour | Which trip? | Select | Yes | The six tours, then "Something custom". Pre-filled when arriving from a tour page. |
| travelMonth | When would you like to travel? | Select | Yes | Next 18 months, then "Not sure yet" |
| flexibility | How flexible are your dates? | Radio | No | Fixed dates · Within a week or two · Any time that month |
| travellers | How many travellers? | Number stepper 1 to 12 | Yes | |
| youngest | Is anyone under 15? | Radio | No | No · Yes. Help: "Gorilla trekking is only open to people 15 and over. We'll plan around it." |
| residency | Where do you live? | Select | Yes | Outside East Africa · In Uganda, Kenya, Rwanda, Tanzania, Burundi, South Sudan or DRC (we may be able to use resident permit rates) |
| name | Your name | Text | Yes | |
| email | Email | Email | Yes | |
| whatsapp | WhatsApp or phone number | Tel | No | "Include your country code, for example +44 or +256. We'll only use it to reach you about this trip." |
| notes | Anything else we should know? | Textarea | No | Placeholder: "Celebrating something? Prefer to fly rather than drive? Mobility needs, food allergies, a lodge you have in mind?" |
| consent | (checkbox) | Checkbox | Yes | "I agree that Kanyonyi can use these details to reply to my enquiry, as described in the privacy notice." |

**Live estimate box** (updates with tour and travellers):
- Label: Estimated total
- Value: {total} for {n} travellers
- Small text: "Based on standard-season prices for travel until 31 December 2026. Your quote will confirm the exact price." For "Something custom": "We'll price your custom trip in your quote."

**Submit button:** Send enquiry · while sending: Sending…

**Below button:** We reply within one working day. Your details are used only to plan your trip; see our privacy notice.

**Spam protection:** invisible honeypot field plus server-side rate limit. Never show a CAPTCHA puzzle unless abuse is detected.

## Success state (replaces the form)

**Eyebrow:** Enquiry received
**H2:** Thank you, {first name}.
**Reference:** Your reference is **{KX-1234}**. Keep it handy if you message us.
**Body:** We've sent a copy to {email}. A planner will reply within one working day with a plan for the {tour name} in {month}.
**What happens next list:**
1. We check permit and lodge availability for your dates.
2. You receive a day-by-day plan and an itemised quote.
3. You tell us what to change. No payment until you're happy.

**Buttons:** Read the gorilla permit guide · Chat on WhatsApp now

**If the confirmation email might not arrive:** Didn't get our email in 10 minutes? Check your spam folder, or message us your reference on WhatsApp.
