# Internet Radio V2 — redesign exploration

A world-class reimagining of the player: **Spotify structure + Apple Music polish**. Discover feed, search, browse-by-country, library, a docked mini-player, and a full-screen Now Playing with parallax + ambient art. Responsive (desktop sidebar / mobile tabs) and light + dark themed.

> This is a **new design direction**, not the shipping product. The canonical current design lives in `ui_kits/internet-radio/`.

## Generative artwork
Real Radio Browser stations only carry a tiny `favicon`, so every station gets a **deterministic gradient cover** derived from its name (`gen.js → gradientFor`). Same name ⇒ same cover, every time. Initials are overlaid for identity. This is purely cosmetic and needs no backend.

## Data mapping — every section is API-truthful
All sources come from the [Radio Browser API](https://www.radio-browser.info/) (the app's only backend). Each shelf/section maps to a real endpoint or `order` param — nothing here needs data the API can't provide:

| UI section | Radio Browser source |
|---|---|
| **Top Station Today** (hero) | `/stations/search?order=votes&reverse=true&limit=1` |
| **Trending now** | `/stations/search?order=clicktrend&reverse=true` |
| **Most popular** | `/stations/search?order=clickcount&reverse=true` |
| **Most voted** | `/stations/search?order=votes&reverse=true` |
| **Genre shelves** (Jazz & Soul, …) | `/stations/bytagexact/{tag}?order=votes&reverse=true` |
| **Browse → country** | `/stations/bycountrycodeexact/{ISO}?order=votes&reverse=true` |
| **Search** | `/stations/byname/{q}` (or `/search?name=…`) |
| **Library** | client-side localStorage favorites (as today) |
| Vote count on cards/hero | station `votes` field |
| Bitrate badge | station `bitrate` field |

### Not used (the API can't back these honestly)
- **Live listener counts** — unavailable. The API exposes cumulative `clickcount` (all-time plays) and `votes`, not concurrent listeners. The hero shows **votes** instead.
- **Editorial "featured"** — there's no curation endpoint, so "featured" is derived as the top-voted station and labeled honestly ("Top Station Today").
- **"New / fresh" stations** — `changetimestamp` only reflects recently-*edited metadata*, not genuinely new stations, so there's no "Fresh finds" shelf. Replaced with **Most popular**.

If you wire this to the live API, the demo's fake catalog (`gen.js`) is the only thing to swap out — the view components already expect station objects shaped like `lib/types.ts` (`name`, `iso`, `tags`, `bitrate`, `codec`, `votes`, `clickcount`).

## Files
`theme.css` (light/dark tokens) · `gen.js` (generative art + fake catalog) · `ui.jsx` (Cover, Shelf, cards, play FAB) · `chrome.jsx` (Sidebar, MobileNav, TopBar) · `home.jsx` · `views.jsx` (Search/Browse/Library) · `player.jsx` (mini + full-screen) · `app.jsx` (orchestrator) · `index.html`.
