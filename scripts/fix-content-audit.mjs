import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { basename } from 'node:path';

const contentRoot = new URL('../src/content/', import.meta.url);
const markdownFiles = (collection) => readdirSync(new URL(`${collection}/`, contentRoot)).filter((name) => name.endsWith('.md'));
const splitDocument = (file) => {
  const raw = readFileSync(file, 'utf8');
  const match = raw.match(/^(---\r?\n[\s\S]*?\r?\n---\r?\n)([\s\S]*)$/);
  if (!match) throw new Error(`无法解析 Frontmatter：${file}`);
  return { frontmatter: match[1], body: match[2] };
};
const replaceReferralLinks = (body, slug, prefix) => body.replace(
  /\((https?:\/\/[^)\s]*(?:code=|register\?code=)[^)\s]*)\)/g,
  `(/go/${prefix === 'guide' ? 'weifeng' : slug}/?from=/${prefix}/${slug}/&placement=article-end)`,
);
const cleanTitle = (value) => {
  let title = value
    .replace(/^【2026[^】]*】/, '')
    .replace(/\s*-\s*Clash节点推荐\s*$/i, '')
    .replace(/全方位深度评测/g, '深度测评')
    .replace(/全方位深度测评/g, '深度测评')
    .replace(/深度全景评测/g, '深度评测')
    .replace(/全景解析/g, '解析')
    .trim();
  if ([...title].length <= 60) return title;
  const prefix = [...title].slice(0, 60).join('');
  const boundary = Math.max(prefix.lastIndexOf('，'), prefix.lastIndexOf('：'), prefix.lastIndexOf('（'));
  return (boundary >= 35 ? prefix.slice(0, boundary) : prefix).replace(/[，：、/+]$/, '');
};
const cleanDescription = (value) => {
  let description = value
    .replace(/超硬核深度实测/g, '深度测评')
    .replace(/完美解锁/g, '解锁')
    .replace(/彻底解除/g, '不限制')
    .replace(/极限测速/g, '测速')
    .replace(/极速测速/g, '测速');
  if ([...description].length <= 160) return description;
  const prefix = [...description].slice(0, 150).join('');
  const boundary = prefix.lastIndexOf('。');
  return `${boundary >= 80 ? prefix.slice(0, boundary) : prefix.replace(/[，；、]$/, '')}。`;
};
const cleanMetadata = (frontmatter) => frontmatter
  .replace(/^title:\s*(["']?)(.+?)\1\s*$/m, (_, _quote, value) => `title: ${JSON.stringify(cleanTitle(value))}`)
  .replace(/^description:\s*(["']?)(.+?)\1\s*$/m, (_, _quote, value) => `description: ${JSON.stringify(cleanDescription(value))}`);
const cleanBodyFormatting = (body) => body
  .replace(/^\*\s{3}/gm, '- ')
  .replace(/超硬核深度实测/g, '深度测评')
  .replace(/性价比之王/g, '性价比较高')
  .replace(/闭眼入/g, '可作为候选');

for (const name of markdownFiles('guides')) {
  const file = new URL(`guides/${name}`, contentRoot);
  const slug = basename(name, '.md');
  let { frontmatter, body } = splitDocument(file);
  if (!/^draft:/m.test(frontmatter)) {
    frontmatter = frontmatter.replace(/^(createdAt:[^\r\n]+\r?\n)/m, '$1draft: true\nstatus: drafting\n');
  }
  frontmatter = frontmatter
    .replace(/^(\s+sourcesAttributed:)\s*true\s*$/m, '$1 false')
    .replace(/^(\s+imageAltText:)\s*true\s*$/m, '$1 false')
    .replace(/^(\s+affiliateDisclosure:)\s*true\s*$/m, '$1 false');
  body = cleanBodyFormatting(replaceReferralLinks(body, slug, 'guide'));
  writeFileSync(file, cleanMetadata(frontmatter) + body);
}

for (const collection of ['reviews', 'speed-tests']) {
  const prefix = collection === 'reviews' ? 'jichang' : 'speed-test';
  for (const name of markdownFiles(collection)) {
    const file = new URL(`${collection}/${name}`, contentRoot);
    const slug = basename(name, '.md');
    const { frontmatter, body } = splitDocument(file);
    writeFileSync(file, cleanMetadata(frontmatter) + cleanBodyFormatting(replaceReferralLinks(body, slug, prefix)));
  }
}

console.log('内容状态与正文推广链接已统一。');
