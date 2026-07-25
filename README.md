# Plotline — landing page

A fully static, animation-rich landing page translated from the
[Figma source](https://www.figma.com/design/2nsH8UWS1A3y9oDF74MuMK/WIP-work-trial?node-id=137-1319).

## Quick start

```sh
pnpm install
pnpm dev        # local dev at http://localhost:4321
pnpm build      # static output in dist/
pnpm preview    # serve the production build
```

## Performance profile

- Zero JavaScript bundles — the whole page ships as one HTML document with inlined CSS
  (~12 KB gzipped) plus two inline scripts (scroll reveal, gallery/tab interactions).
- Images served as responsive AVIF (WebP fallback); the 9 MB source artwork ships at
  ≤256 KB for a typical viewport.
- All motion is CSS-driven (marquee, grain-swirl rotation, sheen, Ken Burns CTA, staggered
  scroll reveals) and honors `prefers-reduced-motion`.
- Self-hosted variable/static fonts via Fontsource — no third-party requests at runtime.

## Updating from Figma

The Figma file is the source of truth. See `CLAUDE.md` for the per-section node-ID map and
the exact re-sync workflow — in a Claude Code session, "update the site from the Figma file"
is enough; it will pull only the changed sections.
