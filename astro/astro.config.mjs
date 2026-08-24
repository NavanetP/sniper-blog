import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.sniperindia.com",

  integrations: [
    react(),
    tailwind({
      // Point at the shared tailwind config one level up
      configFile: "../tailwind.config.ts",
    }),
    sitemap(),
  ],

  // Source layout: astro/src/pages → routes
  srcDir: "./src",
  publicDir: "./public",
  outDir: "./dist",

  // Vite aliases so React components imported with "@/…" resolve correctly
  vite: {
    resolve: {
      alias: {
        "@": new URL("../src", import.meta.url).pathname,
      },
    },
  },
});
