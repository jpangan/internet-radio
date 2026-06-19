# Handoff: Internet Radio — Player V2 redesign

## Overview
A world-class redesign of the Internet Radio web app — **Spotify-style structure + Apple-Music polish**. It adds a Discover/Home feed, a Search surface with Browse-by-country and Browse-all-genres, a Browse view, a Library, a docked mini-player, and a full-screen Now Playing with parallax + ambient art. It is fully **responsive** (desktop sidebar / mobile bottom-tabs) and ships **light + dark** themes.

This bundle's task: **recreate these designs inside the existing `jpangan/internet-radio` Next.js app**, reusing its data layer — not ship the prototype HTML.

## About the design files
The files in `prototype/` are **design references** — a working HTML/React-via-Babel prototype showing the intended look, layout, motion, and behavior. They use plain inline-style React components and a **fake static catalog** (`gen.js`). They are NOT production code to paste in. Recreate them as real Next.js components using the app's established patterns (App Router, TypeScript, Tailwind v4, React Query).

## Fidelity
**High-fidelity.** Colors, typography, spacing, radii, shadows, and interactions are final. Recreate pixel-faithfully. The only intentionally-fake part is the data (see "Data — use the real API").

---

## Target codebase (what already exists — reuse it)
The app is **Next.js 15 (App Router) + TypeScript + Tailwind v4 + React Query**, deployed as a PWA. Reuse, do NOT rebuild:
- `lib/queries.ts` — `useCountries()`, `useInfiniteStations(countryId, search)`, `fetchCountriesApi`, `queryKeys`.
- `app/api/countries/route.ts` and `app/api/stations/[country]/route.ts` — server proxies to Radio Browser (avoid CORS).
- `lib/types.ts` — `Country { name, stationcount, iso_3166_1 }`, `Station { stationuuid, name, url_resolved, favicon, tags, country, language, votes, codec, bitrate }`.
- `components/Player.tsx` — the actual `<audio>` element, play/pause, volume, Media Session, keyboard shortcuts, error/retry. **Keep this audio engine**; the V2 work is a new presentation layer around it.
- `components/FlagIcon.tsx` (uses `country-flag-icons`), `components/StationFavicon.tsx`, `lib/analytics.ts`.
- Favorites in `localStorage` (key `ir-favorites`), volume in `internet-radio-volume`.

## Data — use the real API (the prototype's `gen.js` is fake)
Replace the static catalog with real Radio Browser calls. Each V2 section maps to a real endpoint / `order` param (also in `prototype/README.md`):

| V2 section | Real source |
|---|---|
| Top Station Today (hero) | `order=votes&reverse=true&limit=1` |
| Trending now | `order=clicktrend&reverse=true` |
| Most popular | `order=clickcount&reverse=true` |
| Most voted | `order=votes&reverse=true` |
| Genre shelves | `/stations/bytagexact/{tag}?order=votes&reverse=true` |
| Browse / Search → country | `useInfiniteStations(iso, "")` (existing hook) |
| Search (typed query) | `useInfiniteStations(null, query)` or `/stations/byname/{q}` |
| Library | existing `localStorage` favorites |
| Vote count on cards/hero | `station.votes` |

You'll likely add a couple of hooks to `lib/queries.ts` (e.g. `useTopStations(order)` and `useStationsByTag(tag)`) following the existing `useInfiniteStations` pattern. **Do NOT show fabricated live-listener counts** — the API has no concurrent-listener field; show `votes` instead (the prototype already does).

### Generative artwork — keep this, it's real & needed
Real stations only carry a tiny `favicon`. The prototype's `gen.js → gradientFor(name)` produces a deterministic gradient "cover" from the station name. **Port this verbatim** as a util (`lib/cover.ts`) and use the favicon when present, the gradient + initials as the fallback/background. `gradientFor` and `initials` are pure functions with no dependencies.

---

## Screens / Views

### 1. App shell (responsive)
- **Desktop (≥760px width):** fixed left **Sidebar** (248px) — logo lockup, nav (Home, Search, Browse, Library), theme toggle pinned to bottom. Main column scrolls; content max-width 1180px, centered, 32px side padding.
- **Mobile (<760px):** Sidebar hidden; a compact top row (logo + theme toggle) and a **bottom tab bar** (glass, blurred) with the same four destinations. Content padding 18px.
- A docked **MiniPlayer** sits above the bottom nav / at the bottom of the main column whenever a station is loaded.
- (Prototype has a Desktop/Mobile preview toggle — that is a demo affordance only; in the real app use CSS/responsive breakpoints, not a manual toggle.)

### 2. Home / Discover (`home.jsx`)
- **TopBar**: time-based greeting ("Good morning/afternoon/evening"), 28px / weight 800 / letter-spacing −0.03em.
- **Hero** (`Top Station Today`): full-width rounded card (radius `--v-r-xl` = 28px), background = the top-voted station's generative gradient + a `linear-gradient(180deg, rgba(0,0,0,.05), rgba(0,0,0,.45))` scrim. Contains an uppercase pill badge ("TOP STATION TODAY"), the station name (clamp 28–46px, weight 820), country + genres with a flag, a white "Listen Now" pill button, and a votes count. Entrance: `v-pop-in` (transform only).
- **Quick-tile grid**: `repeat(auto-fill, minmax(240px, 1fr))`, 56px-tall rows — small square cover + name + a play FAB on hover.
- **Shelves** (horizontal scroll, hidden scrollbar): "Trending now", "Most popular", "Jazz & Soul", "Most voted". Each card = ~148px square generative cover with a hover/playing play-FAB bottom-right, name (14px/650), genres (12.5px, `--v-fg-3`).

### 3. Search (`views.jsx` → SearchView)
- **TopBar** "Search" + a 16px glass search input (`--v-elev-2` fill, search icon left).
- **Empty (no query):** "Browse by country" — grid `minmax(220px,1fr)` of CountryCard (flag tile 48×36, name, "{count} stations", chevron; hover lifts −2px). Then "Browse all genres" — grid `minmax(180px,1fr)` of GenreTile (104px gradient tiles with the genre name).
- **Typed query:** a "Countries" sub-grid for name matches, then a "{n} stations" list of ListRow results.
- **Country drill-in:** selecting a country shows a back button + that country's stations as a numbered ListRow list.

### 4. Browse (`views.jsx` → BrowseView)
- "Browse" TopBar + subtitle. Grid of CountryCards. Selecting one drills into a numbered station list with a back button and "{count} stations · showing top {n}" line.

### 5. Library (`views.jsx` → LibraryView)
- "Your Library" TopBar. Empty state (icon well + "Build your collection"). Otherwise a count line + numbered ListRow list with a filled-heart remove button.

### 6. MiniPlayer (`player.jsx`)
- Glass bar (blurred `--v-mat-chrome`), 48px cover (equalizer overlay when playing), name + "LIVE/Paused · {country}", favorite heart, play FAB, next (wide only). Click anywhere expands the full-screen Now Playing.

### 7. Now Playing — full screen (`player.jsx` → NowPlaying)
- Slides up (`translateY(100%)` → 0, 0.5s `cubic-bezier(0.32,0.72,0,1)`). **Ambient bg** = the station gradient scaled & blurred (`blur(80px) saturate(150%)`) that drifts with pointer (parallax), plus a dark scrim.
- Top row: collapse (chevron-down), "NOW PLAYING" label, share. Center: large cover (`min(64vw,340px)`) with 3D parallax tilt + equalizer when playing. Below: station name (clamp 24–34px/820), country+genres+flag, favorite heart, a live waveform bar + "LIVE" + elapsed timer, transport (prev / white play FAB 76px / next), and a volume slider.
- Share triggers a "Link copied to clipboard" toast.

---

## Interactions & behavior
- **Play a station** anywhere → set current, start audio (reuse `Player.tsx` engine), `playing=true`.
- **Open** (click a card/row, not the FAB) → set current + open full-screen Now Playing.
- **Prev/Next** → cycle within the current list (existing `handleAdjacentStation` logic).
- **Favorite** toggle → write `localStorage` (existing logic).
- **Theme toggle** → set `data-theme="light|dark"` on `<html>`; persist to `localStorage` and honor `prefers-color-scheme` on first load.
- **Parallax** → pointer-move on the Now Playing root drives translate/rotate on the ambient bg and cover (desktop pointer only).
- **Entrance animations are transform-only** (slide/scale, never opacity-gated) so content is never invisible if animation is throttled. Respect `prefers-reduced-motion`.

## State management
`theme`, `view` (home|search|browse|library), `current` station, `playing`, `npOpen` (full-screen), `favorites`, `volume`, plus per-view local state (search query, selected country). In the real app, audio truthful state comes from `Player.tsx`/the `<audio>` element events; `playing` should reflect actual playback, not optimistic state.

## Design tokens (port `prototype/theme.css`)
CSS custom properties, dark + `[data-theme="light"]`:
- **Dark** — bg `#08080d`, bg-2 `#0d0d15`; elev white 4.5/7/10%; hairline white 8/14%; text white 100/62/40/24%; accent `#8b7bff` / accent-2 `#6c5ce7` / accent-soft `rgba(139,123,255,.16)`; material fill `rgba(16,16,24,.62)`, chrome `rgba(10,10,16,.72)`, blur `blur(40px) saturate(180%)`.
- **Light** — bg `#f4f4f7`, bg-2 `#fff`; elev black 3.5/5.5/8%; text `#14141a` at 100/62/42/26%; accent `#6c5ce7`; material fill `rgba(255,255,255,.7)`.
- **Radii** sm 10 / md 14 / lg 20 / xl 28 / pill 999. **Font** Inter. **Easing** `cubic-bezier(0.32,0.72,0,1)`.
- These are *prototype-local* tokens (prefixed `--v-`). Fold them into the app's `app/globals.css` (which already has `--accent`, `--bg`, etc.) — reconcile names rather than duplicating; the app's existing `--accent` is `#7c6cf0`, V2 nudges it to `#8b7bff`/`#6c5ce7`.

## Assets
- Logo mark: reuse the app's existing radio-wave mark (`public/favicon.svg` / `app/icon.tsx`).
- Flags: reuse `components/FlagIcon.tsx` (`country-flag-icons`). The prototype's `Flag` uses flagcdn.com only because it runs outside the app — use the existing component instead.
- Icons: the prototype's `Icon` set mirrors the app's existing inline SVGs; reuse/extend the app's.
- No bitmap assets — covers are generated.

## Files (in this bundle, under `prototype/`)
- `index.html` — entry/shell, scaling, range-input styling.
- `theme.css` — light/dark tokens + keyframes.
- `gen.js` — generative `gradientFor`/`initials` (PORT THIS) + the fake catalog (REPLACE with API).
- `ui.jsx` — Cover, Equalizer, PlayFab, StationCard, Shelf, ListRow.
- `chrome.jsx` — Sidebar, MobileNav, TopBar, ThemeToggle, Logo.
- `home.jsx` — HomeView (hero + shelves).
- `views.jsx` — SearchView, BrowseView, LibraryView, CountryCard, GenreTile.
- `player.jsx` — MiniPlayer, NowPlaying.
- `app.jsx` — orchestrator (state wiring + responsive layout).
- `README.md` — data-mapping table.

## Suggested implementation order
1. Port tokens into `globals.css` (add light theme + `data-theme` toggle).
2. Add `lib/cover.ts` from `gen.js` (`gradientFor`, `initials`).
3. Build the shell (Sidebar / MobileNav / responsive layout) wrapping the existing `Player.tsx` audio.
4. Build `StationCard`/`ListRow`/`Shelf` and the Home view against new `lib/queries.ts` hooks (`useTopStations`, `useStationsByTag`).
5. Search (reuse `useInfiniteStations`), Browse, Library.
6. MiniPlayer + full-screen Now Playing (wrap existing transport).
7. QA: light/dark, mobile/desktop, reduced-motion, PWA safe areas.
