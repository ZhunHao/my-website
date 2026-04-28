# Favicon Design — Radiant Meteor Shower

**Date:** 2026-04-28
**Author:** Wong Zhun Hao
**Status:** Approved (design phase)
**Replaces:** `public/favicon.svg` (current Astro template leftover)

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

**Ship the full 6-streak design as a single SVG first.** Test it in a real browser tab before deciding whether a simplified 16px variant is needed. Browser-rendered SVG can hold up better than static mockups suggest.

If the 6-streak version proves illegible at tab size, fall back to a **two-asset approach**:

- `favicon.svg` — full 6-streak design for ≥32px contexts.
- `favicon-16.svg` (or inline `<link sizes="16x16">`) — simplified 3-streak variant (centre + two diagonal streaks at stroke-width 9 in 96vb) used only at 16px.

The 16px simplified variant is described here for completeness:

| Element       | Position / Path     | Stroke / Fill    |
| ------------- | ------------------- | ---------------- |
| Radiant dot   | `cx=48, cy=20, r=9` | filled           |
| Streak left   | `(48,26) → (22,64)` | stroke-width 9   |
| Streak centre | `(48,26) → (48,80)` | stroke-width 9   |
| Streak right  | `(48,26) → (74,64)` | stroke-width 9   |

## Files & Integration Points

### In scope (this design)

- **`public/favicon.svg`** — replace the current Astro-leftover SVG with the new 6-streak meteor shower SVG. Keep the embedded `prefers-color-scheme` style block.
- **(conditional) `public/favicon-16.svg`** — only added if the 6-streak version fails the real-browser legibility test at 16px.

### Out of scope (handled separately)

- **`CDN_FAVICON_URL` in `src/consts.ts`** — currently points to `https://www.wongzhunhao.com/core/zh_favicon.png`. The author will provide the final asset for this CDN path separately. This spec does not change `consts.ts`.
- **`apple-touch-icon.png`, additional PNG fallbacks** — the author will provide the complete favicon bundle separately. This spec does not generate raster fallbacks.
- **Site `<head>` / `<link>` declarations** — no changes needed for the SVG-only swap (the existing `<link rel="icon" href="/favicon.svg">` declaration already covers it). If raster fallbacks are added later, that integration is out of scope for this spec.

## Acceptance Criteria

- [ ] `public/favicon.svg` contains the 6-streak radiant meteor shower SVG with embedded light/dark colour adaptation.
- [ ] The favicon renders correctly in a real browser tab at 16px in both light and dark system themes.
- [ ] The favicon renders correctly at 32px (bookmarks bar) and at 180px (Apple touch icon size, when scaled up by the browser).
- [ ] The favicon visually does not resemble the Claude/Anthropic sparkle mark (no centred radiating-line symmetry).
- [ ] The favicon adapts automatically when the user toggles system theme (no JS required).

## Trade-offs & Decisions Log

| Decision                                | Alternative considered                          | Why we chose this                                                                                              |
| --------------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Single SVG with `prefers-color-scheme`  | Separate light + dark SVGs                      | Simpler integration, matches existing pattern, no extra HTML required.                                         |
| Asymmetric streak weights and lengths   | Symmetric/uniform streaks                       | Avoids logo-mark feel; reads as observational/photographic; differentiates from Claude/Anthropic sparkle mark. |
| 6-streak design as primary              | 3-streak design (cleaner at 16px)               | 6 streaks have more presence and personality at the sizes (≥32px) where the favicon is most often seen.        |
| Defer 16px-specific variant             | Ship dual SVGs from day 1                       | Premature optimisation; verify the real failure mode in a browser before adding complexity.                    |
| Author handles CDN + PNG fallbacks      | Generate everything in this spec                | Author has existing CDN workflow and prefers to handle raster export separately.                               |

## Reference Mockups

Brainstorming mockups (light + dark, all sizes, browser tab simulation) are saved under `.superpowers/brainstorm/` in this project. Key files:

- `direction.html` — initial four directions (monogram / symbol / abstract / shorthand).
- `symbol-subject.html`, `constellation-variations.html`, `scatter-variations.html`, `scatter-no-claude.html`, `celestial-bodies.html`, `comet-variations.html`, `meteor-shower.html`, `radiant-variations.html` — exploration of subject candidates.
- `final-preview.html` — chosen design at 180/48/24/16 px on light + dark backgrounds.
- `small-size-test.html` — side-by-side comparison of 6-streak vs 3-streak at 16px and 24px.
