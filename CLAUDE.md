# Plotline landing page

Static landing page built with Astro, translated from the Figma file
**WIP-work-trial** (`fileKey: 2nsH8UWS1A3y9oDF74MuMK`, page "kuchuuu", frame `137:1337`).

> **Source of truth moved.** As of 2026-07-25 the "kuchuuu" page no longer exists in
> that file — `get_metadata` returns only a `logo` page, and every node ID in the table
> below 404s. The live reference is now the published design:
> **https://dimly-scrum-61448148.figma.site/** ("homepage iteration").
> Diff against that site, not Figma, until someone restores/rebuilds the Figma page.
> See "Parity workflow" below.

## Stack

- Astro 5 (fully static, zero framework JS — only two tiny inline scripts: scroll-reveal + gallery/tabs)
- Hand-written scoped CSS per component; shared tokens in `src/styles/global.css`
- `astro:assets` (sharp) for AVIF/WebP responsive images
- Fonts: `@fontsource-variable/space-grotesk` (display), `@fontsource/geist-sans` 400/500/600 (body)
- pnpm. Commands: `pnpm dev`, `pnpm build`, `pnpm preview`

## Figma → component map

Each section component maps 1:1 to a Figma node. To update a section from Figma, call
`get_design_context` (Figma MCP) with the node ID below and adapt only that component.

| Component                              | Figma node | Section              |
| -------------------------------------- | ---------- | -------------------- |
| `src/components/Nav.astro`             | `137:1338` | nav                  |
| `src/components/Hero.astro`            | `144:4252` | hero                 |
| `src/components/LogoStrip.astro`       | `137:1374` | logo-strip           |
| `src/components/Engagement.astro`      | `159:524`  | section-engagement   |
| `src/components/ExperienceLibrary.astro` | `137:1439` | section-experience-library |
| `src/components/UseCases.astro`        | `137:1748` | section-use-cases    |
| `src/components/Enterprise.astro`      | `137:1840` | section-enterprise   |

## Parity workflow ("match the published design")

The published site is a plain page, so diff it directly rather than eyeballing:

1. Screenshot both with **`--force-prefers-reduced-motion`** — this repo animates the
   hero panel, the ken-burns CTA and the pill stagger, and without it every capture
   lands on a different frame and the diff is meaningless.
   `chrome --headless --hide-scrollbars --force-prefers-reduced-motion --window-size=1440,7000 --screenshot=… --virtual-time-budget=20000 <url>`
2. Compare per-100px band (`|ref − mine|.max(channel) > 40`). ~4% is the floor: the two
   pipelines encode the artwork differently, so photographic areas never reach zero.
3. **Never screenshot a narrow viewport directly** — headless Chrome ignores
   `--window-size` widths below ~400px and silently renders wider, which looks exactly
   like a horizontal-overflow bug. Load the page in a sized `<iframe>` inside a probe
   page instead, and measure geometry from the iframe's DOM.
4. Landmark check: the purple section-label chips sit at `x=45`; scanning that column
   for `#533afe` gives each section's y-offset in both renders in one pass.

## Re-sync workflow ("update the site from Figma", if the page is ever restored)

1. `get_metadata` on frame `137:1337` to see whether sections were added/removed/renamed.
2. For each changed section, `get_design_context` on its node ID (table above) and
   `get_screenshot` for visual reference.
3. Adapt the returned reference code into the existing component — keep the project's
   CSS-token approach; do not paste Tailwind classes.
4. New/changed images: download the asset URLs from the design context into
   `src/assets/figma/` with semantic kebab-case names (Figma asset URLs expire in ~7 days,
   so always commit local copies). Reference them via `astro:assets` imports.
5. `pnpm build`, screenshot with headless Chrome at 1440px, and compare against the Figma
   section screenshot before finishing.

## Design tokens (from Figma variables)

- Colors: ink `#222`, muted `#999`, dim `#777`, accent `#533afe`, night `#05021c`,
  night-card `#19162e`, night-tile `#211b4d`, hairline `#ebebeb`
- Type: Space Grotesk — Display 80/96 · H1 56/60 · H2 48/56; Geist — body 18/26,
  small 16/22, label 14/20, caption 12/16
- Layout: 1440 canvas, 45px side padding (fluid via `--pad-x`), content 1350

## Conventions

- Every section keeps its Figma node ID in a comment at the top of the component.
- Animations are CSS-first (`.reveal` + IntersectionObserver in `Layout.astro`); all motion
  respects `prefers-reduced-motion`.
- Icons/illustrations are exported Figma assets in `src/assets/figma/` — never hand-drawn
  replacements.
- `hero-art.png` is shared by the hero and the enterprise CTA card (same artwork in Figma).
- The hero is re-cut in Figma rather than edited, so its node IDs change on every pass —
  if the mapped ID 404s, re-run `get_metadata` on frame `137:1337` and find the `hero` frame.
- The hero decision panel (Figma `144:4420`) animates on one shared 12s timeline: every
  keyframe animation is `var(--cycle)` long and infinite, so percentage stops stay in step.
  Pills are placed in that timeline by `--scan` delay; only the three lock-in moments have
  their own keyframes. The Figma file contains no motion data (`get_motion_context` is
  empty) — the choreography lives only here, so don't drop it when re-syncing the hero.
- Overlay UI that must scale with the artwork uses `--k` (one "design pixel",
  `min(1px, 0.069444vw)`), so sizes can be written in the Figma's own 1440-canvas px.
- The engagement cards use the same idea but per-card: `--u` in `Engagement.astro` is
  `clamp(0.66px, 100cqw / 575, 1.1px)`. **`cqw` resolves against the container's
  *content* box**, so the container is `.card` on the light card and `.card-new-inner`
  on the purple one — both are 575 wide at design size (657 card − 41 padding × 2).
  The comparison cards stack below 1200px, not 900px, because a narrower card drives
  the pill type inside that stage under ~11px.
- The engagement tile artwork and the purple card's watermark are both the Plotline "P"
  (`eng-tile-mask.svg`) used as a CSS mask. Figma's CSS export flattens the rotation
  those shapes carry, so the transforms here were fitted against the published render
  (tile: `rotate(-31deg)` at natural size, offset `(6, 110)` in the tile). If you
  re-derive them, remember the glyph has a counter — a fill-based rasteriser will
  silently plug the hole and pull the fit off.
- Tint gradients on the photographic artwork (`.hero-art-tint`, `.cta-wash`) were fitted
  numerically against the published render, not read off a design token — treat their
  values as measurements and refit rather than nudge.
