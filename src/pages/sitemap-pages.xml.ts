import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../config/site';
import { entryPath, isPublishable } from '../lib/seo';

const escapeXml = (value: string) => value.replace(/[<>&'\"]/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[char]!);

export const GET: APIRoute = async () => {
  if (!site.allowIndexing) {
    return new Response('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
  }
  const names = ['reviews', 'speedTests', 'guides', 'knowledge', 'comparisons'] as const;
  const groups = await Promise.all(names.map((name) => getCollection(name)));
  const articleUrls = groups.flat().filter(isPublishable).map((entry) => {
    const loc = new URL(entryPath(entry.collection, entry.id), site.url).toString();
    const lastmod = (entry.data.updatedAt ?? entry.data.publishedAt)!.toISOString();
    return `<url><loc>${escapeXml(loc)}</loc><lastmod>${lastmod}</lastmod></url>`;
  });
  const staticPaths = [
    '/', '/recommend/', '/recommend/feimao-yun/', '/recommend/firefly-streaming-ai/', '/recommend/weifeng-stability/',
    '/jichang/', '/speed-test/', '/compare/', '/guide/', '/knowledge/',
    '/about/', '/author/', '/contact/', '/methodology/', '/corrections/', '/affiliate-disclosure/', '/privacy/', '/terms/', '/disclaimer/',
  ];
  const staticUrls = staticPaths.map((path) => `<url><loc>${escapeXml(new URL(path, site.url).toString())}</loc></url>`);
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...staticUrls, ...articleUrls].join('')}</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
