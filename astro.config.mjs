// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // GitHub Pages (project site) — https://hhalvi.github.io/plotline/
  site: 'https://hhalvi.github.io',
  base: '/plotline',
  compressHTML: true,
  build: {
    inlineStylesheets: 'always',
  },
});
