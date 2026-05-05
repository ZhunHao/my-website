import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import markdoc from "@astrojs/markdoc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import icon from "astro-icon";
import { remarkReadingTime } from "./src/scripts/remark-reading-time.mjs";
import undiciRetry from "./src/scripts/undici-retry.ts";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
// https://astro.build/config
export default defineConfig({
  site: "https://wongzhunhao.com",

  image: {
    // responsiveStyles intentionally left at default `false` —
    // Tailwind 4's cascade layers have lower specificity than Astro's
    // :where() responsive styles, so enabling this would let Astro's
    // styles override Tailwind utilities. Per the Astro docs.
    domains: ["wongzhunhao.com", "cdn.wongzhunhao.com"],
    service: {
      entrypoint: "astro/assets/services/sharp",
      config: {
        limitInputPixels: false,
      },
    },
  },

  integrations: [
    icon(),
    sitemap({
      // Defaults applied to every entry; serialize() refines per-page.
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      // Drop low-value or duplicative URLs from the sitemap. The 404
      // page is noindex'd; pagefind/ is internal search infra.
      filter: (page) => !page.endsWith("/404/") && !page.includes("/pagefind/"),
      serialize(item) {
        const url = item.url;
        // Homepage gets the highest priority and a daily refresh.
        if (url === "https://wongzhunhao.com/") {
          item.priority = 1.0;
          item.changefreq = "daily";
          return item;
        }
        // Tag pages are derived/thin — lower priority, less frequent.
        if (/\/tags\//.test(url)) {
          item.priority = 0.4;
          item.changefreq = "monthly";
          return item;
        }
        // Top-level collection landing pages bump above default.
        if (/\.com\/(astrophotography|the_atelier|travel_photos|vignettes|authors|cv)\/?$/.test(url)) {
          item.priority = 0.9;
        }
        return item;
      },
    }),
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: {
        theme: "rose-pine-dawn",
        defaultColor: false,
        themes: {
          light: "rose-pine-dawn",
          dark: "tokyo-night",
        },
        langs: [],
        wrap: true,
      },
      gfm: true,
      remarkPlugins: [remarkMath, remarkReadingTime],
      rehypePlugins: [rehypeKatex],
    }),
    markdoc(),
    undiciRetry(),
    react(),
  ],

  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "rose-pine-dawn",
      defaultColor: false,
      themes: {
        light: "rose-pine-dawn",
        dark: "tokyo-night",
      },
      langs: [],
      wrap: true,
    },
    gfm: true,
    remarkPlugins: [remarkMath, remarkReadingTime],
    rehypePlugins: [rehypeKatex],
  },

  // Prefetch every link, but only when hovered/focused (not as soon as
  // they enter the viewport). `viewport` is fine for sparse landing
  // pages but over-fetches on image-heavy galleries.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Inconsolata",
      cssVariable: "--font-inconsolata",
      display: "swap",
      fallbacks: ["monospace"],
      weights: [200, 400, 700, 900],
      optimizedFallbacks: true,
    },
    {
      provider: fontProviders.fontsource(),
      name: "Overpass Mono",
      cssVariable: "--font-overpass-mono",
      display: "swap",
      fallbacks: ["monospace"],
      weights: [300, 400, 700],
      optimizedFallbacks: true,
    },
  ],

  experimental: {
    // clientPrerender uses the Speculation Rules API (Chrome-only with
    // graceful fallback). Still experimental in Astro 6 — opt-out by
    // removing this block if it stops being worthwhile.
    clientPrerender: true,
  },

  build: {
    concurrency: 10,
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
