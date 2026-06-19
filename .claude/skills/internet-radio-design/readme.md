# Internet Radio — Design System

A design system extracted from **Internet Radio**, a full-stack internet-radio streaming web app (Next.js + TypeScript + Tailwind v4) that lets you browse stations by country and stream live radio worldwide via the [Radio Browser API](https://www.radio-browser.info/). It is desktop, mobile-web and **PWA**-friendly.

- **Live app:** https://free-internet-radio.vercel.app/
- **Source repo:** https://github.com/jpangan/internet-radio — explore it to design new surfaces faithfully; the components here are simplified, cosmetic recreations of what lives in `app/` and `components/`.

This system distills that one product into reusable tokens, components, and a click-through UI kit. There is a single product surface — the radio player itself — which works identically across phone, desktop, and installed-PWA.

---

## The vibe in one line
A calm, **dark, near-black** room with a single **violet** spotlight. Everything is **glass** — translucent surfaces blurred over a faint purple background glow — with **large soft corners**, **pill-shaped** controls, and gentle **glows** instead of hard shadows. It feels like a premium music player at night.

---

## Content fundamentals
How the product talks:

- **Voice:** plain, warm, encouraging, never jargony. Short sentences. Speaks *to* the user ("you"), and labels actions imperatively ("Select Country", "Try again", "Copy Link").
- **Casing:** **Title Case** for buttons and primary actions ("Select Country", "Load more" is the one sentence-case exception). **Sentence case** for body copy and helper text. **UPPERCASE** only for tiny status badges ("LIVE") and section dividers ("SCAN TO TUNE IN"), always with wide letter-spacing.
- **Headings** are terse and human: *"Nothing playing"*, *"You're offline"*, *"No favorites yet"*. Never "Error 404" or system-speak.
- **Empty states** pair a calm heading with one helpful next step: *"Choose a country and station to start streaming radio from around the world."* / *"Tap the heart while listening to save a station here."*
- **Microcopy / toasts** are friendly and immediate: *"Link copied!"*, *"Added "BBC Radio 6" to favorites"*. Long names are truncated with an ellipsis.
- **Numbers** are factual and unitful: `128 kbps`, `2,841` (station counts), `MP3` / `AAC` codecs uppercased.
- **No emoji** in the UI chrome — the one exception is the 🌐 globe glyph used as a *flag fallback* when a country code is unknown. Iconography is line-art SVG, not emoji.
- **Tone of support:** the only "marketing" surface is a quiet *"Support on Ko-fi"* link, low-contrast and unobtrusive. The product never nags.

---

## Visual foundations
Answers to the "how does it look" questions, all sourced from `app/globals.css` and the components.

**Color.** A near-black canvas `--bg #07070f` (very slight blue cast). There are **no solid grey surfaces** — every panel is a *translucent white overlay* (`--surface` = white @ 6%, `--glass` = white @ 4%) so the background glow shows through. A single brand hue carries everything: **violet** `--accent #7c6cf0`, lightening to `#9488f5` on hover and deepening to `#6c5ce7` in the logo gradient. Status colors are sparing: **green** `--live #34d399` for the live badge, **rose** `--fav #fb7185` for favorites, **red** `#ef4444` for errors. Text is white at four opacities (100 / 55 / 30 / 20%) — never a separate grey.

**Type.** One family — **Inter** (via `next/font`). Tight, dense, mobile-first: headings cap around 24–30px with **−0.02em tracking**; body/UI is 14px; metadata 11–12px. Weights run 400→800; 600/700 do most of the heavy lifting. Tiny uppercase badges use **+0.05em**, micro dividers **+0.12em** tracking.

**Spacing & layout.** A **4px grid**. The whole app is a single **centered column, max 672px** (`max-w-2xl`) — never a multi-pane dashboard. Mobile-first throughout, with explicit `env(safe-area-inset-*)` padding for notches and the PWA. Hit targets are ≥44px on touch.

**Corners.** Large and soft everywhere. Inputs/rows ~10–12px, cards 16–20px, artwork & sheets 24–28px, and **all controls are full pills** (`border-radius: 9999px`). Nothing is square.

**Surfaces / glass.** The signature. Three blur recipes — `.glass` (blur 20 / saturate 180%), `.glass-panel` (24 / 160%, over `rgba(7,7,15,.8)`), `.glass-strong` (32 / 200%). Modal sheets blur 40 / saturate 200% over `rgba(10,10,20,.97)`. Borders are 1px hairlines of white @ 6–16%.

**Backgrounds.** No photography, no illustration. A fixed full-screen **radial violet glow** sits behind everything (`--gradient-bg-glow`, ellipse from top-center). The now-playing artwork emits its own purple halo.

**Shadows & elevation.** Elevation comes from **glow, not crisp drop-shadows**. Buttons carry an accent glow (`0 4px 24px rgba(124,108,240,.45)`); the playing artwork pulses a halo (`artwork-pulse`); sheets sit on a deep soft black shadow (`0 -8px 80px rgba(0,0,0,.6)`).

**Motion.** Quick and soft. Modal sheets **rise** from +32px with a custom spring `cubic-bezier(0.32,0.72,0,1)` over 0.3s; overlays cross-fade in 0.22s. The live dot pulses; "connecting" bounces three dots; the audio visualizer animates bars. Press feedback is a subtle `scale(0.95)`. Nothing bounces gratuitously.

**Hover / press states.** Hover = *fill, don't move*: transparent controls fill with `--surface` (white 6→9%) and text brightens to full white; the primary button deepens its glow. Toned controls (favorite, globe) fill with their own soft tint on hover. Press = `scale(0.92–0.96)`. Disabled = 30–50% opacity, `cursor: not-allowed`.

**Transparency & blur** are used *constantly* — they are the core texture, not an accent. Everything that floats (header, controls bar, sheets, pills) is glass.

---

## Iconography
- **Approach:** hand-drawn **inline SVG**, 24×24 viewBox, **Lucide-style** rounded line icons at ~1.75 stroke weight (`stroke-linecap/linejoin: round`), inheriting `currentColor`. Media-transport icons (play/pause/prev/next/volume) are **solid fills** instead.
- **Custom glyphs:** the brand's **radio-wave** marks — a center dot with concentric arcs (the logo / `signal`) and a tower-with-waves (`radio`, used as the favicon/artwork fallback).
- **No icon font, no sprite, no PNG icons.** Everything is drawn in JSX. The full set is reproduced in `components/core/Icon.jsx` (`<Icon name="…" />`).
- **Flags:** the app uses the `country-flag-icons` npm package (3×2 SVGs). This system's `Flag` component renders the CDN-backed equivalent from **flagcdn.com**, with a 🌐 globe-emoji fallback for unknown codes. *(Substitution flagged — see Caveats.)*
- **Emoji:** none in chrome; only the 🌐 flag fallback.
- **Logo:** `assets/logo-mark.svg` — the radio-wave mark on a violet gradient rounded square; copied verbatim from the app's `public/favicon.svg`.

---

## Index / manifest

**Foundations**
- `styles.css` — the single entry point consumers link. `@import`s everything below.
- `tokens/colors.css` · `typography.css` · `spacing.css` (radii + sizes) · `effects.css` (glass, shadows, glows) · `motion.css` (easings + keyframes) · `fonts.css` (Inter).

**Components** (`window.InternetRadioDesignSystem_7e870d.*`)
- `components/core/` — `Button`, `IconButton`, `Badge`, `Tag`, `Card`, `SearchInput`, `Icon`.
- `components/media/` — `StationArtwork`, `StationRow`, `CountryRow`, `Flag`.

**UI kits**
- `ui_kits/internet-radio/` — faithful recreation of the **current (V1)** player: header, empty + now-playing states, and the browse / favorites / share sheets, over a fake station catalog. `index.html` is the entry.
- `ui_kits/internet-radio-v2/` — a **V2 redesign exploration**: a world-class, *Spotify-structure-meets-Apple-Music-polish* reimagining. Adds a Discover/Home feed (editorial hero + scrolling shelves), Search (genre tiles), Browse-by-country, Library, a docked mini-player, and a full-screen Now Playing with parallax + ambient art. Fully **responsive** (desktop sidebar / mobile tabs, with a device toggle) and **light + dark** themed. Every station gets **deterministic generative gradient artwork** derived from its name (`gen.js`) since real stations only ship tiny favicons. This is a *new direction*, not the shipping design — see `ui_kits/internet-radio` for the canonical product.

**Specimen cards** — `guidelines/*.card.html` populate the Design System tab (Colors, Type, Spacing, Brand).

**Other**
- `assets/` — the logo mark. `SKILL.md` — Agent-Skills wrapper.

---

## Using this system
Link `styles.css`, then read components off the global namespace after loading `_ds_bundle.js`:

```html
<link rel="stylesheet" href="styles.css" />
<script src="_ds_bundle.js"></script>
<script>const { Button, StationRow } = window.InternetRadioDesignSystem_7e870d;</script>
```

For deeper fidelity on new surfaces, read the real implementations in the [source repo](https://github.com/jpangan/internet-radio) (`components/Player.tsx`, `CountryModal.tsx`, `app/globals.css`).
