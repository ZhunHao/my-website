# Favicon Design — Radiant Meteor Shower

**Date:** 2026-04-28
**Author:** Wong Zhun Hao
**Status:** Shipped (commit `3c66380`, refined in follow-up)
**Replaces:** `public/favicon.svg` (Astro template leftover) and the single CDN-derived `<link rel="icon">` in `BaseLayout.astro`

## Goal

Replace the inherited Astro-template favicon on `wongzhunhao.com` with a custom mark that reflects the site's astrophotography-leaning content and minimal monospace aesthetic, while remaining legible at every size browsers will render it.

## Concept

A **meteor shower with a radiant point** — astronomically accurate composition where multiple meteor streaks appear to emanate from a single point in the sky (the "radiant"), the way real annual meteor showers are observed and named (Perseids, Geminids, etc.).

Why this concept:

- Direct reference to astrophotography, the lead content category on the site.
- Distinctive — most photography-site favicons default to a camera, lens, or aperture. A radiant pattern is recognisable to anyone who's photographed a meteor shower, and intriguingly geometric to anyone who hasn't.
- Reads as motion / a journey — fits the "sidequests" framing of the site's tagline ("an overly engineered scrapbook for my expensive hobbies").
- Pure geometry: dots and lines, no representational drawing required, so it scales cleanly and renders crisply in monochrome.
- Avoids resemblance to the Claude/Anthropic sparkle (a centred radiating-line motif). The asymmetric streak weights and the off-axis fan keep it visually distinct.

## Visual Specification

### Composition

- **Radiant point:** small filled dot at the top centre of the viewBox.
- **Streaks:** six straight line segments fanning **downward and outward** from just below the radiant. Each line starts at a position slightly offset from the radiant (so the lines visually converge on the radiant without overlapping it) and terminates near the edges/lower portion of the viewBox. No streak rises above the radiant.
- **Asymmetry:** the six streaks have varied lengths (~36–60 viewBox units) and varied stroke weights (1.8–2.5 in 96-unit viewBox). Four streaks plunge into the lower half of the viewBox at varied angles (down-left, down-centre, down-right, lower-right). Two shorter streaks sweep at shallow downward angles toward the upper-left and upper-right edges. The variation prevents "logo burst" symmetry and keeps the photographic, observational feel.

### Geometry (96 × 96 viewBox)

| Element                | Position / Path           | Stroke / Fill     |
| ---------------------- | ------------------------- | ----------------- |
| Radiant dot            | `cx=48, cy=20, r=3`       | filled            |
| Streak 1 (down-left)   | `(50,24) → (20,62)`       | stroke-width 2    |
| Streak 2 (down)        | `(48,26) → (40,78)`       | stroke-width 2.5  |
| Streak 3 (down-right)  | `(50,26) → (62,80)`       | stroke-width 2    |
| Streak 4 (lower-right) | `(52,24) → (80,68)`       | stroke-width 2.2  |
| Streak 5 (upper-left)  | `(46,24) → (14,44)`       | stroke-width 1.8  |
| Streak 6 (upper-right) | `(52,22) → (84,42)`       | stroke-width 1.8  |

All strokes use `stroke-linecap="round"`.

### Colour

- **Light theme:** `#222125` (matches the site's dark-text colour from `global.css`).
- **Dark theme:** `#f5f5f5` (matches the site's dark-mode foreground).
- **Mechanism:** single SVG file with embedded `@media (prefers-color-scheme: dark)` rule, mirroring the pattern used in the current `public/favicon.svg`.

No accent colours, no gradients, no fills inside the streaks. The favicon stays in lock-step with the site's monochrome palette.

## Sizing & Multi-Size Strategy

The favicon needs to be legible at all of these:

- **180px** — `apple-touch-icon`
- **48px / 32px / 24px** — desktop browsers, bookmarks
- **16px** — browser tabs, bookmarks bar

The 6-streak design renders cleanly at ≥32px. At 24px and especially at 16px, the thin strokes risk fading out (subpixel rendering) or merging together (when thickened to compensate).

### Decision

**Ship the full 6-streak design at every size — vector and raster.** The browser-rendered SVG holds up better than static mockups suggested, and the 16px PNG fallbacks (regenerated from the 6-streak geometry) keep the brand mark consistent end-to-end. No separate simplified variant.

## Files & Integration Points

### In scope (this design)

- **`public/favicon.svg`** — 6-streak meteor shower SVG with embedded `prefers-color-scheme` style block.
- **`public/favicon-{16,32,48}-{light,dark}.png`** — raster fallbacks for browsers without SVG favicon support, all rendered from the same 6-streak geometry.
- **`public/apple-touch-icon.png`** — 180×180 with `#f5f5f5` streaks on a `#222125` "night sky" background; iOS doesn't honour `prefers-color-scheme`, so a single bundled file is the right choice.
- **`public/apple-touch-icon-{light,dark}.png`** — alternates kept on hand if the night-sky default needs swapping.
- **`<head>` `<link>` declarations** in `src/layouts/BaseLayout.astro` — full multi-icon set wired up, replacing the old single CDN-derived link.

### Out of scope (handled separately)

- **`CDN_FAVICON_URL` in `src/consts.ts`** — points to `https://www.wongzhunhao.com/core/zh_favicon.png`. Still used by `Header.astro` (logo) and `BaseLayout.astro` (Schema.org `personSchema.image`). Untouched by this spec.

## Acceptance Criteria

- [x] `public/favicon.svg` contains the 6-streak radiant meteor shower SVG with embedded light/dark colour adaptation.
- [ ] The favicon renders correctly in a real browser tab at 16px in both light and dark system themes (verify post-deploy).
- [x] The favicon renders correctly at 32px (bookmarks bar) and at 180px (Apple touch icon).
- [x] The favicon visually does not resemble the Claude/Anthropic sparkle mark (no centred radiating-line symmetry).
- [x] The favicon adapts automatically when the user toggles system theme (no JS required).

## Trade-offs & Decisions Log

| Decision                                | Alternative considered                          | Why we chose this                                                                                              |
| --------------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Single SVG with `prefers-color-scheme`  | Separate light + dark SVGs                      | Simpler integration, matches existing pattern, no extra HTML required.                                         |
| Asymmetric streak weights and lengths   | Symmetric/uniform streaks                       | Avoids logo-mark feel; reads as observational/photographic; differentiates from Claude/Anthropic sparkle mark. |
| 6-streak everywhere (incl. 16px PNGs)   | Simplified 3-streak variant for tab-size only   | Single visual identity end-to-end; 16px PNGs raster the 6-streak geometry cleanly enough.                      |
| Apple touch icon = night sky reading    | Transparent or light background                 | `#f5f5f5` streaks on `#222125` stay legible on any home-screen wallpaper and reinforce the astrophotography theme. |
| Author handles CDN brand mark           | Replace `CDN_FAVICON_URL` here too              | The CDN mark serves the header logo and Schema.org Person.image — separate concerns from the browser favicon.  |

## Reference Mockups

Brainstorming mockups (light + dark, all sizes, browser tab simulation) are saved under `.superpowers/brainstorm/` in this project. Key files:

- `direction.html` — initial four directions (monogram / symbol / abstract / shorthand).
- `symbol-subject.html`, `constellation-variations.html`, `scatter-variations.html`, `scatter-no-claude.html`, `celestial-bodies.html`, `comet-variations.html`, `meteor-shower.html`, `radiant-variations.html` — exploration of subject candidates.
- `final-preview.html` — chosen design at 180/48/24/16 px on light + dark backgrounds.
- `small-size-test.html` — side-by-side comparison of 6-streak vs 3-streak at 16px and 24px (the 3-streak variant was ultimately not shipped).
