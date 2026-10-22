// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import { remarkTranscripcion } from './src/lib/remark-transcripcion.mjs';
import { remarkGlosario } from './src/lib/remark-glosario.mjs';
import { SITIO } from './src/config/sitio.ts';

const NOINDEX = ['/estilo', '/kit/'];

export default defineConfig({
  site: SITIO.url,
  output: 'static',
  trailingSlash: 'never',
  compressHTML: true,

  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) => !NOINDEX.some((p) => new URL(page).pathname.startsWith(p)),
    }),
  ],

  markdown: {
    // Astro 7 usa Sätteri por defecto; los plugins de remark requieren el procesador unified.
    processor: unified({
      remarkPlugins: [remarkTranscripcion, remarkGlosario],
      gfm: true,
      smartypants: false,
    }),
  },

  redirects: {
    // El feed canónico es el del hosting (así cuenta descargas). /feed es un alias estable.
    '/feed': { status: 301, destination: SITIO.hosting.rss },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
