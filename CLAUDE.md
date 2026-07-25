# Plotline landing page

Static landing page built with Astro, translated from the Figma file
**WIP-work-trial** (`fileKey: 2nsH8UWS1A3y9oDF74MuMK`, page "kuchuuu", frame `137:1337`).
The Figma file is the source of truth for visuals; this repo is regenerated from it
section-by-section.

## Stack

- Astro 5 (fully static, zero framework JS — only two tiny inline scripts: scroll-reveal + gallery/tabs)
- Hand-written scoped CSS per component; shared tokens in `src/styles/global.css`
- `astro:assets` (sharp) for AVIF/WebP responsive images
- Fonts: `@fontsource-variable/space-grotesk` (display), `@fontsource/geist-sans` 400/500 (body)
- pnpm. Commands: `pnpm dev`, `pnpm build`, `pnpm preview`

## Figma → component map

Each section component maps 1:1 to a Figma node. To update a section from Figma, call
`get_design_context` (Figma MCP) with the node ID below and adapt only that component.

| Component                              | Figma node | Section              |
| -------------------------------------- | ---------- | -------------------- |
| `src/components/Nav.astro`             | `137:1338` | nav                  |
| `src/components/Hero.astro`            | `137:1358` | hero                 |
| `src/components/LogoStrip.astro`       | `137:1374` | logo-strip           |
| `src/components/Engagement.astro`      | `137:1393` | section-engagement   |
| `src/components/ExperienceLibrary.astro` | `137:1439` | section-experience-library |
| `src/components/UseCases.astro`        | `137:1748` | section-use-cases    |
| `src/components/Enterprise.astro`      | `137:1840` | section-enterprise   |

## Re-sync workflow ("update the site from Figma")

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
