import { getBrand } from '../../src/data/brands.ts';

interface AnalyticsEngineDataset { writeDataPoint(point: { blobs?: string[]; indexes?: string[]; doubles?: number[] }): void }
interface Env { CLICK_EVENTS?: AnalyticsEngineDataset }
interface Context { request: Request; env: Env; params: { brand: string } }

const placements = new Set(['hero', 'summary', 'pricing', 'sidebar', 'article-end', 'recommend-card', 'comparison-table', 'mobile-bottom']);
const safeSource = (value: string | null) => value?.startsWith('/') && !value.startsWith('//') ? value.slice(0, 200) : 'unknown';

export async function onRequestGet(context: Context): Promise<Response> {
  const brand = getBrand(context.params.brand);
  if (!brand) return new Response('Not found', { status: 404 });

  const requestUrl = new URL(context.request.url);
  const source = safeSource(requestUrl.searchParams.get('from'));
  const requestedPlacement = requestUrl.searchParams.get('placement') ?? '';
  const placement = placements.has(requestedPlacement) ? requestedPlacement : 'unknown';

  context.env.CLICK_EVENTS?.writeDataPoint({
    indexes: [brand.slug],
    blobs: [source, placement, new Date().toISOString().slice(0, 10)],
    doubles: [1],
  });

  return new Response(null, { status: 302, headers: { Location: brand.affiliateUrl, 'Cache-Control': 'no-store, private', 'Referrer-Policy': 'no-referrer' } });
}
