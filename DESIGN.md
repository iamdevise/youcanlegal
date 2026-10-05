---
version: alpha
name: You Can Legal
description: Replication design system for youcan.legal — a bright, trustworthy relocation-services brand (work and study abroad) built on electric blue, white space, oversized Plus Jakarta Sans headlines and a navy legal-information band.
colors:
  primary: "#0067E3"
  primary-soft: "#95BDED"
  primary-tint: "#E5F0FC"
  primary-ghost: "#0067E366"
  accent-ice: "#93D2E4"
  accent-pink: "#FF3F55"
  navy-deep: "#031743"
  navy-mid: "#133C75"
  ink: "#181818"
  ink-heading: "#232323"
  text-body: "#484848"
  text-muted: "#7A7A7A"
  surface: "#FFFFFF"
  surface-tint: "#E5F0FC"
  border: "#D9D9D9"
  border-hairline: "rgba(185,185,185,0.4)"
  on-dark: "#FFFFFF"
  on-dark-placeholder: "rgba(255,255,255,0.62)"
  on-dark-placeholder-reference: "#FFFFFF3D"
  overlay-strong: "#FFFFFF4D"
  overlay-medium: "#FFFFFF33"
  overlay-soft: "#FFFFFF24"
  on-dark-watermark: "#FFFFFF1A"
  whatsapp-green: "#3CBD4D"
  error: "rgba(255,0,24,0.78)"
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 74px
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: -0.02em
  display-hero-inner:
    fontFamily: Plus Jakarta Sans
    fontSize: 62px
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: -0.02em
  hero-subtitle:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: -0.02em
  page-title:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.14
    letterSpacing: -0.02em
  section-title:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: -0.02em
  section-title-compact:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: -0.02em
  section-title-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: -0.02em
  eyebrow:
    fontFamily: Poppins
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0
  card-title-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 64px
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: -0.02em
  card-title:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: 0
  card-title-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: 0
  stat-value:
    fontFamily: Plus Jakarta Sans
    fontSize: 84px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: -0.03em
  counter-value:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: -0.03em
  counter-label:
    fontFamily: Poppins
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.55
    letterSpacing: -0.03em
  step-number:
    fontFamily: Plus Jakarta Sans
    fontSize: 96px
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: -0.02em
  step-number-ghost:
    fontFamily: Plus Jakarta Sans
    fontSize: 88px
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: -0.02em
  marquee:
    fontFamily: Plus Jakarta Sans
    fontSize: 80px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.05em
  countdown-value:
    fontFamily: Plus Jakarta Sans
    fontSize: 96px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: -0.02em
  countdown-value-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 70px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Poppins
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.67
    letterSpacing: 0
  body-md:
    fontFamily: Poppins
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  body-sm:
    fontFamily: Poppins
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.71
    letterSpacing: 0
  caption:
    fontFamily: Poppins
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.69
    letterSpacing: 0
  label-xs:
    fontFamily: Poppins
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0
  accent-italic:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0
spacing:
  base: 8px
  xs: 8px
  sm: 15px
  md: 20px
  lg: 30px
  xl: 45px
  xxl: 65px
  section: 90px
  section-xl: 137px
  gutter: 30px
  card-padding: 35px
  form-row: 20px
  container: 1200px
  container-wide: 1840px
rounded:
  xs: 6px
  sm: 7px
  md: 10px
  lg: 15px
  xl: 16px
  xxl: 20px
  card: 30px
  pill: 9999px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-dark}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.pill}"
    padding: 19px
    height: 56px
  button-primary-hover:
    backgroundColor: "{colors.primary-tint}"
    textColor: "{colors.primary}"
    rounded: "{rounded.pill}"
  button-on-image:
    backgroundColor: "{colors.overlay-strong}"
    textColor: "{colors.on-dark}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.pill}"
    padding: 19px
  button-read-more:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-dark}"
    typography: "{typography.label-md}"
    rounded: "{rounded.pill}"
    height: 48px
  nav-link:
    textColor: "{colors.ink-heading}"
    typography: "{typography.label-lg}"
    height: 106px
  nav-link-active:
    textColor: "{colors.primary}"
  ticker-text:
    typography: "{typography.marquee}"
    textColor: "{colors.ink}"
  ticker-accent-home:
    textColor: "{colors.primary}"
  ticker-accent-inner:
    textColor: "{colors.accent-pink}"
  counter-value:
    typography: "{typography.stat-value}"
    textColor: "{colors.ink-heading}"
  card-service:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.card}"
    height: 500px
    padding: 35px
  card-opportunity:
    backgroundColor: "{colors.overlay-soft}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.md}"
    padding: 20px
  card-step:
    backgroundColor: "{colors.overlay-medium}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.card}"
    padding: 50px
  testimonial-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-body}"
    rounded: "{rounded.lg}"
    padding: 35px
  team-card:
    rounded: "{rounded.lg}"
    height: 480px
  accordion-item:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.ink-heading}"
    borderColor: "{colors.primary}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.xs}"
    padding: 10px
  form-input:
    backgroundColor: transparent
    textColor: "{colors.on-dark}"
    borderColor: "{colors.on-dark}"
    typography: "{typography.body-md}"
    rounded: 0px
    height: 40px
  form-select:
    textColor: "{colors.on-dark}"
    borderColor: "{colors.on-dark}"
    typography: "{typography.body-md}"
    height: 40px
  form-check:
    textColor: "{colors.on-dark}"
    typography: "{typography.label-xs}"
  modal-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-body}"
    rounded: "{rounded.xl}"
    padding: 30px
  modal-trigger:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.xl}"
    padding: 12px
  badge-category:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-dark}"
    typography: "{typography.label-xs}"
    rounded: "{rounded.pill}"
    padding: 6px
  footer-band:
    backgroundColor: "{colors.navy-deep}"
    textColor: "{colors.on-dark}"
    padding: 60px
  footer-heading:
    textColor: "{colors.on-dark}"
    typography: "{typography.label-lg}"
  footer-link:
    textColor: "{colors.on-dark}"
    typography: "{typography.body-sm}"
  social-icon:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-dark}"
    size: 44px
  blog-hero-band:
    backgroundColor: "{colors.navy-mid}"
    textColor: "{colors.on-dark}"
    padding: 37px
  pagination-bullet:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.pill}"
    size: 44px
---

# You Can Legal — Design System

## Overview

You Can Legal is a relocation-services brand that helps people study, work and live abroad legally. Visitors arrive anxious, on a phone, often in a country where the paperwork feels hostile. The interface must therefore read as **institutional but warm**: a confident certified blue, enormous friendly headlines, generous white space, and proof of legitimacy (counters, escrow steps, offers, team faces) surfaced early and often.

The visual personality is **Bright Corporate Optimism**. Surfaces are pure white, the accent is a single electric blue, corners are soft (pills for actions, 15–30px for media and cards), and photography carries the emotional load while typography carries the authority. Depth is created by navy bands and blue-tinted overlays rather than by heavy shadows.

The build is mobile-first. 390px is the primary correctness target (stacked hero, one-up carousels, hamburger header, 44px touch targets); 1440px is the primary desktop target (1200px content column, two-column hero, five-up team carousel, three-up video and testimonial carousels). Motions are short and confident — staggered letter reveals, count-ups, marquees — never playful or bouncy.

## Colors

One dominant blue, a navy anchor, and a small set of pastel accents against uncompromised white.

- **Primary (#0067E3):** The brand's only action colour. Fills the primary buttons, the "Our services" cards, category chips, the accordion border, social tiles and every inline link. Self-limit to one primary action per viewport block.
- **Primary Soft (#95BDED):** The FAQ accordion surface — a muted blue plate that keeps the accordion readable while signalling it is interactive.
- **Primary Tint (#E5F0FC):** The button hover fill and the pale blue section wash. Hover inverts the primary button onto this tint (blue text on pale blue).
- **Accent Ice (#93D2E4):** Ice-blue used for the escrow/step icons, countdown separator dots and small highlights inside navy sections.
- **Accent Pink (#FF3F55):** A hot coral reserved for the marquee "+" glyphs on inner pages and nothing else. It sits below 4.5:1 on white, so it may only be used at large decorative type sizes (3:1 threshold) or on navy.
- **Navy Deep (#031743):** The footer brand band. Legal information, partnerships and copyright live here; it is the page's visual full stop.
- **Navy Mid (#133C75):** The blog article hero band and form-section anchor. Institutional, calmly serious.
- **Ink (#181818 / #232323):** Headlines and counters. Text body is #484848; #7A7A7A is metadata only.
- **Neutrals:** `surface` #FFFFFF page background, `border` #D9D9D9 form borders, `border-hairline` rgba(185,185,185,0.4) for editorial rules.
- **Overlays:** White at 24/33/49% alpha (`overlay-soft`, `overlay-medium`, `overlay-strong`) is the elevation kit inside navy sections; `on-dark-watermark` #FFFFFF1A is the giant ghost text behind the countdown page; `primary-ghost` is the pale step number behind active step numbers.

Contrast: primary blue on white measures ≈5.2:1 and passes AA for body text; ink on white is ≈15:1; body grey on white ≈9:1. White-on-navy combinations pass comfortably. Placeholders in the application form lose contrast at the reference value `#FFFFFF3D`; use `on-dark-placeholder` (white at 62%) so placeholder text stays legible while keeping the same look.

## Typography

Three families, each with one job.

- **Plus Jakarta Sans** (400/500/600/700/800) — every heading, counter, marquee and button label. Tight tracking (-0.02em to -0.05em) at display sizes.
- **Poppins** (400/500/600/700) — all running copy, form labels, footer lists, meta rows.
- **Playfair Display** (400/500 italic) — sparse italic accents inside editorial copy, one or two per page, never for headings.

Sizes are role-driven, not heading-tag-driven. The home hero headline is `display-hero` (74px/800) with the final emphasised words set in a different colour; every inner page hero drops to `display-hero-inner` (62px/800) with a `hero-subtitle` (32px/800) directly beneath. Section headings are `section-title` (48px/1.25), compressing to `section-title-compact` (36px) at ≤1200px and `section-title-mobile` (30px) on phones. Every section heading is preceded by an `eyebrow` line (18px Poppins 500) flanked by short divider rules and separated from the title by 15px.

Long-form reading copy is `body-lg` (18px/1.67) inside cards and `body-md` (16px/1.6) elsewhere; the collapsible SEO block uses 14px at 1.4 line-height, and footer legal text drops to `caption` (13px/1.69) with the registered-address disclaimer in a 12px muted note. Form consent labels are `label-xs` (12px).

The marquee is its own typographic object: `marquee` (80px Plus Jakarta Sans 600, -0.05em) where the "+" separators are outlined with a 2px text-stroke and coloured `primary` on the home page and `accent-pink` on inner pages.

## Layout

A fixed 1200px content column inside a full-bleed canvas, with a documented 12-column mental model.

- **Container:** 1200px max width, 15px side padding, 30px gutters (`spacing.gutter`). Tablet collapses the column to 1024px, phones to 767px. The header bar is the one exception: it stretches to a 1840px content width with 30px side padding so the logo and nav sit at the true screen edges.
- **Vertical rhythm:** sections are separated with spacer blocks rather than uniform margins. The observed ladder is 18 / 20 / 24 / 30 / 34 / 43 / 45 / 65 / 75 / 90 / 100 / 118 / 120 / 124 / 125 / 130 / 137px; use `spacing.xl` (45px) inside a block, `spacing.xxl` (65px) between blocks, `spacing.section` (90px) between sections and `spacing.section-xl` (137px) before/after the footer and hero bands.
- **Grid behaviour:** content is evenly split (hero text column / hero image column), with 19px and 30px gaps for card clusters. Cards are laid out on a repeating grid whose card counts change per breakpoint (see Responsive Behaviour).
- **Hero geometry:** the home and inner-page heroes are 762px minimum height, pulled -40px under the header so the navy/blue band meets the sticky nav edge-to-edge; inner-page heroes additionally carry -160px bottom margin so the YouTube embed overlaps upward into the hero, with the embed itself pulled -140px and rounded `rounded.card` (30px).

### Responsive Behaviour

Elementor's breakpoint set is authoritative: mobile ≤767px, tablet 768–1024px, laptop 1025–1200px, desktop ≥1201px, widescreen ≥1600px.

- **Header:** 106px-tall desktop nav row; at ≤1200px the desktop row hides and a 70px mobile bar with a hamburger appears (`mobile-header` pattern). Logo height stays 34px, side padding drops from 30px to 15px.
- **Hero:** two columns at ≥1201px, single column stacked below; the hero text stays 800-weight but steps down through 74/62 → 56 → 44 → 38px with 1.15 line-height retained.
- **Carousels:** team 5-up desktop → 2-up tablet → 1-up mobile; video and testimonial carousels 3-up → 1-up at ≤767px. Pagination moves directly under the track, centred, with 30px top margin.
- **Section headings:** 48px → 36px at ≤1200px → 30px at ≤767px. Counter values 84px → 60px on phones.
- **Collapsible SEO copy:** clamped to 42em on desktop and 10em on phones, with an 80px white gradient fade above the expand bar.
- **Footer:** four-column band → stacked single column, 30px gaps, social tiles wrap to a single row above the links.

### Per-Page Composition

- **Home `/`** — 762px split hero (eyebrow-style headline "We Help People Change Their Lives", `hero-subtitle` "Study. Work. Live Abroad — Legally.", 700+ Happy Clients counter, "Explore Opportunities" pill CTA, portrait photo) → full-bleed marquee ticker ("Work in the EU + Study in the UK +") → "Our services" (eyebrow "Choose your future", 48px title, two 500px image cards: Work in the EU, Study in the UK, white-on-image buttons, gradient to primary) → "About in numbers" (three `stat-value` counters: 5+, 20+, 12) → testimonials carousel → "Our Team" (eyebrow "professionals in their field", 5-up carousel, 480px portraits, numeric pagination 1–27, arrows) → FAQ accordion (six items, first open) → collapsible SEO copy block with Expand/Collapse bar → footer.
- **`/work-in-the-eu/`** — 62px hero ("Start Your Legal Journey in Europe") + 32px sub ("Genuine Job Offers, Visa Guidance, and Step-by-Step Support"), 367+ Happy Clients counter, Apply Now pill → #formform, full-bleed ticker "Funds secured until documents are delivered +", 16:9 YouTube embed (3-OXIVhUXDU) overlapping the hero, "Available Opportunities" grid of three navy cards (Poland / Slovakia / Serbia flag icons, 22px titles, one-line description, "Read More" modal triggers), long application form section (#formform, navy), "About in numbers", Escrow/PayKeeper four-step block (ghost 88px numbers plus 96px primary active number, 30px rounded translucent cards, 60px ice icons, 22px titles), testimonials, team carousel, FAQ, collapsible SEO copy, footer.
- **`/work-in-poland/` `/work-in-slovakia/` `/work-in-serbia/`** — identical template with one country card, its own job-offer modal (positions, salary, schedule, accommodation, documents, step-by-step process, requirements; Slovakia cost 1800€), and the country video (Poland 3-OXIVhUXDU, Slovakia qhbwKipLmJw, Serbia TXum5VW7Gts).
- **`/study-in-the-uk/`** — full-viewport coming-soon page: `cs-bg-1.webp` background cover, 170px ghost watermark word in #FFFFFF1A behind the logo lockup, 72px white title, and a live Hours / Minutes / Seconds countdown at `countdown-value` (96px) with ice-blue separator dots, 36px label padding, and a 70px mobile countdown.
- **`/privacy-policy/`** — ticker band on top (marquee, pink "+") followed by a single 1200px text column: 32px navy-adjacent headings, `body-md` paragraphs, generous 30px block spacing, no cards.
- **`/category/legal-advice/` and seven article pages** — archive is a single-column list: "Category: Legal Advice" archive heading, then cards with a `badge-category` chip, a meta row (date as DD.MM.YYYY, "by admin"), a 32px title, a 3-line excerpt and a "Read More" pill. Article pages open with a #133C75 band (475px top padding, 37px bottom padding) carrying the chip, a white `page-title` headline, the same meta row plus comment count and like control; share links (Twitter / Facebook / LinkedIn), Prev/Next post navigation, a related-posts carousel of 22px titles, a comment form ("Your Name*", "Your Email*", "Website", "Your Comment…", cookies checkbox, Leave a Reply heading) and a sidebar with search and a Categories widget.

### Brand And Media Assets

All assets below are owner-supplied brand material and should be reused at the stated placement rather than re-created.

- Header/footer logo: `https://www.youcan.legal/wp-content/uploads/2025/11/Logo-YOU-CAN-LEGAL-Horizont.svg` (34px tall in the header), vertical variant `Logo-YOU-CAN-LEGAL-Vertical-R.png` for the dark footer band; favicons `fav-1-150x150.png`, `fav-1-300x300.png`.
- Home hero portrait: `2025/11/man.png` (1024×1024); hero client strip: `2025/11/face-2.webp` (331×141).
- Service card backgrounds: `2025/11/study-1.jpg` (Study in the UK) with the primary gradient overlay retained.
- Representative-office map: `2025/07/map.webp` (1024×780).
- Coming-soon background: `2025/07/cs-bg-1.webp`.
- Team portraits follow `2025/MM/<name>-740x960.jpg` (480px rendered height in the carousel, 27 members).
- Country flag icons: `elementor/thumbs/slov-*.png`, `serbia-*.png`, Poland equivalent from the same uploads folder.
- Social profile URLs: facebook.com/youcanlegal, youtube.com/@youcanlegal, instagram.com/you_can_legal, linkedin.com/company/you-can-legal, tiktok.com/@you_can_legal.

## Elevation & Depth

The system is **flat-with-bands**. There are no long drop shadows on cards; hierarchy comes from four deliberate devices:

1. **Navy bands** (`navy-deep` footer, `navy-mid` blog hero and form section) that cut the white page into clear chapters.
2. **Blue-tinted glass** — translucent white plates at 24%, 33% and 49% alpha layered onto navy for opportunity, step and offer cards.
3. **Gradient veils** — service cards carry `linear-gradient(180deg, #0067E300 55%, #0067E3 100%)` so white headlines stay legible over photography; a white-to-transparent gradient fades the bottom of the collapsible SEO copy.
4. **Ghost numerals** — 88px step numbers at `primary-ghost` behind the active 96px solid number; the coming-soon page does the same with a 170px #FFFFFF1A watermark.

Where shadow is used it is minimal: a soft 1px–2px spread on the sticky header while scrolling and on floating modals (`0 10px 40px rgba(0,0,0,0.18)`). Image treatments: full-bleed cover photos, 15–30px radii, rounded-square avatars clipped to circles only in testimonial metas (60px). Video embeds render at 16:9 with a 30px radius and a red rounded-rectangle play button over a darkening gradient.

## Shapes

Shape language is **soft geometry**: pills for people-facing actions, rounded rectangles for content, sharp underline-only fields for forms.

- Primary and secondary buttons are full pills (`rounded.pill`), 56px tall with 19px horizontal padding; the on-image variant keeps the pill but uses a 49%-white translucent fill so photography reads through.
- Media, service cards and step cards use `rounded.card` (30px); article and testimonial cards use `rounded.lg` (15px); small opportunity tiles use `rounded.md` (10px); modals and modal triggers use `rounded.xl` (16px).
- The FAQ accordion is the one deliberately tighter shape: 6px radius on a #95BDED plate with a 1px #0067E3 border, 10px inner padding and 6px vertical margins.
- Form fields are underline-only (1px solid white bottom border, no radius, 40px tall) so the navy form section keeps a clean, document-like tone. Selects add a custom white chevron on the right at 15px inset.
- Category chips, pagination bullets and counter suffixes are pills; images inside carousels use 20px radii.

## Components

**Buttons.** `button-primary` is blue (#0067E3) with white `label-lg` text on a pill, 56px tall; hover swaps to `button-primary-hover` (pale `primary-tint` fill, blue text) with a 0.3s transition and a subtle lift. Buttons carrying an arrow icon animate the icon gap from 36px to 19px on hover/focus. `button-on-image` is used inside service cards over the blue gradient. `button-read-more` (48px, `label-md`) is used on blog cards and inside offer modals. Every interactive control keeps a ≥44×44px hit area and a visible focus ring (`2px solid #0067E3` with a 2px white offset on light surfaces, inverse on navy).

**Header and navigation.** White sticky bar; 34px horizontal logo; six nav items (Home, Services, Facts, Testimonials, Team, Contacts) where anchor items scroll to `#serv`, `#facts`, `#testimonials`, `#team`, `#contacts`; the active item is `primary` blue. Desktop nav height is 106px; below 1201px the nav collapses to a 70px bar with a hamburger that opens a full-height white panel with the same items at `page-title`-scale type.

**Tickers.** Two marquee variants built from a duplicated track: 80px `marquee` type, 65px gap, 150s linear infinite loop, hover-to-pause. Home variant colours the "+" separators `primary`; inner-page variant colours them `accent-pink` with a 2px text stroke. The track must duplicate its content 2× for a seamless loop and must respect `prefers-reduced-motion` by pausing.

**Counters.** Animated count-up (`0 → target` over 1200ms ease-out, triggered once at 50% viewport intersection) with a pill-less "+" suffix. Hero counters use `counter-value` (48px) with an 18px `counter-label` offset 20px to the right and aligned to the baseline; the "About in numbers" row uses `stat-value` (84px, → 60px mobile) with a label underneath.

**Service and opportunity cards.** Service cards: 500px tall, cover photo, primary gradient veil, `card-title-xl` white headline, ghost Arabic numeral, translucent 49% white button bottom-left. Opportunity cards: 10px radius, 35px padding + 105px bottom room for the floating trigger, flag icon, `card-title-sm` white title, one-line description; hover inverts the "Read More" trigger to white fill with black text. Clicking opens a modal.

**Offer modals.** Centred white panel (16px radius, 30px padding) over a dimmed backdrop, `fadeInDown` entry (~250ms), title row with a × close button, scrollable body of bold-label + value paragraphs and lists, and a full-width "Close" button pinned at the bottom. ESC and backdrop click dismiss; focus is trapped while open.

**Testimonials.** Swiper with 800ms slide transitions and an optional 3-D transform style; 1.3em quote, then a 60px circular avatar with name (600) and role (0.85em muted) on one line; centred numeric/bullet pagination 30px below the track.

**Team carousel.** 5-up (30px gaps), 2-up tablet, 1-up mobile; 480px-tall portraits at `rounded.lg`, name and role beneath; numeric pagination bullets 1–27 with prev/next arrows, centred under the track.

**FAQ accordion.** Native `<details>` semantics: a #95BDED plate with a 1px #0067E3 border, 6px radius, 10px padding, 6px vertical margins; title at 20px/600; a +/− icon 15px on the leading edge; a 400ms open/close animation; only one item open at a time (first item open by default). The summary is keyboard-focusable with an aria-expanded state.

**Application form.** Navy section anchored `#formform`, all text white. Field order: Citizenship (searchable country selector with flag dropdown, ~200 countries, native-name search) → "Do you live in the country that issued your passport?" radio Yes/No (default Yes) → conditional "Which country do you live in?" select shown only for No → Your Full Name → How old are you? (number, numeric keypad) → Your Email → WhatsApp number with a country-code picker and a green #3CBD4D WhatsApp icon → "I am" select (I'm looking for a job for myself / I represent an agency and have clients) → three consent checkboxes (administrative-fee acknowledgement, paid-guidance + no-visa-sponsorship acknowledgement, contact + privacy-policy consent, the last being required) → optional anti-spam challenge placeholder (Cloudflare Turnstile slot, `interaction-only` appearance) → full-width "Apply Now" submit. Field labels sit above inputs at 16px; underline inputs are 40px tall with 62%-white placeholders; selects render a white chevron 15px from the right edge; consent rows are 12px with 20px vertical margins. Inline error state: white 600-weight text on `error` (rgba(255,0,24,0.78)), 10px radius, 10px padding, 24px line-height, 15px top margin. Success replaces the block with an 18px 600-weight confirmation message.

**Collapsible SEO block.** 14px/1.4 copy clamped to 42em (10em on mobile) with an 80px white fade at the bottom, a 1px #CCC top-ruled "Expand ▼" bar (17px/500, 12px padding, 8px gap), and a 0.4s max-height transition while the chevron rotates 180° in 0.3s; the label toggles Expand ↔ Collapse.

**Blog components.** `badge-category` pill chip; meta row with 13px date/author separated by 15px; 32px card title that shifts to `primary` on hover; 3-line clamped excerpt; Read More pill; article share links as icon-only 44px targets with accessible names; prev/next post row split left/right with 20px arrows; related-posts carousel reusing the card at 22px titles.

**Footer.** Light top area: "Find us" eyebrow block ("Representative office", "(by appointment only)"), country infobox "Poland — Ogrodowa 31, 00-894 Warszawa" with the map image right-aligned and scaled 2.2× on mobile. Navy `footer-band` (#031743, 60px vertical padding, 30px column gaps): vertical logo, five social tiles (44px, brand-coloured, TikTok black), "Available Opportunities" (Work in Poland / Work in Slovakia / Work in Serbia), "Legal Information" (YOU CAN LEGAL SERVICES LTD, company number 16872568, Companies House verification link, 167-169 Great Portland Street, London W1W 5PF, plus the 12px note that this is a registered address only), and "Partnerships" (hello@youcan.legal). Section headings are 20px/600 white; links are 14px/24px white with underline-on-hover. Bottom bar: "All Rights Reserved" plus the Privacy Policy link, 13px.

### Motion And States

- **Text reveal:** hero headlines animate per letter or per word with `fadeInRight`/`fadeIn` and a 50ms stagger (`--wgl-text-delay` 50/100/150…ms), 400–500ms duration.
- **Scroll reveal:** blocks start invisible and fade up/right/fade over 600ms with 100–500ms delays once 20% visible; never animate the whole page at once.
- **Count-up:** 1200ms per counter, once per page load.
- **Marquee:** 150s linear infinite, 65px gap, pause on hover; disabled under `prefers-reduced-motion`.
- **Carousels:** 800ms transitions, swipe on touch, arrows and clickable pagination persistent.
- **Hover/click:** 0.4s background transitions on info and step cards; 0.3s on buttons; accordion 400ms; SEO collapse 400ms. Active and focus-visible states must be visually distinct from hover, and no state may rely on colour alone.
- **Reduced motion:** every transform-based reveal, the marquee and the counters degrade to static final states.

## Do's and Don'ts

- Do keep exactly one #0067E3 primary action per viewport block; secondary actions use the pale tint or a text link.
- Do keep body copy at ≥4.5:1 on its surface — use #484848 or darker for text, and replace the reference's low-contrast #FFFFFF3D placeholders with the 62%-white equivalent.
- Do reserve #FF3F55 for large decorative marquee glyphs only; it fails AA at body sizes on white.
- Do enforce a 44×44 CSS-pixel minimum for every tap target (buttons, nav rows, social tiles, pagination, close buttons, checkboxes with their labels).
- Do provide a visible focus indicator on all interactive elements, including accordion summaries, carousel arrows and modal triggers.
- Don't introduce a second accent hue; the palette is blue, navy, ice, white and one coral.
- Don't mix radii arbitrarily — pills for actions, 15/30px for media and cards, 6px only inside the FAQ accordion, 0px only on form fields.
- Don't add drop shadows to cards; use navy bands, translucent white plates and glass overlays for depth.
- Don't set headings in Poppins or body copy in Plus Jakarta Sans, and don't let Playfair Display appear outside short editorial italic accents.
- Don't animate marquees, counters or staged reveals when `prefers-reduced-motion` is set.
- Don't re-create logos, team portraits, service photography or flag icons — reuse the owner's asset URLs listed above.
