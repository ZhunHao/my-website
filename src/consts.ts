/** Site-wide constants — single source of truth for values used across components. */

export const SITE_TITLE = "sidequests";
export const SITE_DESCRIPTION = "An overly engineered scrapbook for my expensive hobbies.";
export const SITE_AUTHOR = "Wong Zhun Hao";

/** CDN base URLs for remote images. */
export const CDN_FAVICON_URL = "https://www.wongzhunhao.com/core/zh_favicon.avif";
export const CDN_COVER_IMAGE_URL = "https://www.wongzhunhao.com/core/fallback_image.avif";

/** Social media links. */
export const SOCIAL_LINKS = {
  github: "https://github.com/ZhunHao",
  linkedin: "https://www.linkedin.com/in/zhunhao/",
  instagram: "https://www.instagram.com/zhun_ha0/",
  substack: "https://substack.com/@zhunhao",
} as const;