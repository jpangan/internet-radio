---
name: internet-radio-design
description: Use this skill to generate well-branded interfaces and assets for Internet Radio (a dark, glassmorphic, violet-accented radio streaming app), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Quick orientation:
- **Tokens** live in `tokens/*.css`, all `@import`ed by `styles.css` (link that one file). Dark canvas `--bg #07070f`, violet accent `--accent #7c6cf0`, glass surfaces, large pill radii.
- **Components** are React (`components/core`, `components/media`) — `Button`, `IconButton`, `Badge`, `Tag`, `Card`, `SearchInput`, `Icon`, `StationArtwork`, `StationRow`, `CountryRow`, `Flag`. Each has a `.prompt.md` with usage.
- **UI kit** at `ui_kits/internet-radio/` is the full interactive player recreation — the canonical reference for composing screens.
- **Icons** are inline Lucide-style SVGs via `<Icon name="…" />`; flags via `<Flag code="GB" />`. No icon font, no emoji in chrome.
- Everything is glass + glow on a dark canvas. Use the background radial glow (`--gradient-bg-glow`) behind floating surfaces.
