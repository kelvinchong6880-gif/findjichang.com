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
const sourceCatalog = {
  android: ['Android VpnService 官方文档', 'https://developer.android.com/reference/android/net/VpnService'],
  apple: ['Apple Account 官方支持', 'https://support.apple.com/apple-account'],
  clash: ['Clash Verge Rev 官方项目', 'https://github.com/clash-verge-rev/clash-verge-rev'],
  loon: ['Loon 官方节点文档', 'https://nsloon.app/en/docs/Node/'],
  microsoft: ['Microsoft Windows 网络命令文档', 'https://learn.microsoft.com/windows-server/networking/technologies/netsh/netsh'],
  mihomo: ['Mihomo 官方文档', 'https://wiki.metacubex.one/'],
  nekoray: ['NekoRay 官方项目归档', 'https://github.com/MatsuriDayo/nekoray'],
  netflix: ['Netflix 代理错误官方帮助', 'https://help.netflix.com/en/node/277'],
  openai: ['OpenAI 支持国家与地区', 'https://help.openai.com/en/articles/7947663-chatgpt-supported-countries'],
  openclash: ['OpenClash 官方项目', 'https://github.com/vernesong/OpenClash'],
  openwrt: ['OpenWrt 官方用户指南', 'https://openwrt.org/docs/guide-user/start'],
  passwall: ['PassWall 官方项目', 'https://github.com/xiaorouji/openwrt-passwall'],
  quantumult: ['Quantumult X 官方示例仓库', 'https://github.com/crossutility/Quantumult-X'],
  shadowrocket: ['Shadowrocket App Store 页面', 'https://apps.apple.com/us/app/shadowrocket/id932747118'],
  singbox: ['sing-box 官方文档', 'https://sing-box.sagernet.org/'],
  subconverter: ['subconverter 官方项目', 'https://github.com/tindy2013/subconverter'],
  surge: ['Surge 官方手册', 'https://manual.nssurge.com/'],
  surfboard: ['Surfboard 官方网站', 'https://getsurfboard.com/'],
  v2rayn: ['v2rayN 官方项目', 'https://github.com/2dust/v2rayN'],
  v2rayng: ['v2rayNG 官方项目', 'https://github.com/2dust/v2rayNG'],
  v2rayu: ['V2rayU 官方项目', 'https://github.com/yanue/V2rayU'],
};
const guideEvidence = (slug) => {
  if (/v2rayng/.test(slug)) return { image: 'v2rayng.png', keys: ['v2rayng', 'android'] };
  if (/v2rayn-/.test(slug) || /windows-pc/.test(slug)) return { image: 'v2rayn.png', keys: ['v2rayn', 'microsoft'] };
  if (/v2rayu/.test(slug)) return { image: 'v2rayu.png', keys: ['v2rayu', 'apple'] };
  if (/sing-box/.test(slug)) return { image: 'sing-box.png', keys: ['singbox', 'android'] };
  if (/openclash/.test(slug)) return { image: 'openclash.png', keys: ['openclash', 'openwrt'] };
  if (/passwall/.test(slug)) return { image: 'passwall.png', keys: ['passwall', 'openwrt'] };
  if (/openwrt|router/.test(slug)) return { image: 'openwrt.png', keys: ['openwrt', 'openclash', 'passwall'] };
  if (/subconverter/.test(slug)) return { image: 'subconverter.png', keys: ['subconverter', 'mihomo'] };
  if (/nekoray/.test(slug)) return { image: 'nekoray.png', keys: ['nekoray', 'singbox'] };
  if (/surge/.test(slug)) return { image: 'surge.png', keys: ['surge', 'apple'] };
  if (/loon/.test(slug)) return { image: 'loon.png', keys: ['loon', 'apple'] };
  if (/quantumult/.test(slug)) return { image: 'quantumult-x.png', keys: ['quantumult', 'apple'] };
  if (/ios|shadowrocket|apple-id/.test(slug)) return { image: 'shadowrocket.png', keys: ['shadowrocket', 'apple'] };
  if (/netflix|apple-tv/.test(slug)) return { image: 'netflix.png', keys: ['netflix', 'surge'] };
  if (/chatgpt|ai-streaming/.test(slug)) return { image: 'netflix.png', keys: ['openai', 'netflix'] };
  if (/uwp|microsoft/.test(slug)) return { image: 'microsoft-network.png', keys: ['microsoft'] };
  if (/android|surfboard/.test(slug)) return { image: 'android-vpn.png', keys: ['android', 'v2rayng', 'surfboard'] };
  return { image: 'clash-verge.png', keys: ['clash', 'mihomo'] };
};
const addGuideEvidence = (body, slug) => {
  const marker = '## 官方资料、配图与推广说明';
  if (body.includes(marker)) return body;
  const { image, keys } = guideEvidence(slug);
  const sources = keys.map((key) => sourceCatalog[key]).filter(Boolean)
    .map(([label, url]) => `- [${label}](${url})`).join('\n');
  return `${body.trim()}\n\n${marker}\n\n![官方项目或文档页面截图](/images/guides/official/${image})\n\n> 配图来自对应官方项目或官方文档页面，用于核对软件与资料入口，不代表本站完成了该步骤的设备实测；界面可能随版本更新。\n\n${sources}\n\n**推广披露：** 文中部分机场入口属于推广链接。若读者通过链接注册或购买，本站可能获得佣金，但不会增加读者的支付价格。详情见[推广披露](/affiliate-disclosure/)。\n`;
};

for (const name of markdownFiles('guides')) {
  const file = new URL(`guides/${name}`, contentRoot);
  const slug = basename(name, '.md');
  let { frontmatter, body } = splitDocument(file);
  if (!/^draft:/m.test(frontmatter)) {
    frontmatter = frontmatter.replace(/^(createdAt:[^\r\n]+\r?\n)/m, '$1draft: true\nstatus: drafting\n');
  }
  frontmatter = frontmatter
    .replace(/^(\s+sourcesAttributed:)\s*(?:true|false)\s*$/m, '$1 true')
    .replace(/^(\s+imageAltText:)\s*(?:true|false)\s*$/m, '$1 true')
    .replace(/^(\s+affiliateDisclosure:)\s*(?:true|false)\s*$/m, '$1 true');
  body = cleanBodyFormatting(replaceReferralLinks(body, slug, 'guide'));
  body = addGuideEvidence(body, slug);
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
