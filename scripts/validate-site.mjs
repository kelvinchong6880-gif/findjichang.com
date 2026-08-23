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
const articleRoutes = new Set();
const inboundRoutes = new Map();
const routeFor = (file) => file.endsWith(`${sep}404.html`) ? '/404.html' : `/${relative(dist, file).split(sep).join('/').replace(/index\.html$/, '')}`;
const routeToFile = (href) => href === '/' ? join(dist, 'index.html') : href.endsWith('/') ? join(dist, href, 'index.html') : join(dist, href);

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const route = routeFor(file);
  const articleMatch = html.match(/<article[^>]*class="[^"]*article-content[^"]*"[^>]*>([\s\S]*?)<\/article>/);
  if (articleMatch) {
    articleRoutes.add(route);
    const articleLinks = [...articleMatch[1].matchAll(/href="(\/[^"]+)"/g)]
      .map((match) => match[1].replace(/&amp;/g, '&'))
      .filter((href) => !href.startsWith('//') && !href.startsWith('/go/'));
    const uniqueTargets = new Set(articleLinks.map((href) => href.split(/[?#]/)[0]).filter(Boolean));
    if (uniqueTargets.size < 3) failures.push(`${route}: 正文相关内链不足 3 个，当前为 ${uniqueTargets.size} 个`);
    for (const href of articleLinks) {
      const clean = href.split(/[?#]/)[0];
      if (!clean.endsWith('/') && existsSync(join(dist, clean))) failures.push(`${route}: 正文内链缺少尾部斜杠 ${clean}`);
    }
  }
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
    const normalized = !clean.endsWith('/') && existsSync(join(dist, clean, 'index.html')) ? `${clean}/` : clean;
    if (normalized !== route) {
      if (!inboundRoutes.has(normalized)) inboundRoutes.set(normalized, new Set());
      inboundRoutes.get(normalized).add(route);
    }
  }
}

for (const route of articleRoutes) {
  if (!inboundRoutes.has(route)) failures.push(`${route}: 文章没有任何站内入口`);
}
if (!failures.some((item) => item.includes('正文相关内链') || item.includes('正文内链缺少尾部斜杠') || item.includes('文章没有任何站内入口'))) {
  pass.push(`${articleRoutes.size} 篇正文通过相关内链、URL 规范与孤立页检查`);
}

const reviewDirs = readdirSync(join(dist, 'jichang'), { withFileTypes: true }).filter((entry) => entry.isDirectory()).length;
const speedDirs = readdirSync(join(dist, 'speed-test'), { withFileTypes: true }).filter((entry) => entry.isDirectory()).length;
const knowledgeDirs = readdirSync(join(dist, 'knowledge'), { withFileTypes: true }).filter((entry) => entry.isDirectory()).length;
const comparisonDirs = readdirSync(join(dist, 'compare'), { withFileTypes: true }).filter((entry) => entry.isDirectory()).length;
reviewDirs === 36 ? pass.push('36 个品牌测评路由') : failures.push(`品牌测评路由为 ${reviewDirs}，应为 36`);
speedDirs === 36 ? pass.push('36 个测速资料路由') : failures.push(`测速资料路由为 ${speedDirs}，应为 36`);
knowledgeDirs === 30 ? pass.push('30 个机场知识路由') : failures.push(`机场知识路由为 ${knowledgeDirs}，应为 30`);
comparisonDirs === 2 ? pass.push('2 个机场对比路由') : failures.push(`机场对比路由为 ${comparisonDirs}，应为 2`);

const knowledgeSourceDir = join(root, 'src/content/knowledge');
const knowledgeSources = readdirSync(knowledgeSourceDir).filter((name) => name.endsWith('.md'));
const descriptions = new Set();
for (const name of knowledgeSources) {
  const markdown = readFileSync(join(knowledgeSourceDir, name), 'utf8');
  const body = markdown.replace(/^---[\s\S]*?---/, '');
  const description = markdown.match(/^description:\s*"([^"]+)"/m)?.[1];
  if (body.length < 2800) failures.push(`${name}: 正文不足 2800 字符`);
  if ((body.match(/^## /gm) ?? []).length < 8) failures.push(`${name}: 二级标题不足 8 个`);
  if (!body.includes('| 观察项目 |') || !body.includes('| 字段 | 示例写法 |')) failures.push(`${name}: 缺少判断表或记录表`);
  if (!body.includes('## 常见问题') || !body.includes('## 资料来源、更新与披露')) failures.push(`${name}: 缺少 FAQ 或来源披露`);
  if (!body.includes('/methodology/') || !body.includes('/affiliate-disclosure/')) failures.push(`${name}: 缺少方法或推广披露内链`);
  if (description && descriptions.has(description)) failures.push(`${name}: meta description 重复`);
  if (description) descriptions.add(description);
}
if (!failures.some((item) => item.includes('.md:'))) pass.push('30 篇知识文章通过长度、结构、来源、披露与描述唯一性检查');

const recommendationSource = readFileSync(join(root, 'src/pages/recommend/_recommend-article.md'), 'utf8');
if (/https?:\/\/[^\s)]*(?:code=|register)/.test(recommendationSource)) failures.push('推荐页仍包含直接推广链接'); else pass.push('推荐页推广入口统一使用 /go/');
if (/独立测速团队|自费购买了|上百次|700Mbps|0\.00%/.test(recommendationSource)) failures.push('推荐页仍包含旧虚构实测文案'); else pass.push('推荐页已移除旧虚构实测文案');
if (recommendationSource.length < 5000) failures.push('微风推荐文章内容长度不足'); else pass.push('微风推荐文章达到深度内容长度');
const recommendationGoLinks = [...recommendationSource.matchAll(/\]\((\/go\/[^)]+)\)/g)].map((match) => match[1]);
if (recommendationGoLinks.length < 2 || recommendationGoLinks.some((href) => !href.startsWith('/go/weifeng/'))) failures.push('微风推荐文章注册入口不完整或混入其他品牌'); else pass.push('微风推荐文章仅使用微风 /go/ 注册入口');
const recommendHtml = readFileSync(join(dist, 'recommend/index.html'), 'utf8');
if (!recommendHtml.includes('name="keywords"') || !recommendHtml.includes('微风机场值得买吗') || !recommendHtml.includes('"@type":"Article"')) failures.push('微风推荐页关键词或 Article 结构化数据缺失'); else pass.push('微风推荐页关键词与 Article 结构化数据已生成');
if (!recommendHtml.includes('name="description" content="微风机场怎么样、是否值得买？')) failures.push('微风推荐页 SEO 摘要错误'); else pass.push('微风推荐页 SEO 摘要正确');

const feimaoRecommendationSource = readFileSync(join(root, 'src/pages/recommend/feimao-yun/_article.md'), 'utf8');
const feimaoRecommendationHtml = readFileSync(join(dist, 'recommend/feimao-yun/index.html'), 'utf8');
const feimaoGoLinks = [...feimaoRecommendationSource.matchAll(/\]\((\/go\/[^)]+)\)/g)].map((match) => match[1]);
if (feimaoRecommendationSource.length < 5000) failures.push('飞猫云推荐文章内容长度不足'); else pass.push('飞猫云推荐文章达到深度内容长度');
if (feimaoGoLinks.length < 2 || feimaoGoLinks.some((href) => !href.startsWith('/go/feimao-yun/'))) failures.push('飞猫云推荐文章注册入口不完整或混入其他品牌'); else pass.push('飞猫云推荐文章仅使用飞猫云 /go/ 注册入口');
if (!feimaoRecommendationHtml.includes('name="keywords"') || !feimaoRecommendationHtml.includes('飞猫云值得买吗') || !feimaoRecommendationHtml.includes('"@type":"Article"')) failures.push('飞猫云推荐页关键词或 Article 结构化数据缺失'); else pass.push('飞猫云推荐页关键词与 Article 结构化数据已生成');
const homeHtml = readFileSync(join(dist, 'index.html'), 'utf8');
if (!homeHtml.includes('href="/recommend/feimao-yun/"') || !homeHtml.includes('预算优先')) failures.push('首页预算优先入口未连接飞猫云推荐页'); else pass.push('首页预算优先入口已连接飞猫云推荐页');

const stabilitySource = readFileSync(join(root, 'src/pages/recommend/weifeng-stability/_article.md'), 'utf8');
const stabilityHtml = readFileSync(join(dist, 'recommend/weifeng-stability/index.html'), 'utf8');
const stabilityGoLinks = [...stabilitySource.matchAll(/\]\((\/go\/[^)]+)\)/g)].map((match) => match[1]);
if (stabilitySource.length < 5000) failures.push('微风稳定性推荐文章内容长度不足'); else pass.push('微风稳定性推荐文章达到深度内容长度');
if (stabilityGoLinks.length < 2 || stabilityGoLinks.some((href) => !href.startsWith('/go/weifeng/'))) failures.push('微风稳定性推荐文章注册入口不完整或混入其他品牌'); else pass.push('微风稳定性推荐文章仅使用微风 /go/ 注册入口');
if (!stabilityHtml.includes('name="keywords"') || !stabilityHtml.includes('微风机场晚高峰') || !stabilityHtml.includes('"@type":"Article"')) failures.push('微风稳定性推荐页关键词或 Article 结构化数据缺失'); else pass.push('微风稳定性推荐页关键词与 Article 结构化数据已生成');
if (!homeHtml.includes('href="/recommend/weifeng-stability/"') || !homeHtml.includes('稳定优先')) failures.push('首页稳定优先入口未连接微风稳定性推荐页'); else pass.push('首页稳定优先入口已连接微风稳定性推荐页');

const fireflySource = readFileSync(join(root, 'src/pages/recommend/firefly-streaming-ai/_article.md'), 'utf8');
const fireflyHtml = readFileSync(join(dist, 'recommend/firefly-streaming-ai/index.html'), 'utf8');
const fireflyGoLinks = [...fireflySource.matchAll(/\]\((\/go\/[^)]+)\)/g)].map((match) => match[1]);
if (fireflySource.length < 6000) failures.push('Firefly 流媒体与 AI 推荐文章内容长度不足'); else pass.push('Firefly 流媒体与 AI 推荐文章达到深度内容长度');
if (fireflyGoLinks.length < 2 || fireflyGoLinks.some((href) => !href.startsWith('/go/firefly/'))) failures.push('Firefly 推荐文章注册入口不完整或混入其他品牌'); else pass.push('Firefly 推荐文章仅使用 Firefly /go/ 注册入口');
if (!fireflyHtml.includes('name="keywords"') || !fireflyHtml.includes('Firefly支持Netflix吗') || !fireflyHtml.includes('"@type":"Article"')) failures.push('Firefly 推荐页关键词或 Article 结构化数据缺失'); else pass.push('Firefly 推荐页关键词与 Article 结构化数据已生成');
if (!homeHtml.includes('href="/recommend/firefly-streaming-ai/"') || !homeHtml.includes('流媒体与 AI')) failures.push('首页流媒体与 AI 入口未连接 Firefly 推荐页'); else pass.push('首页流媒体与 AI 入口已连接 Firefly 推荐页');
if (!existsSync(join(dist, 'guide/ios-shadowrocket-proxy-complete-tutorial/index.html')) || !existsSync(join(dist, 'guide/ios-shadowrocket-proxy-complete-guide/index.html'))) failures.push('Shadowrocket 两篇教程未同时生成'); else pass.push('Shadowrocket 两篇教程独立生成');

const compareIndex = readFileSync(join(dist, 'compare/index.html'), 'utf8');
const compareGoLinks = [...compareIndex.matchAll(/href="\/go\/([^/?]+)\/\?from=\/compare\/&amp;placement=table"/g)].map((match) => match[1]);
const expectedCompareTop = ['weifeng', 'feimao-yun', 'sogo-yun', 'muguang', 'firefly', 'kuajie-yun', 'shanyue', 'wuyou', 'lingmao'];
if (compareGoLinks.length !== 36 || new Set(compareGoLinks).size !== 36) failures.push(`机场总对比注册链接为 ${compareGoLinks.length} 个且唯一值为 ${new Set(compareGoLinks).size} 个，应均为 36`); else pass.push('机场总对比包含 36 个唯一 /go/ 注册入口');
if (expectedCompareTop.some((slug, index) => compareGoLinks[index] !== slug)) failures.push('机场总对比前 9 家顺序错误'); else pass.push('机场总对比前 9 家顺序正确');
if (!compareIndex.includes('怎样使用这张 36 家机场对比表') || !compareIndex.includes('为什么这张表不填写“绝对速度排名”')) failures.push('机场总对比下方指南文章缺失'); else pass.push('机场总对比下方指南文章已生成');

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

const result = { generatedAt: new Date().toISOString(), htmlPages: htmlFiles.length, reviewRoutes: reviewDirs, speedRoutes: speedDirs, knowledgeRoutes: knowledgeDirs, comparisonRoutes: comparisonDirs, brands: brandRows.length, failures, warnings, pass, status: failures.length ? 'failed' : 'passed' };
mkdirSync(join(root, 'outputs/qa'), { recursive: true });
writeFileSync(join(root, 'outputs/qa/automated-validation.json'), JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exitCode = 1;
