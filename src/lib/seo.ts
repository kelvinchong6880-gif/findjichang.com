import type { CollectionEntry } from 'astro:content';

type Entry = CollectionEntry<'reviews' | 'speedTests' | 'guides' | 'knowledge' | 'comparisons'>;

export function passesBingChecklist(entry: Entry): boolean {
  return Object.values(entry.data.bingChecklist).every(Boolean);
}

export function isPublishable(entry: Entry): boolean {
  return !entry.data.draft && entry.data.status === 'published' && Boolean(entry.data.publishedAt) &&
    entry.data.editorialReview.checked && passesBingChecklist(entry);
}

export function entryPath(collection: Entry['collection'], id: string): string {
  const slug = id.replace(/\.(md|mdx)$/, '');
  const prefixes = { reviews: '/jichang', speedTests: '/speed-test', guides: '/guide', knowledge: '/knowledge', comparisons: '/compare' };
  return `${prefixes[collection]}/${slug}/`;
}

