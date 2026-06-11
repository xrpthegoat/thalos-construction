# Thalos Construction — Website

Standalone static site. No build step, no frameworks, no paid services.
**This project is independent — not part of any other system.**

**Live at:** https://xrpthegoat.github.io/thalos-construction/ (GitHub Pages, free)
Repo: https://github.com/xrpthegoat/thalos-construction — push to `main` to redeploy.

## Brand

- Navy `#0A1422` background / `#101D31` surfaces / `#1C2E47` hairlines
- Brushed gold `#C9A24F` (gradient `--gold-grad`) — conversion accents only
- Primary slogan: **"You imagine it, we build it."** (hero)
- Secondary slogan: "Your dream, our passion." (owner section)

## Files

- `index.html` — the whole page
- `css/style.css` — all styling (design tokens at the top)
- `js/main.js` — enhancements only; the site works with JS off
- `images/` — drop real photos here when they arrive
- `DESIGN-SPEC.md` — the full design spec the site was built from

## Before launch — fill in the real facts (5 minutes)

Open `js/main.js` and edit the `SITE` block at the top:

```js
const SITE = {
  phone: '(203) ...',      // Steven's business line
  email: 'steven@...',     // where leads should land
  area: '...',             // e.g. 'Stamford, CT'
  license: 'CT HIC #...',  // real license number
};
```

That one edit updates the phone/email/area/license everywhere on the page.
Also search `index.html` for `TODO` — the FAQ answers and license strip have
bracketed placeholders that need Steven's real answers. **Never publish with
invented facts — the brackets are deliberate.**

## Make the contact form work (free, ~2 minutes)

1. Go to https://web3forms.com and enter the email that should receive leads.
2. Copy the access key it gives you.
3. In `index.html`, paste it into:
   `<input type="hidden" name="access_key" value="PASTE KEY HERE">`

No account, no cost, unlimited-ish submissions. (Alternative: FormSubmit.co —
instructions in the comment above the form.)

## Swap in real photos

Every gray frame is a `.fig` component with a label saying exactly what photo
goes there (e.g. `FIG. 04 — KITCHEN REMODEL — AFTER`). To swap one in:

1. Put the photo in `images/` (e.g. `images/kitchen-after.jpg`)
2. In `index.html`, find that `.fig`, add the class `has-photo`, and insert the
   image as the first child:

```html
<figure class="fig has-photo" style="--ratio: 1 / 1;">
  <img src="images/kitchen-after.jpg" alt="Remodeled kitchen with white cabinets">
  ...existing label stays — it becomes the caption...
</figure>
```

The "PHOTO PENDING" line disappears automatically; the annotation style stays.

## Deploy for $0

**Option A — Cloudflare Pages (recommended):**
1. Create a free Cloudflare account → Workers & Pages → Create → Pages →
   Upload assets → drag this folder in. Live in under a minute at
   `something.pages.dev`.
2. Custom domain tab → add the real domain → follow the DNS instructions.

**Option B — GitHub Pages:**
1. Create a repo, push these files, Settings → Pages → deploy from branch.
2. Add a `CNAME` file containing the domain, set DNS per GitHub docs.

Both give free hosting + free HTTPS forever. The only recurring cost anywhere
is the domain's annual registration (~$10–20/yr at its registrar).

## ⚠️ Domain status (checked 2026-06-11)

- **thalos.com is NOT owned by Steven** (per Looka account + WHOIS): registered
  since 1999 via InterNetX (Germany), dormant, not connected to anything of his.
- **thalosconstruction.com** (registered Jan 2025 via Squarespace Domains,
  Microsoft 365 email attached, old Squarespace site EXPIRED) is very likely
  Steven's actual domain — confirm he has the Squarespace login.
- When pointing DNS to the new host: **only change the A/CNAME (web) records.
  Do NOT touch the MX records** — they run his business email.
- `thalosbuilders.com` and `thalosbuilt.com` were available as of the check.
