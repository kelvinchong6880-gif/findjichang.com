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


/** 测速页只有包含真实测速数据时才允许收录；空模板（待核验 / 暂缺数据）一律 noindex 并移出站点地图 */
export function hasRealSpeedData(entry: { body?: string }): boolean {
  return !/暂缺|尚未|待核验|待测试/.test(entry.body ?? '');
}

export function isIndexable(entry: Entry): boolean {
  if (!isPublishable(entry)) return false;
  if (entry.collection === 'speedTests') return hasRealSpeedData(entry);
  return true;
}
