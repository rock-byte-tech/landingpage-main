// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import tailwindcss from '@tailwindcss/vite';
import react from "@astrojs/react";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap(), react()],
  site: "https://rock-byte-tech.com.co",
  trailingSlash: "never",

  vite: {
    plugins: [tailwindcss()]
  },
  adapter: vercel()
});
