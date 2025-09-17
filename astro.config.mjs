// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import tailwindcss from '@tailwindcss/vite';

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap()],
  site: "https://rock-byte-tech.com.co",
  trailingSlash: "never",

  vite: {
    plugins: [tailwindcss()]
  },
  output: 'static',
  adapter: vercel()
});