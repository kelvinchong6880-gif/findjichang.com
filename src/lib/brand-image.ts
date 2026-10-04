const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/brands/*.{png,jpg}', { eager: true });
export const brandImage = (slug: string): ImageMetadata | null =>
  images[`/src/assets/brands/${slug}.png`]?.default ?? images[`/src/assets/brands/${slug}.jpg`]?.default ?? null;
