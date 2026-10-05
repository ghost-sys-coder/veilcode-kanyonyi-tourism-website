# 004: Design tokens and components

**Status:** Proposed (Phase 01, 4 October 2026)
**Applies to:** Phase 02 onward

## Context: what is installed

| Item | Version / state |
| --- | --- |
| Next.js | 16.3.8 (App Router, Turbopack default) |
| React | 19.2.8 |
| Tailwind CSS | v4 (`@tailwindcss/postcss`). CSS-first config, no `tailwind.config` |
| shadcn | CLI 4.21.1, style **`base-nova`**, built on **Base UI** (`@base-ui/react` 1.8), not Radix. `cn` comes from shadcn's own `cn` package, not `clsx` + `tailwind-merge` |
| Installed components | `badge`, `button`, `card`, `input`, `select`, `textarea` |
| Fonts | Geist and Geist Mono from create-next-app (to be replaced) |

Problems found in the current `app/globals.css` and components:

1. `--font-sans: var(--font-sans)` inside `@theme inline` refers to itself (a shadcn init artefact). It resolves to nothing, and the font only works because the browser falls back.
2. `--font-mono: var(--font-geist-mono)` points at a font that is being removed.
3. Buttons and inputs are `h-8` (32px) with `rounded-lg`. DESIGN.md wants pill buttons, 14px inputs, and touch targets that work on phones.
4. Neutral oklch shadcn defaults and a `.dark` block are still in place.

## Decision

### 1. Tokens in `app/globals.css`

The structure is kept as the shadcn v4 layout: imports, `@custom-variant`, `@theme inline`, `:root`, `@layer base`. The changes are:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));   /* kept so a .dark block can be added later */

@theme inline {
  /* shadcn standard mappings: keep every existing --color-* line unchanged */

  /* Fonts: fixes the self-reference */
  --font-sans: var(--font-body), system-ui, sans-serif;
  --font-heading: var(--font-display), Georgia, serif;
  --font-mono: var(--font-label), ui-monospace, monospace;

  /* Brand colours (DESIGN.md section 2, verbatim) */
  --color-sun: var(--sun);
  --color-sun-foreground: var(--sun-foreground);
  --color-clay: var(--clay);
  --color-band: var(--band);
  --color-band-foreground: var(--band-foreground);
  --color-band-accent: var(--band-accent);

  /* Radius: DESIGN.md section 5 */
  --radius-sm: 0.875rem;                 /* 14px: inputs, selects, small panels */
  --radius-md: 1rem;
  --radius-lg: var(--radius);            /* 20px: cards, dialogs, sheets */
  --radius-xl: calc(var(--radius) * 1.4);
  /* pills use Tailwind's built-in rounded-full */

  /* Type scale: DESIGN.md section 3 (mobile to desktop over 360px to 1180px) */
  --text-display-xl: clamp(2.75rem, 1.53rem + 5.37vw, 6rem);
  --text-display-xl--line-height: 1.02;
  --text-display-l: clamp(1.875rem, 1.38rem + 2.2vw, 3rem);
  --text-display-l--line-height: 1.08;
  --text-display-m: clamp(1.5rem, 1.39rem + 0.49vw, 1.75rem);
  --text-display-m--line-height: 1.15;
  --text-body-l: clamp(1.0625rem, 1.03rem + 0.12vw, 1.125rem);
  --text-body-l--line-height: 1.6;
  --text-body: 1rem;
  --text-body--line-height: 1.6;
  --text-body-s: 0.875rem;
  --text-body-s--line-height: 1.5;
  --text-label: 0.75rem;
  --text-label--line-height: 1.4;

  /* Layout */
  --container-page: 1180px;
}

:root {
  /* DESIGN.md section 2 :root block, verbatim. Replaces the oklch defaults. */
  --radius: 1.25rem;
  --background: #F2F4EF;
  /* ... every value from DESIGN.md ... */
  --band-accent: #E3A72F;

  /* Status: DESIGN.md section 2 rule 4, verbatim (values and @theme lines) */
  --success: #1E6B45;
  --success-surface: #DDF1E5;
  --warning: #7A4E00;
  --warning-surface: #FBEFD2;
  --destructive-surface: #FDE8E6;

  /* Sidebar and chart vars: dropped (no sidebar or charts in scope) */
}

/* .dark block removed for this build (DESIGN.md: light only). */

@layer base {
  * { @apply border-border outline-ring/50; }
  body { @apply bg-background text-foreground font-sans text-body; }
  h1, h2, h3 { @apply font-heading font-normal; text-wrap: balance; }
  :focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
}

@utility container-page { max-width: var(--container-page); margin-inline: auto; padding-inline: max(1rem, 4vw); }
@utility section-y { padding-block: 3.5rem; @media (width >= 48rem) { padding-block: 4.5rem; } }
@utility eyebrow { font-family: var(--font-mono); font-size: var(--text-label); line-height: 1.4;
                   text-transform: uppercase; letter-spacing: 0.12em; color: var(--clay); }
@utility measure { max-width: 68ch; }
@utility measure-lede { max-width: 58ch; }
@utility price { font-family: var(--font-heading); font-variant-numeric: tabular-nums; }
```

Notes:

- Status colours come from DESIGN.md: success for the enquiry confirmation and "Copied", warning for the 2027 callout and "can't be rescheduled" notes, destructive for form errors. Each is always paired with an icon and text.
- The radius scale is overridden on purpose. shadcn's default `calc()` scale gives 12, 16 and 20px for sm, md and lg, and DESIGN.md needs 14px for inputs.
- No other new tokens. Spacing uses Tailwind's 4px scale, as DESIGN.md section 4 says.

### 2. Fonts with `next/font`

```ts
// app/fonts.ts (a client build swaps this file)
import { Gloock, Instrument_Sans, JetBrains_Mono } from "next/font/google";

export const display = Gloock({ weight: "400", subsets: ["latin"], variable: "--font-display", display: "swap" });
export const body = Instrument_Sans({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-body", display: "swap" });
export const label = JetBrains_Mono({ weight: "400", subsets: ["latin"], variable: "--font-label", display: "swap", preload: false });
```

- `app/layout.tsx` puts all three `.variable` classes on `<html lang="en-GB">`.
- `next/font` self-hosts the files at build time, so no request goes to Google at runtime (good for the UK/EU consent position). It also generates fallback metrics to limit layout shift.
- The label font isn't preloaded, because it is only 12px eyebrows and losing it briefly doesn't hurt LCP. Display and body are preloaded.
- `Instrument_Sans` is a variable font. Passing explicit weights is still accepted, and the call is verified against the bundled `font.md` during the Phase 02 build.

### 3. Changes to shadcn components (variants only)

AGENTS.md section 9 (updated 4 October 2026) allows editing Tailwind classes and variants in `components/ui/` to apply DESIGN.md tokens, provided structure, props and behaviour don't change and every edit is listed in this record. **This table is that list. Keep it current.**

| File | Change |
| --- | --- |
| `button.tsx` | Base: `rounded-full`, `text-base font-semibold`. New `variant: "sun"` (`bg-sun text-sun-foreground hover:bg-sun/90`); `default` stays forest (`hover:bg-primary/90`). Sizes: `default` `h-11 px-5` (44px), `sm` `h-9 px-4 text-sm`, `lg` and new `cta` `h-12 px-6` (48px), `icon` `size-11`, `icon-sm` `size-9`, `icon-lg` `size-12`. Per-size `rounded-[min(...)]` overrides removed so every size is a pill |
| `badge.tsx` | `rounded-full`, `h-6`. New variants `tag` (mist fill, forest text), `success` and `warning` (status surface with status text) |
| `input.tsx`, `textarea.tsx` | `rounded-sm` (14px), `bg-card`, `h-11` (textarea `min-h-28`), `px-3.5`. Removed `md:text-sm` so text stays 16px at every width |
| `select.tsx` (trigger only) | `rounded-sm`, `bg-card`, `text-base`, `h-11` (`sm` `h-9`) |
| `card.tsx` | `rounded-lg` (20px), `border border-border` instead of `ring-1 ring-foreground/10`, `text-base`, footer without the muted fill. Hover lift belongs to `trip-card.tsx` |
| `toggle.tsx`, `toggle-group.tsx` | `rounded-full` pills; toggle `default` `h-10 px-4`, `sm` `h-9 px-3`, `lg` `h-11 px-5` |
| **All of `components/ui/`** | `ring-ring/50` replaced with `ring-ring` (13 files). Forest at 50% opacity is about 2.9:1 on the page ground, below the 3:1 WCAG 2.2 requires for focus indicators; full forest is 11.2:1 |

Each edited file starts with a two-line "Brand-adjusted" comment.

**Token deviation from DESIGN.md (needs Frank's approval):** `--input` is `#7F8D86`, not `#D5DDD6`. Form control edges must reach 3:1 against what's around them (WCAG 2.2, 1.4.11); `#D5DDD6` is 1.39:1 on a white field. `#7F8D86` is the lightest grey-green that passes on both white (3.47:1) and the page ground (3.13:1). `--border` stays `#D5DDD6` because card and divider borders are decorative. Every other pairing was checked on 4 October 2026: all text pairs pass 4.5:1 and the focus ring is 11.2:1.

### 4. shadcn components to add

Added with the shadcn CLI on 4 October 2026 (S1). All are base-nova (Base UI) versions; `toggle` came in with `toggle-group`. None added an npm dependency.

| Component | Used for |
| --- | --- |
| `accordion` | FAQ page, tour and destination questions |
| `alert` | Demo policy notice, 2027 price callout, form error banners |
| `breadcrumb` | All non-home pages |
| `checkbox` | Consent box |
| `field` | Label, description and error wiring for every form field (replaces the older `form` and react-hook-form approach in base-nova) |
| `label` | Used by `field` |
| `navigation-menu` | Installed but **not used**: with five flat links and no dropdowns, the header uses a plain `<nav><ul>` (`desktop-nav.tsx`, S2). Remove if still unused at launch |
| `popover` | Floating WhatsApp popover |
| `radio-group` | Flexibility and under-15 questions |
| `separator` | Footer and itinerary dividers |
| `sheet` | Mobile menu |
| `skeleton` | Loading states (`loading.tsx` is rarely shown because pages are static, but needed for the form route) |
| `table` | At a glance, prices, permit table, guide tables |
| `toggle-group` | Month picker (DESIGN.md section 10.3), USD/UGX toggle, tour filter chips |
| `tooltip` | Currency rate explanation |

Not added: `sonner` (its shadcn wrapper depends on `next-themes`, a theme switcher this light-only site doesn't need; "Copied" is shown inline in the WhatsApp popover, as 02-global.md describes), `dialog` (itineraries are pages, per DESIGN.md section 11), `carousel` (no hero sliders; galleries are grids), `calendar` (months, not dates), `command`, `pagination` (six tours, so no pagination is needed).

### 5. Custom components and why shadcn doesn't cover them

Each sits in its own file (AGENTS.md section 9). They are composed from shadcn primitives wherever one exists.

**Layout and shell (`components/layout/`)**

| Component | Why custom |
| --- | --- |
| `site-header.tsx` | Composition of logo, nav, currency toggle and CTA. There is no shadcn equivalent |
| `mobile-menu.tsx` | `"use client"`. Content inside a shadcn `Sheet`, with the WhatsApp link and reply hours from the copy |
| `site-footer.tsx` | Band-coloured footer with columns, name story, licence line and demo line |
| `demo-notice.tsx` | `"use client"`. A thin bar dismissible per session (sessionStorage). The behaviour is too small for `Alert`, which isn't dismissible |
| `section.tsx` | Container plus `section-y` spacing wrapper, so pages don't repeat layout classes |
| `eyebrow.tsx` | Mono uppercase clay label. It is a typographic role, not a component shadcn offers |
| `close-cta.tsx` | The closing call-to-action block every page ends with |
| `logo.tsx` | DESIGN.md section 8: the 36px bird mark (forest circle, sun bird; SVG lifted from the reference file) beside "Kanyonyi" in Gloock 22px over "EXPEDITIONS · UGANDA" in mono 10px, 0.14em. The same mark, simplified, becomes `app/icon.svg` and `app/apple-icon.png` |
| `on-this-page.tsx` | Tour page jump nav ("On this page": Overview · Day by day · Included · Prices · Good to know · Questions). Anchors are omitted when a tour has no such section |
| `back-to-top.tsx` | "Back to top" link on long pages (tours, guides, FAQ) |

**Commerce and content (`features/*/components/`)**

| Component | Why custom |
| --- | --- |
| `trip-card.tsx` | DESIGN.md section 10.2 anatomy: image, tag, meta line, name, summary, price, link. Built on `Card` and `Badge` |
| `trip-grid.tsx` | 1, 2 or 3 column responsive grid of cards |
| `trip-finder.tsx` | `"use client"`. Three `Select`s plus a `Button` that build a `/tours?` URL. The behaviour is product specific |
| `tour-filters.tsx` | `"use client"`. `ToggleGroup` chips plus a sort `Select` bound to the URL. Shows the results line and the empty state |
| `month-picker.tsx` | `"use client"`. 12 season-coloured bars (DESIGN.md section 10.3), built on `ToggleGroup`. The visual bar treatment is custom |
| `permit-table.tsx` | `Table` plus the fact stamp, with the column set chosen by the page |
| `price.tsx` | Renders USD and UGX spans side by side, and CSS shows the active one (see section 7). No shadcn equivalent |
| `currency-toggle.tsx` | `"use client"`. `ToggleGroup` plus `Tooltip`, which sets `data-currency` on `<html>` |
| `fact-stamp.tsx` | "Checked 4 October 2026…" line. Repeated on 6+ pages |
| `inclusion-list.tsx` | Check and dash marker lists (DESIGN.md section 10.5) with text equivalents for screen readers |
| `itinerary-day.tsx` | Day number in mono, title, labelled facts and body. Itinerary days are rendered as a semantic `<ol>`, not an accordion, so they are visible to search and AI crawlers |
| `key-facts-strip.tsx` | Hero fact strip, separated by `·` |
| `at-a-glance.tsx` | Two-column definition table (`<dl>` styled as a table: label and value pairs are definitions, not tabular data) |
| `whatsapp-fab.tsx` | `"use client"`. Floating round button plus `Popover` with copy-number fallback. The WhatsApp glyph is an inline SVG in `whatsapp-icon.tsx`, because lucide has no brand icons |
| `whatsapp-link.tsx` | Builds `https://wa.me/{number}?text=` and fires `whatsapp_click`. Used inline everywhere |
| `json-ld.tsx` | Escaped structured-data script (002) |
| `inline.tsx` | RichText renderer (001) |
| `site-image.tsx` | Wraps `next/image` with the media registry (alt text, sizes presets) and an optional caption with credit |
| `consent-banner.tsx` | `"use client"`. Copy from 02-global.md, built on `Button`. Writes the consent choice and calls `gtag('consent','update')` |
| `analytics.tsx` | Two `next/script` tags (see section 8) |
| Enquiry components | Listed in 003 |

### 6. Sun rule enforcement

"One sun button per viewport" is a review rule and can't be enforced in code. To make it easy to follow, `variant="sun"` is only used through `<PrimaryCta>` (`components/layout/primary-cta.tsx`), so a code search shows every place it appears. Placement follows the updated DESIGN.md:

- **Find trips** on the home first view. The hero itself has no button, only a text link
- **Ask about this trip** on tour pages
- **Send enquiry** on the enquiry page

The header's "Plan my trip" is always forest.

### 7. Currency toggle without client-rendered prices

Every price is server rendered twice: `<span data-ccy="usd">$1,650</span><span data-ccy="ugx">UGX 6,530,000</span>`. CSS hides the inactive one: `html[data-currency="ugx"] [data-ccy="usd"] { display:none }` and the reverse, with USD as the default. The toggle sets the attribute and stores the choice in `localStorage`. A tiny inline script in `<head>` restores it before first paint, so there is no flash. Prices stay in Server Components and static HTML, so no price component hydrates. UGX is rounded to the nearest 10,000, matching the copy's example (`USD 1,650` × 3,960 = 6,534,000, shown as `UGX 6,530,000` in 01-voice.md). The rate and its date come from `site.currency`.

### 8. GA4 and Consent Mode v2 loading

```text
<head>
  next/script strategy="beforeInteractive" (inline):
    gtag('consent','default',{ analytics_storage:'denied', ad_storage:'denied',
                               ad_user_data:'denied', ad_personalization:'denied',
                               wait_for_update: 500 })
    + restores a stored 'granted' choice from localStorage
  next/script strategy="afterInteractive":
    https://www.googletagmanager.com/gtag/js?id=G-XXXX   (only rendered when the env ID is set)
```

Advanced versus basic consent mode: **basic** is proposed. gtag.js only loads after "Accept analytics", so a visitor who rejects (or hasn't chosen) sends nothing to Google. That is the lowest-risk position under UK and EU rules for an operator selling into those markets, and conversions are still counted in Neon regardless. The cost is that GA4 can't model behaviour for non-consenting users. Frank should confirm this choice (Needs from Frank).

`ad_*` signals stay denied permanently, because the cookie banner copy says "No advertising cookies".

### 9. Photography

Images are statically imported from `public/images/` through `content/media.ts`, which gives width, height and `blurDataURL` automatically. Sourcing follows 13-photo-brief.md (27-image shot list). Until a photo exists, `site-image.tsx` renders the brief's placeholder: a flat `--muted` block at the correct aspect ratio with the alt text written on it. Captions follow "{Place and subject}. Photo: {photographer} / {source}." Size presets in `site-image.tsx` follow DESIGN.md section 7:

- hero: `sizes="100vw"`, `priority`, 16:9 desktop and 4:5 mobile through two `<Image>` elements with CSS `display` switches. `getImageProps` with `<picture>` is the documented approach for art direction, and is preferred if it works with static imports
- card: `sizes="(min-width: 1024px) 380px, (min-width: 720px) 50vw, 100vw"`, 3:2

Source files are exported at a maximum of 2400px wide and run through `sharp` (already a Next dependency) by a one-off script in `scripts/`, which also writes the 1200 × 630 OG crops.

### 10. Base UI patterns this build relies on

AGENTS.md section 0 lists the Base UI differences. These are the places they apply:

- Link-styled buttons: `<Link href="/plan-your-trip" className={cn(buttonVariants(), "...")}>` (the S2 finding below supersedes the original Button/render example)
- Sheet, Popover and Tooltip triggers: `render={<Button … />}`, never `asChild`
- Trip finder and form selects: `items` on the `Select` root, with the empty option as an item whose `value` is `null`
- Month picker, currency toggle and filter chips (`ToggleGroup`) and FAQ (`Accordion`): the `multiple` boolean, and `defaultValue` is always an array

### 11. Shell decisions made in S2 (4 October 2026)

- **Links styled as buttons** use `cn(buttonVariants(...), extra)` on a real `<Link>` or `<a>`. `<Button render={<Link />} nativeButton={false}>` makes Base UI add `role="button"`, so screen readers announce navigation as a button; Playwright caught it. Always merge with `cn`: `buttonVariants({ className })` only concatenates, so a base `inline-flex` beats a `hidden` override.
- **Floating WhatsApp button is forest, not the reference's sun.** A sun button beside "Find trips" would break DESIGN.md's one-sun-per-viewport rule.
- **Currency toggle moves into the mobile menu below 640px.** At 320 to 380px the header can't fit the logo, the toggle and the menu button.
- **Demo notice and currency choice are applied before paint** by an inline boot script (`lib/ui/boot-script.ts`) setting `html[data-demo-dismissed]` and `html[data-currency]`, so neither flashes on load.
- **Consent is basic mode:** gtag.js is only requested after "Accept analytics". Withdrawing consent reloads the page, because gtag can't be unloaded. A Playwright test confirms no request reaches googletagmanager.com after "Reject".
- **External state uses `useSyncExternalStore`** (`hooks/use-consent.ts`, `hooks/use-currency.ts`), not effects that set state; the React lint rules reject the latter.

### 12. Photography (S4, 4 October 2026)

- **Sourcing.** Unsplash's search API now needs a key and Pexels blocks automated requests, so photos were found through Unsplash search pages and downloaded from its image CDN. Each photo's page was checked for location, photographer and licence; all 15 are under the free Unsplash License (Unsplash+ excluded). Twelve were taken in Uganda, most in the park they illustrate. The about-page vehicle was photographed in Akagera, Rwanda, and the boots have no stated location, so their alt text names no Ugandan place.
- **Processing.** Files are re-encoded with sharp at 2400px wide, quality 80 (mozjpeg), with metadata stripped, plus 1200 × 630 Open Graph crops in `public/images/og/`. The Kibale chimp (a portrait original) and the Ishasha lions were cropped by hand to keep the subject in frame.
- **`site-image.tsx`** wraps `next/image` with `hero`, `card` and `inline` size presets, a blur placeholder, the photo brief's `--muted` placeholder for unsourced images, and an optional caption with the "Photo: {photographer} / Unsplash" credit. A `sizes` override exists for images in narrower columns than their preset assumes; the interim homepage needed it.
- **Open Graph.** `pageMetadata(path, { image })` uses the page's crop and falls back to the home hero.

### 13. Destination, guide and policy patterns (S6, 4 October 2026)

- Destination and guide heroes use the existing `Section`, breadcrumb and `SiteImage`, with text on the solid background and a separate captioned photo. Split layouts collapse below 720px; image sizes reflect the half-container width.
- Hubs use the installed shadcn `Card` for distinct comparable destinations/guides. Destination detail pages reuse `TripCard` and its existing `Price` and itinerary analytics.
- `ContentTable` composes shadcn `Table` with explicit column/row header scopes and wrapping cells. `PermitTable` adds the existing `FactStamp` and reads one fee registry. No shadcn file, token or component behaviour changed.
- `CloseCta` accepts an optional secondary node for the guides' FAQ link and about's WhatsApp link. Main links retain `cn(buttonVariants(), ...)`; WhatsApp retains its existing analytics and accessible external-link suffix. S6 closing actions are forest.
- `BackToTop` is now shared by guides and FAQ. Sample team entries are an explicitly labelled list, with no invented portraits or Person schema.
- The reference HTML was opened in Chromium before implementation. Desktop destinations and the 360px permit guide were also inspected visually.

## Consequences

### Homepage implementation (S7, 4 October 2026)

- Home follows the approved ten-section order, reusing `Section`, `TripCard`, `DestinationCard`, `PermitTable`, `FaqList`, `FactStamp` and `CloseCta`. `DestinationCard` accepts an H3 heading level on home; the hub keeps H2. `FactStamp` accepts a class override for contrast on the dark seasons band.
- Trip finder: installed Base UI Select with explicit `items` and null empty values; real form submission; one sun button. Month picker: installed ToggleGroup with array values, six columns on phones and twelve on desktop. Every bar has the full month and season as its accessible name, and the selected note is a polite live region. Light focus rings on the dark band meet contrast; no upstream shadcn behaviour changed.
- **Display XL fluid interpolation adjusted:** still 44–96px, now `clamp(2.75rem, 5vw, 6rem)` (96px at 1920px). The original interpolation reached 96px at 1180px and broke the full approved H1 into six tall lines in the split hero. The slower growth keeps that copy legible beside the photo without reducing the approved minimum/maximum or changing fonts. Other type tokens are unchanged.
- The photo leads on mobile and aligns to the top of the desktop text column, uses the hero aspect presets and `priority`, with sizes matched to its wider column. Space is reserved before loading. Header and floating WhatsApp remain forest; only Find trips and the distant closing CTA are sun.
- **Sticky header made opaque:** axe found the translucent background reduced the small logo subline's contrast when scrolling over the forest band. Using the existing background token fixes the real contrast failure.
- Open-select axe scans exclude only `[data-base-ui-focus-guard]`: the installed Base UI `utils/FocusGuard.js` intentionally makes these invisible redirectors focusable and aria-hidden. No audit rule is disabled, and real triggers/options remain audited. Keyboard tests cover Escape returning focus and Tab reaching the next field. Closed-page audits retain the full document without that exclusion.
- Final local browser checks identify the hero image as LCP on both profiles and initial CLS at most 0.01. Desktop and 360px hero/month layouts were inspected. ESLint now ignores generated Playwright result/report directories, preventing a scan race when the test runner replaces them.


- shadcn component files will differ from upstream in their class strings. Re-running `shadcn add --overwrite` on them would lose the brand changes. Note this in each file with a one-line comment at the top.
- No dark mode. The token structure keeps it possible later.
- The currency toggle costs 2 spans per price and about 20 lines of client JS. That is far cheaper than hydrating every price.

### Enquiry patterns (S8, 4 October 2026)

- The page composes the existing Section/breadcrumb with a form and a sticky desktop side panel, stacked below the form on mobile. The under-15 rule uses FactStamp. The only sun action is Send enquiry; success uses the existing success surface/icon tokens and forest links.
- Installed Base UI Field/Input/Select/RadioGroup/Checkbox/Button compose the form. Select roots have items including a null placeholder; full resident labels wrap within the viewport. Buttons that navigate remain real styled links. Upstream shadcn files and tokens were not changed.
- Estimates reuse Price and its prepaint USD/UGX spans. Error summaries/inline messages and success headings have tested focus and announcements. Native controls are used only inside noscript because interactive Base UI popup controls need JavaScript; the ordinary path remains shadcn.

### Verification findings (S9, 5 October 2026)

- The header/footer logo link derives its accessible name from the visible approved wordmark and subline. Its previous overriding label omitted "Uganda", failing WCAG 2.5.3 (Label in Name) in Lighthouse despite a 100 accessibility score. Removing that override changes no visible copy or styling. A Playwright regression checks both landmarks.
- All template axe scans now include `wcag21a` as well as `wcag2a`, `wcag2aa`, `wcag21aa` and `wcag22aa`; AA conformance includes the A rules.
- The trip-finder test waits for the new month popup's 13 options before reading them. Base UI retains the previous experience popup during its exit animation; the old immediate count occasionally included both popups. The component and animation are unchanged.

### Post-launch shell corrections (5 October 2026)

- The currency tooltip's `text-body-s` override was interpreted as a colour by `cn` 0.4, removing `text-background` and leaving dark text on the dark popup. Put the custom size on an inner span so the existing popup colour survives. Approved wording and shadcn Tooltip behaviour remain intact; no upstream component or token changed.
- WhatsApp fallback label sits above a wrapping number/copy row. The number itself has `whitespace-nowrap`, so narrower screens can move the copy action to the next row without splitting the phone number. Copy uses the installed shadcn Button and retains success/failure feedback. No copy was rewritten.
