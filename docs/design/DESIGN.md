# Kanyonyi Expeditions Design System

This file is the design source of truth for the build. Section 30 of AGENTS.md says to establish design tokens; these are those tokens. Use them, do not invent new ones.

Visual reference: `docs/design/reference/kanyonyi-reference.html`. Open it in a browser to see the direction. It is a single-file prototype. Where it and this file disagree, this file wins. The known differences are listed in section 10.

---

## 1. Direction

**Field journal, not travel brochure.** The site should feel like it was made by people who know the parks: calm, specific and practical. Confidence comes from precise information (permit prices, trek times, seasons), not from adjectives.

Three things carry the identity:

1. A serif display face used large and sparingly for headings.
2. Small uppercase mono labels ("eyebrows") that name things the way a guide's notebook would: `3 DAYS · BWINDI IMPENETRABLE`.
3. A deep forest green with one warm sun yellow for the main call to action.

What this is not: dark-overlay hero sliders, stock "adventure awaits" copy, gradient buttons, emoji, every block in a shadowed card, or centred everything.

---

## 2. Color tokens

Paste into `app/globals.css`, replacing the shadcn defaults. The names match shadcn's variables, so every shadcn component picks up the brand without overrides. Brand-only tokens are at the end.

```css
:root {
  --radius: 1.25rem;

  --background: #F2F4EF;          /* page ground: grey-green, not cream */
  --foreground: #10221D;
  --card: #FFFFFF;
  --card-foreground: #10221D;
  --popover: #FFFFFF;
  --popover-foreground: #10221D;

  --primary: #0F3B33;             /* forest: secondary buttons, links, active states */
  --primary-foreground: #F2F4EF;
  --secondary: #E4EAE2;           /* mist: quiet fills, selected chips */
  --secondary-foreground: #10221D;
  --muted: #E4EAE2;
  --muted-foreground: #56665F;    /* 5.5:1 on background */
  --accent: #E4EAE2;
  --accent-foreground: #0F3B33;
  --destructive: #B42318;

  --border: #D5DDD6;
  --input: #D5DDD6;
  --ring: #0F3B33;                /* focus ring: forest, 11:1. Never use sun for focus on light grounds (1.9:1, fails) */

  /* Brand tokens */
  --sun: #E3A72F;                 /* primary CTA fill only */
  --sun-foreground: #3E2A03;      /* 6.4:1 on sun */
  --clay: #A0482E;                /* eyebrows and small labels. 5.5:1 on background */
  --band: #0F3B33;                /* dark feature bands (seasons, footer) */
  --band-foreground: #F2F4EF;
  --band-accent: #E3A72F;
}

@theme inline {
  --color-sun: var(--sun);
  --color-sun-foreground: var(--sun-foreground);
  --color-clay: var(--clay);
  --color-band: var(--band);
  --color-band-foreground: var(--band-foreground);
  --color-band-accent: var(--band-accent);
}
```

Keep shadcn's existing `@theme inline` mappings for the standard variables; add only the brand lines above.

### Usage rules

1. `sun` appears once per viewport, on the single most important action (Enquire, Find trips, Send enquiry). If two sun buttons are visible at once, one of them is wrong.
2. `primary` (forest) is for the second most important action and for links.
3. `clay` is only for eyebrows and small labels. Never for body text or buttons.
4. Status colors (success, warning) are separate from brand colors. Use green for success and amber for warnings with an icon and text, never color alone.

**Dark mode:** not in scope for the 9 October build. Tourism pages are photography-led and dark mode doubles visual QA. The token structure above allows a `.dark` block later without touching components.

---

## 3. Typography

Load with `next/font/google` in `app/layout.tsx` and expose as CSS variables. No other font sources.

| Role | Family | Weights | Used for |
| --- | --- | --- | --- |
| Display | Gloock | 400 only | h1, h2, h3, prices |
| Body | Instrument Sans | 400, 500, 600, 700 | everything else |
| Label | JetBrains Mono | 400 | eyebrows, trip meta, day numbers, references |

Fallbacks: Georgia for display, system-ui for body, ui-monospace for label.

**Scale** (mobile → desktop, use `clamp()`):

| Token | Size | Line height | Notes |
| --- | --- | --- | --- |
| display-xl | 44px → 96px | 1.02 | homepage h1 only |
| display-l | 30px → 48px | 1.08 | section h2 |
| display-m | 24px → 28px | 1.15 | card and dialog h3 |
| body-l | 17px → 18px | 1.6 | lede paragraphs, max 58ch |
| body | 16px | 1.6 | default, max 68ch |
| body-s | 14px | 1.5 | meta, helper text |
| label | 12px | 1.4 | mono, uppercase, letter-spacing 0.12em |

Rules: headings use `text-wrap: balance`. Prices use the display face with `tabular-nums`. Italic in the display face is allowed once per page for emphasis (the reference uses it on "forest").

---

## 4. Layout and spacing

1. Container: max width 1180px, side gutter at least 16px at every width.
2. Section spacing: 56px mobile, 72px desktop, top and bottom.
3. Spacing within components follows Tailwind's 4px scale. Use `gap` on flex and grid parents, not margins on children.
4. Grids collapse to one column below 720px. Trip grids: 1 column mobile, 2 tablet, 3 desktop. The reference's asymmetric wide cards are optional; only use them when the count fills the row cleanly.
5. Text never exceeds 68 characters per line.

---

## 5. Radius, borders, elevation

| Element | Radius |
| --- | --- |
| Buttons, chips, badges | full (pill) |
| Cards, dialogs, sheets | `--radius` (20px) |
| Inputs, selects, small panels | 14px (`rounded-[14px]` or a `--radius-sm` token) |

Borders are 1px `--border`. Shadow is used only on: the trip finder bar, hovered trip cards, dialogs and the floating WhatsApp button. Everything else is flat.

---

## 6. Calls to action

| Level | Style | Example |
| --- | --- | --- |
| Primary | sun fill, sun-foreground text, pill | Enquire about this trip |
| Secondary | primary (forest) fill, pill | Plan my trip (nav) |
| Tertiary | outline forest or underlined link | See itinerary |
| WhatsApp | floating round button bottom right, plus inline text link on tour pages | Chat on WhatsApp |

Button labels say exactly what happens. "Send enquiry", not "Submit". "See itinerary", not "Learn more".

---

## 7. Photography

Photography replaces the reference's illustrations. It must help a traveler decide, not decorate.

1. **Hero:** one real landscape or wildlife photo, no carousel. 16:9 on desktop, 4:5 crop on mobile using `next/image` with art-directed `sizes`. Text sits on a solid or lightly scrimmed area, never directly on a busy part of the photo. Mark it `priority` (it is the LCP element).
2. **Tour cards:** 3:2, showing the actual activity of that tour (gorillas for Bwindi, boat on the Kazinga Channel for Queen Elizabeth).
3. **Tour and destination galleries:** 3:2 and 4:5 mixed, 5 to 8 images, captions that say where and what.
4. **Treatment:** natural color. No heavy filters, no duotones, no dark gradient over every image.
5. **Metadata per image** (stored with the content entry): alt text, caption, photographer, source URL, licence, width, height.
6. **Sizes:** never ship an image wider than it renders. Use `next/image` with explicit `sizes`. Target under 200KB for card images.

The reference's SVG landscape style may be used only for empty states, the 404 page and small decorative dividers.

---

## 8. Icons and motion

1. Icons: lucide-react (already a shadcn dependency). 20px default, 1.5 stroke. Icons support labels; they never replace them.
2. Motion: hover lift on trip cards (translateY -3px, 200ms) and dialog/sheet transitions from shadcn. Nothing else animates on load. Respect `prefers-reduced-motion`.

---

## 9. Component patterns to keep from the reference

These worked in the prototype and should carry over, built from shadcn primitives:

1. **Trip finder bar** under the hero: Experience, Travel month, Time you have, Find trips. Built with Select and Button. On submit it goes to the tours listing with filters in the URL query, so results are shareable and crawlable.
2. **Trip card:** image, tag badge, mono meta line (days · parks), h3 name, one-sentence description, footer with "From, per person" price and "See itinerary" link. Same anatomy on every card.
3. **Month picker** for "when to go": 12 bars, dry months in sun, green season lighter, tap shows the month's notes and matching tours. Uses ToggleGroup.
4. **Permit table:** visitor type, peak price, low-season price, with the source and the date the prices were checked shown under it.
5. **Inclusions / exclusions lists** with check and dash markers.
6. **Enquiry form** with a live estimated total that updates when trip or travelers change, and a success state showing the reference number and next steps.
7. **USD / UGX toggle** in the header. Rate comes from one config value with the date it was set.
8. **Floating WhatsApp button** with a small popover: who answers, typical response time, and the button.

---

## 10. Where production differs from the reference

| Reference prototype | Production build | Why |
| --- | --- | --- |
| Itinerary opens in a dialog | Each tour has its own page at `/tours/[slug]` with the itinerary on the page | Itineraries are the main search landing content; a dialog has no URL to rank or share |
| Illustrated hero and cards | Real photography | Travelers buy what they can see |
| Eyebrow color #B8573A | #A0482E | The original fails AA contrast for 12px text |
| Sun yellow focus ring | Forest focus ring | Sun on the light ground fails WCAG 2.2 focus contrast |
| Light and dark themes | Light only for this build | Deadline; tokens are ready for dark later |
| Everything on one page | Home, tours listing, tour pages, destination pages, guides, enquiry | Information architecture from AGENTS.md sections 7 and 13 |
