// Paths of the optional media files (all live in frontend/public/assets). Missing files fall back gracefully.
export const BG_VIDEO = '/assets/videos/background.mp4';
export const HIRE_IMAGE = '/assets/images/hire-me-meme.jpg';
export const projectVideo = (slug) => `/assets/videos/projects/${slug}.mp4`;
export const projectImage = (slug) => `/assets/images/projects/${slug}.jpg`;
// NEW: optional background picture for each rating card (leetcode.jpg, codeforces.jpg, atcoder.jpg)
export const statImage = (slug) => `/assets/images/stats/${slug}.jpg`;
