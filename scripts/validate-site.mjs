import { existsSync, readdirSync, readFileSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const root = new URL('../', import.meta.url).pathname.replace(/^\/(.:)/, '$1');
const dist = join(root, 'dist');
const htmlFiles = [];
const walk = (dir) => { for (const name of readdirSync(dir)) { const path = join(dir, name); statSync(path).isDirectory() ? walk(path) : name.endsWith('.html') && htmlFiles.push(path); } };
walk(dist);

const failures = [];
const warnings = [];
const pass = [];
const routeFor = (file) => file.endsWith(`${sep}404.html`) ? '/404.html' : `/${relative(dist, file).split(sep).join('/').replace(/index\.html$/, '')}`;
const routeToFile = (href) => href === '/' ? join(dist, 'index.html') : href.endsWith('/') ? join(dist, href, 'index.html') : join(dist, href);

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const route = routeFor(file);
  const count = (pattern) => (html.match(pattern) ?? []).length;
  if (count(/<title>/g) !== 1) failures.push(`${route}: title 数量不是 1`);
  if (count(/<meta name="description"/g) !== 1) failures.push(`${route}: description 数量不是 1`);
  if (count(/<link rel="canonical"/g) !== 1) failures.push(`${route}: canonical 数量不是 1`);
  if (count(/<h1[ >]/g) !== 1) failures.push(`${route}: H1 数量不是 1`);
  if (!html.includes('<html lang="zh-CN">')) failures.push(`${route}: 缺少 zh-CN`);
  if (!html.includes('name="robots" content="noindex, follow"')) failures.push(`${route}: 开发阶段未保持 noindex`);
  for (const match of html.matchAll(/<script is:inline type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(match[1]); } catch { failures.push(`${route}: JSON-LD 无法解析`); }
  }
  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];
    if (!href.startsWith('/') || href.startsWith('//') || href.startsWith('/go/') || href === '#') continue;
    const clean = href.split(/[?#]/)[0];
    if (!existsSync(routeToFile(clean))) failures.push(`${route}: 内链目标不存在 ${clean}`);
  }
}

const reviewDirs = readdirSync(join(dist, 'jichang'), { withFileTypes: true }).filter((entry) => entry.isDirectory()).length;
const speedDirs = readdirSync(join(dist, 'speed-test'), { withFileTypes: true }).filter((entry) => entry.isDirectory()).length;
reviewDirs === 36 ? pass.push('36 个品牌测评路由') : failures.push(`品牌测评路由为 ${reviewDirs}，应为 36`);
speedDirs === 36 ? pass.push('36 个测速资料路由') : failures.push(`测速资料路由为 ${speedDirs}，应为 36`);

const brandsSource = readFileSync(join(root, 'src/data/brands.ts'), 'utf8');
const brandRows = [...brandsSource.matchAll(/^\s*\['([^']+)', '([^']+)', '([^']+)'\],?$/gm)].map((match) => ({ name: match[1], slug: match[2], url: match[3] }));
if (brandRows.length !== 36) failures.push(`品牌资料为 ${brandRows.length}，应为 36`); else pass.push('36 个品牌资料');
if (new Set(brandRows.map((item) => item.slug)).size !== 36) failures.push('品牌代号存在重复');
if (brandRows[0]?.name !== '微风' || brandRows[1]?.name !== 'SOGO云' || brandRows[2]?.name !== '飞猫云') failures.push('前三品牌优先级错误');
for (const brand of brandRows) {
  if (!existsSync(join(dist, 'jichang', brand.slug, 'index.html')) || !existsSync(join(dist, 'speed-test', brand.slug, 'index.html'))) failures.push(`${brand.name}: 测评或测速路由缺失`);
}

const sitemap = readFileSync(join(dist, 'sitemap-pages.xml'), 'utf8');
if (/<url>/.test(sitemap)) failures.push('开发阶段 Sitemap 不应包含内容 URL'); else pass.push('开发阶段 Sitemap 为空');
const robots = readFileSync(join(dist, 'robots.txt'), 'utf8');
if (!robots.includes('Allow: /') || !robots.includes('sitemap-index.xml')) failures.push('robots.txt 配置错误'); else pass.push('robots.txt 允许抓取并指向 Sitemap');

const result = { generatedAt: new Date().toISOString(), htmlPages: htmlFiles.length, reviewRoutes: reviewDirs, speedRoutes: speedDirs, brands: brandRows.length, failures, warnings, pass, status: failures.length ? 'failed' : 'passed' };
mkdirSync(join(root, 'outputs/qa'), { recursive: true });
writeFileSync(join(root, 'outputs/qa/automated-validation.json'), JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exitCode = 1;
