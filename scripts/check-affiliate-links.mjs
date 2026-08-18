import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const source = readFileSync(new URL('../src/data/brands.ts', import.meta.url), 'utf8');
const brands = [...source.matchAll(/^\s*\['([^']+)', '([^']+)', '([^']+)'\],?$/gm)].map((match) => ({ name: match[1], slug: match[2], url: match[3] }));

async function check(brand) {
  const started = Date.now();
  try {
    let response = await fetch(brand.url, { method: 'HEAD', redirect: 'manual', signal: AbortSignal.timeout(10000), headers: { 'User-Agent': 'findjichang-link-check/1.0' } });
    if (response.status === 405) response = await fetch(brand.url, { method: 'GET', redirect: 'manual', signal: AbortSignal.timeout(10000), headers: { 'User-Agent': 'findjichang-link-check/1.0', Range: 'bytes=0-1023' } });
    const status = response.status;
    const classification = status >= 200 && status < 400 ? 'reachable' : [401, 403, 405, 429].includes(status) ? 'blocked-or-limited' : status === 404 ? 'not-found' : 'http-error';
    return { ...brand, status, classification, location: response.headers.get('location'), elapsedMs: Date.now() - started };
  } catch (error) {
    return { ...brand, status: null, classification: 'needs-manual-check', error: error instanceof Error ? error.message : String(error), elapsedMs: Date.now() - started };
  }
}

const results = [];
for (let index = 0; index < brands.length; index += 6) results.push(...await Promise.all(brands.slice(index, index + 6).map(check)));
const summary = Object.groupBy(results, (item) => item.classification);
const report = { checkedAt: new Date().toISOString(), note: '自动检查只表示技术可达性；失败不等于服务失效，更不代表跑路。最终状态必须人工确认。', counts: Object.fromEntries(Object.entries(summary).map(([key, value]) => [key, value.length])), results };
mkdirSync(new URL('../outputs/qa/', import.meta.url), { recursive: true });
writeFileSync(new URL('../outputs/qa/affiliate-link-check.json', import.meta.url), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report.counts));
