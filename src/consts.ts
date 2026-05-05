/** Site-wide constants — single source of truth for values used across components. */

export const SITE_TITLE = "sidequests";
export const SITE_DESCRIPTION =
  "An overly engineered scrapbook for my expensive hobbies.";
export const SITE_AUTHOR = "Wong Zhun Hao";

/** CDN base URLs for remote images. */
export const CDN_FAVICON_URL =
  "https://cdn.wongzhunhao.com/core/zh_favicon.png";
export const CDN_COVER_IMAGE_URL =
  "https://cdn.wongzhunhao.com/core/fallback_image.avif";

/** Social media links. */
export const SOCIAL_LINKS = {
  github: "https://github.com/ZhunHao",
  linkedin: "https://www.linkedin.com/in/zhunhao/",
  instagram: "https://www.instagram.com/zhun_ha0/",
  substack: "https://substack.com/@zhunhao",
} as const;

/**
 * Per-collection display metadata used by listing/tag/RSS pages and SEO.
 * Keep titles short for browser tabs and descriptions <= ~155 chars so
 * search engines render them without truncation.
 */
export const COLLECTION_META: Record<
  string,
  { title: string; description: string }
> = {
  astrophotography: {
    title: "Astrophotography",
    description:
      "Long-exposure photographs of the night sky — Milky Way, lunar halos, meteor showers, and other observations from under dark skies.",
  },
  the_atelier: {
    title: "The Atelier",
    description:
      "Sketches, illustrations, and visual experiments — a working notebook of small visual ideas.",
  },
  travel_photos: {
    title: "Travel Photos",
    description:
      "Photo essays from trips abroad — cities, food, museums, and the in-between moments worth keeping.",
  },
  vignettes: {
    title: "Vignettes",
    description:
      "Short photo sets and quick observations from everyday life — the small things that catch the eye.",
  },
  authors: {
    title: "Authors",
    description: `Contributors to ${SITE_TITLE} — short bios and indexed posts by author.`,
  },
};
