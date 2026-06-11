# THALOS CONSTRUCTION — FINAL BUILD SPEC
**Direction: HEAVY GAUGE** (drawing-set dark) with grafted conversion machinery from "The Handshake" and credibility/title-block details from "Datum."

---

## 0. Ground rules (non-negotiable)

- **No invented facts.** No license numbers, no years-in-business, no project counts, no testimonials, no street address. Every unknown is a visibly bracketed token: `[PHONE]`, `[EMAIL]`, `[SERVICE AREA]`, `[LICENSE # — CONFIRM WITH STEVEN]`. Each token also gets an adjacent HTML comment: `<!-- TODO: replace with real value from Steven -->`.
- **One conversion:** request a free quote (form submit or tap-to-call). Every section's last line points at it.
- **Pure static:** single `index.html` + `css/style.css` + `js/main.js` + `assets/` (inline SVG favicon). No frameworks, no build step. Hosted on GitHub Pages or Cloudflare Pages with `CNAME` file containing `thalos.com`.
- **Amber scarcity rule (the design law):** `#F2A900` may ONLY appear on: CTA buttons, phone numbers, stat numerals, dimension-line arrows, the one hero survey-marker crosshair, hover/focus states, and the inverted conversion section background. Nothing else. If amber appears anywhere decorative, remove it.
- **No social icons anywhere** until real profiles exist.
- **JS is enhancement only.** The page must be fully readable and the form must be submittable with JS disabled.

---

## 1. Palette (exact)

| Hex | Role |
|---|---|
| `#111315` | Page background — near-black cool charcoal. Everything sits on this. |
| `#1B1E22` | Surface — raised panels, cards, form fields, figure-frame fill. |
| `#2A2E33` | Hairlines — card borders, the 1px blueprint grid, datum rules, dividers. |
| `#F2A900` | Primary accent (safety amber) — conversion surfaces ONLY (see scarcity rule). |
| `#D99400` | Amber hover/pressed state. |
| `#3E5C76` | Blueprint steel-blue — grid crosshairs, annotation ticks, dimension lines, at 30–40% opacity. Never for text. |
| `#ECEDE8` | Primary text — warm bone white (never pure #FFF). |
| `#9AA0A6` | Muted text — captions, mono labels, footer meta. (≈4.6:1 on #111315 — captions only, never body copy.) |

CSS custom properties: `--bg`, `--surface`, `--line`, `--amber`, `--amber-press`, `--steel`, `--ink`, `--muted`. Buttons: `#111315` text on amber fill (high contrast). Amber text on `#111315` ≈ 8:1 — safe at all sizes.

## 2. Typography (all Google Fonts, free)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@500&family=Inter:wght@400;600&family=IBM+Plex+Mono:wght@400&display=swap" rel="stylesheet">
```

- **Anton 400** — display only, ALL CAPS, `letter-spacing: -0.01em`. Hero: `clamp(3.5rem, 9vw, 8rem)`, `line-height: 0.95`. Section titles: `clamp(2rem, 4vw, 2.75rem)`. Never below ~28px.
- **Oswald 500** — nav, kickers, ticker, card titles (caps, `letter-spacing: 0.04em`).
- **Inter** — body 400 at 17px / 1.6; buttons & labels 600; `font-variant-numeric: tabular-nums` on all stat numerals.
- **IBM Plex Mono 400** — the annotation voice: FIG labels, sheet labels, phone numbers, placeholder tokens, dimension readings, title-block strip. This font IS the drawing-set language; never use it for body copy.

## 3. Copy voice

Jobsite plain talk, hammer-blow rhythm. Declarative sentences mostly under eight words. First person plural. Banned: "premier," "trusted," "passionate," "dream," "solutions," "excellence," exclamation points. Talk about slabs, framing, punch lists, fixed quotes, sign-offs. Owner section switches to Steven's first person (Handshake graft). Every section ends pointing at the free quote: the quote costs nothing, the work is permanent.

---

## 4. Global chrome

### 4a. Background system
On `body`: blueprint grid via two `repeating-linear-gradient`s — 1px `#2A2E33` lines every 64px, horizontal + vertical, under content (`background-attachment: fixed` desktop only). Sparse steel-blue crosshairs: a small inline-SVG `+` (12px, `#3E5C76` @ 35%) absolutely positioned at ~6 grid intersections per viewport-height of page, placed manually in hero and footer only (keep middle sections cleaner so cards pop).

### 4b. Header (sticky)
72px bar, `#111315` @ 92% + `backdrop-filter: blur(8px)`, 1px `#2A2E33` bottom border. Left: amber 16px square + `THALOS` in Anton 28px. Center (desktop): Oswald nav — SERVICES / PROCESS / WORK / ABOUT / FAQ (anchor links, `scroll-behavior: smooth`, disabled under `prefers-reduced-motion`). Right: `[PHONE]` in Plex Mono as `tel:` link <!-- TODO --> + solid amber button `FREE QUOTE` (anchors to `#quote`). After 600px scroll, header compresses to 56px (single class toggle from one scroll listener).

### 4c. Mobile sticky bottom bar (highest-converting element — build first)
`position: fixed; bottom: 0` on <768px only, 64px tall, `#111315` with amber top hairline, two half-width buttons: solid amber `FREE QUOTE` (anchor `#quote`) and bordered `CALL` (`href="tel:[PHONE]"` <!-- TODO -->). Add `padding-bottom: env(safe-area-inset-bottom)`. Give `main` matching bottom padding so the footer is never obscured. Hide the bar while the `#quote` section is on screen (IntersectionObserver) so it never covers the form it points to.

### 4d. The figure-frame component (`.fig`) — the placeholder system
Every image slot on the site is one reusable component:
- Container: `#1B1E22` fill, 1px `#2A2E33` border, fixed aspect ratio per slot (`aspect-ratio` CSS).
- **Hazard tab:** 56px right triangle clipping the top-right corner — `clip-path: polygon(100% 0, 0 0, 100% 100%)` on a pseudo-element filled with `repeating-linear-gradient(45deg, #F2A900 0 8px, #111315 8px 16px)`. (Exception to amber scarcity: hazard tabs are part of the FIG conversion-adjacent chrome — keep them small.)
- **Dimension ticks:** on bottom and left edges, 1px `#3E5C76` @ 40% lines with end ticks (pseudo-elements), and a Plex Mono reading like `2400 × 1600` in `#9AA0A6` 11px.
- **Centered label**, Plex Mono 12px `#9AA0A6`, three lines: `FIG. 04` / `KITCHEN REMODEL — AFTER` / `PHOTO PENDING`. The middle line literally tells Steven what to shoot.
- **Photo swap path:** `<img>` dropped inside `.fig` gets `position:absolute; inset:0; object-fit:cover`; the label collapses to a single bottom-left caption bar (`FIG. 04 — KITCHEN REMODEL`) via a `.has-photo` class. Annotation chrome (tab, ticks) stays forever — it becomes the portfolio's signature style. Document this in a comment on the first `.fig`.

### 4e. Section opener — the "sheet rule" (Datum graft)
Every section opens with a full-width 1px `#2A2E33` rule carrying: left, a Plex Mono label (`SHEET 02 — WHAT WE BUILD`) sitting on the line in a `#111315` chip; right, three tiny steel-blue ticks. Behind each section title, a giant ghost numeral (`02`) in Anton, `-webkit-text-stroke: 1px #2A2E33`, transparent fill, ~12rem, absolutely positioned, `aria-hidden="true"`. The page flips like a set of construction documents.

---

## 5. Page structure, section by section

### SHEET 00 — HERO (88vh desktop)
12-col grid, blueprint grid visible, a few steel-blue crosshairs; the ONE amber crosshair sits just left of the headline like a survey marker.

**Left (cols 1–7):**
- Kicker: 24px amber rule + Plex Mono caps `GENERAL CONTRACTOR — [SERVICE AREA]` <!-- TODO -->
- Headline, Anton, three stacked lines: `BUILT ONCE.` / `BUILT RIGHT.` / `BUILT BY THALOS.` — middle line outline-only: `color: transparent; -webkit-text-stroke: 2px #F2A900;` with solid-amber fallback via `@supports not (-webkit-text-stroke: 1px)`.
- One Inter sentence: *"New builds, remodels, and additions. One crew, one point of contact, one fixed quote."*
- CTA pair: solid amber `GET A FREE QUOTE` (→ `#quote`) + ghost-bordered `CALL [PHONE]` (`tel:`). Both ≥48px tall.

**Right (cols 8–12):** flagship `.fig`, 4:5, label `FIG. 01 / FLAGSHIP PROJECT — EXTERIOR / PHOTO PENDING`, dimension reading `2400 × 1600`.

**Bottom edge — capability ticker:** full-width strip, 1px rules top/bottom, Oswald caps `NEW CONSTRUCTION ◆ REMODELING ◆ ADDITIONS ◆ KITCHENS & BATHS ◆ [SERVICE TBD]`, amber diamonds, duplicated content scrolling via CSS `@keyframes` translateX at ~40s/loop; `:hover` and `prefers-reduced-motion` pause it (static, no JS).

**Mobile:** headline ~`2.6rem`, FIG drops below headline at 16:10, CTAs stack full-width, sticky bottom bar takes over.

### SHEET 01 — TITLE BLOCK (credibility strip — Datum graft)
Slim band under the hero, hairlines top/bottom, four Plex Mono items separated by steel-blue tick marks, centered, wrapping 2×2 on mobile:
`LICENSED & INSURED — [LICENSE #]` <!-- TODO --> `· RESIDENTIAL + LIGHT COMMERCIAL · FREE WRITTEN ESTIMATES · SERVING [SERVICE AREA]` <!-- TODO -->
Reads like a drawing sheet's title block. Generically true or bracketed — nothing invented.

### SHEET 02 — WHAT WE BUILD (services, `#services`)
Heading: `WHAT WE BUILD`. Intro line: *"One crew for the whole job."*
2×3 grid desktop (auto-fit `minmax(280px, 1fr)` so 4, 5, or 7 cards never break), 1-col mobile. Each card: `#1B1E22`, 1px border, ghost outline numeral (01–06) top-right, Oswald title, one plain Inter sentence, amber text link `Get a quote for this →`.

**Editability (Handshake graft — structural):** cards render from one array at the top of `main.js`:
```js
// ===== EDIT SERVICES HERE — add/remove lines, nothing else changes =====
const SERVICES = [
  { id: 'new-construction', title: 'New Construction', blurb: 'Ground-up builds, slab to ridgeline.' },
  { id: 'remodeling',       title: 'Remodeling & Renovation', blurb: 'Kitchens, baths, whole homes. Done right once.' },
  { id: 'additions',        title: 'Additions', blurb: 'More room without moving.' },
  { id: 'kitchens-baths',   title: 'Kitchens & Baths', blurb: 'The two rooms that sell a house.' },
  { id: 'light-commercial', title: 'Light Commercial', blurb: 'Storefronts, offices, fit-outs.' },
  // { id: 'service-tbd',   title: '[SERVICE TBD]', blurb: 'Confirm final list with Steven.' },
];
```
The same array populates the form's Project Type `<select>`. A static HTML copy of the six cards lives in `index.html` inside `<noscript>`-safe markup (JS replaces it; without JS the hardcoded list stands). Each card's link carries `data-service="kitchens-baths"`; clicking scrolls to `#quote` and pre-selects that option.
Closing line: *"Not sure where your project fits? Ask. The quote is free."*

### SHEET 03 — FROM QUOTE TO KEYS (process, `#process`)
Four steps connected by a horizontal amber dimension line with arrowheads (CSS borders + rotated pseudo-elements), each step at a tick:
- `01 SITE VISIT` — *We walk it with you. Free.*
- `02 FIXED QUOTE` — *Numbers in writing. No surprises.*
- `03 THE BUILD` — *One crew. One point of contact.*
- `04 WALKTHROUGH` — *You sign off when it's right — before final payment.* (Handshake's strongest trust line)
Numerals: big Anton, amber. Mobile: line runs vertically down the left edge, steps stack.
Closing inline CTA: *"Step 01 costs you nothing."* + amber `GET A FREE QUOTE` text link.

### SHEET 04 — THE WORK (gallery, `#work`)
Heading: `THE WORK`. Staggered grid (CSS grid, `grid-auto-flow: dense`): six `.fig` frames in mixed ratios:
- `FIG. 03 / EXTERIOR — FINISHED FACADE / PHOTO PENDING` (4:3, spans 2 cols — the feature)
- `FIG. 04 / KITCHEN REMODEL — AFTER / PHOTO PENDING` (1:1)
- **`FIG. 05a / 05b — BATH REMODEL, BEFORE / AFTER`** — two frames clipped together as one unit with a single shared annotation bracket spanning both (Handshake graft; pre-wires a future before/after slider — note this in a comment)
- `FIG. 06 / DECK & ADDITION / PHOTO PENDING` (3:4)
- `FIG. 07 / FRAMING DAY / PHOTO PENDING` (1:1)
Below the grid, one centered line (Datum graft): *"Photography of completed projects is being prepared. Ask us to walk you through recent work — `[PHONE]`."* <!-- TODO --> (tel: link, mono, amber).

### SHEET 05 — WHY THALOS (stat band)
Full-width band, `#1B1E22`, hairlines. Three (optionally four) huge Anton amber numerals with Inter labels — **inherently true, zero invented claims:**
- `$0` — every quote is free
- `1` — point of contact on every job
- `100%` — owner-involved builds
- Fourth slot ships commented out: `<!-- [XX]+ YEARS — uncomment when Steven confirms the real number -->`
Beneath: `Licensed & insured — [LICENSE # — CONFIRM WITH STEVEN]` in mono, visibly bracketed.

### SHEET 06 — THE NAME ON EVERY JOB (owner, `#about`)
Two columns. **Left:** 3:4 `.fig` — `FIG. 08 / STEVEN LOPEZ — OWNER, ON SITE / PHOTO PENDING`. **Right:** Anton header `THE NAME ON EVERY JOB`, then Steven's first-person note (Handshake voice graft), built only on what we know:
> *"I'm Steven Lopez. Thalos is my name on the line, so here's the deal: you get a written quote before we start, one crew with one point of contact, and a final walkthrough where you tell me we're done — not the other way around."*
Signature line: `Steven Lopez — Owner` in Plex Mono (no script font — keeps the drawing-set language pure). Amber pull-line: *"When you call Thalos, you get Steven."* + `CALL [PHONE]` <!-- TODO -->. No founding-year stories, no invented bio.

### SHEET 07 — WHERE WE WORK + STRAIGHT ANSWERS (`#faq`, Handshake graft)
Split layout. **Left — service area card:** `#1B1E22` panel with an inline SVG: amber map pin, three concentric dashed radius rings in steel-blue @ 40%, blueprint-styled. Headline: `[SERVICE AREA] AND SURROUNDING TOWNS` <!-- TODO -->. Subline: *"Not sure if we cover you? Call — if we can't take the job, we'll say so."*
**Right — FAQ accordion:** native `<details>/<summary>` (zero JS), five rows on `#1B1E22` with hairline dividers, summary in Oswald caps with an amber `+` that rotates via `details[open]`:
1. *Is the quote really free?* — Yes. Site visit, written numbers, no obligation.
2. *Are you licensed and insured?* — `[ANSWER PENDING — CONFIRM LICENSE/INSURANCE DETAILS WITH STEVEN]`
3. *Do you handle permits?* — `[ANSWER PENDING — CONFIRM WITH STEVEN]`
4. *How do payments work?* — `[ANSWER PENDING — CONFIRM SCHEDULE WITH STEVEN]`
5. *How soon can you start?* — `[ANSWER PENDING — CONFIRM LEAD TIMES WITH STEVEN]`
Every answer ends with a soft amber link: *Ask us directly →* (`#quote`). All pending answers are bracketed on the page AND flagged in comments — honest placeholders, never fabricated.

### SHEET 08 — GET YOUR FREE QUOTE (`#quote` — the inverted flare)
The ONE inverted section: solid `#F2A900` background, near-black content. Hazard-stripe ribbons (8px, the same 45° gradient) cap top and bottom edges.
**Left:** giant `#111315` Anton: `THE QUOTE IS FREE.` / `THE WORK IS PERMANENT.` Oversized Plex Mono `tel:` number `[PHONE]` <!-- TODO --> + `SERVING [SERVICE AREA]` <!-- TODO -->.
**Right:** form card on `#111315`:
- Fields: Name*, Phone* (`type="tel"`), Email, Project Type (`<select>` fed by `SERVICES`), Message. Inputs: `#1B1E22` fill, 1px `#2A2E33` border, bone text, 2px amber border on `:focus-visible`. Labels always visible (no placeholder-as-label).
- Submit: full-width amber `REQUEST MY FREE QUOTE`.
- Under the button (Handshake graft): *"No spam, no obligation. A real person reads this."* + (Datum graft) *"We reply within one business day."*
- **Wiring:** `<form action="https://api.web3forms.com/submit" method="POST">` with `<input type="hidden" name="access_key" value="[WEB3FORMS_KEY — free at web3forms.com, takes 2 min]">`, hidden `subject` ("New quote request — thalos.com"), honeypot `<input type="checkbox" name="botcheck" class="hidden">`. Works with zero JS (Web3Forms hosted redirect). JS enhancement: intercept submit with `fetch`, swap the card's innerHTML to a success state — Anton: `GOT IT.` Inter: *"Steven will call you."* Comment block documents the FormSubmit.co alternative and a `mailto:[EMAIL]` last-resort fallback.
- Pre-fill hook: `?service=` param or `data-service` clicks set the select's value.

### FOOTER
Back to `#111315`, blueprint grid faint, one steel-blue crosshair. Three columns: (1) amber square + `THALOS` + one line: *"General contractor. New builds, remodels, additions."* (2) anchor nav + the services list (rendered from the same `SERVICES` array, static fallback). (3) contact block in mono — `[PHONE]` (tel:), `[EMAIL]` (mailto:), `[SERVICE AREA]`, `LICENSED & INSURED — [LICENSE #]` <!-- TODO each -->. No social icons (hard rule until real profiles exist).
Final slim amber bar, full-width tel: link: `FREE QUOTES — CALL [PHONE]`.
Mono small print: `© 2026 Thalos Construction — thalos.com`.

---

## 6. JS budget (entire `main.js` < 120 lines, no libraries)
1. `SERVICES` array → renders service cards + both `<select>` population + footer list (static HTML fallback in place).
2. One scroll listener → header compress class.
3. IntersectionObserver → hide mobile sticky bar while `#quote` visible.
4. `data-service` click → scroll + pre-select.
5. Form fetch enhancement + success state.
6. Top of file: `const SITE = { phone: '[PHONE]', email: '[EMAIL]', area: '[SERVICE AREA]' }` injected into all `[data-bind]` spans — Steven's real contact info gets edited in exactly one place; HTML fallback keeps bracketed tokens visible without JS.

## 7. Accessibility, performance, SEO
- Semantic landmarks (`header/nav/main/section/footer`), skip link, one `h1`, `aria-hidden` on ghost numerals and decorative SVG, `aria-label` on icon-less mono links. Focus style: 2px amber outline + 2px offset, everywhere.
- `prefers-reduced-motion`: ticker static, smooth-scroll off, no transitions.
- Contrast verified: bone on charcoal ≈ 15:1; amber on charcoal ≈ 8:1; charcoal on amber ≈ 8:1; muted `#9AA0A6` reserved for ≥11px captions.
- Zero raster images at launch → page weight ≈ fonts + ~30KB code. `font-display: swap`. Lighthouse 95+ expected.
- `<title>Thalos Construction — General Contractor | Free Quotes</title>`, meta description, OG tags (OG image: a 1200×630 export of the FIG.01 frame style), `LocalBusiness` JSON-LD with only true fields (name, url, `[PHONE]` flagged TODO — ship the script commented out until tokens are real, so no placeholder data leaks to crawlers).
- Deploy: repo → GitHub Pages or Cloudflare Pages, `CNAME` file = `thalos.com`, DNS A/CNAME records per host docs. HTTPS automatic. $0 total.

## 8. Build order (for the developer)
1. Tokens + CSS variables + type scale + blueprint background.
2. `.fig` component (it appears 9 times — get it perfect once).
3. Sheet-rule section opener + ghost numerals.
4. Header + mobile sticky bar + hero.
5. Sections in order; FAQ and form are plain-HTML functional before any JS.
6. `main.js` enhancements; test with JS disabled.
7. Real-device mobile pass: thumb reach on sticky bar, ticker performance, form keyboard behavior.
8. Photo-swap dry run: drop any test image into FIG.01, verify `.has-photo` caption collapse, then remove it.