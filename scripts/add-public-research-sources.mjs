import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const brandFile = fs.readFileSync(path.join(root, 'src/data/brands.ts'), 'utf8');
const brands = [...brandFile.matchAll(/\['([^']+)',\s*'([^']+)',\s*'([^']+)'\]/g)].map(([, name, slug, affiliateUrl]) => ({ name, slug, affiliateUrl }));

const tizi = {
  label: '机场测速与公开资料索引', publisher: 'TiziNodes', url: 'https://tizinodes.com/airport-test/',
  sourceType: 'third-party-review', publishedAt: '2026-08-10', collectedAt: '2026-08-24',
  supports: ['第三方公开资料分类', '官网可达性监测口径'], mayBeOutdated: true,
  notes: '该页面的响应时间是第三方监测环境到官网的 HTTPS 响应，不是机场节点延迟。'
};

const tiziBrands = new Set(['ermao','yuzhou-cloud','xingdaomeng','feimao-yun','lingmao','kuajie-yun','firefly','guangsu','weitu-cloud','kuaili','jilian-cloud','guangnian','yifan','u1s1','quanqiu-cloud','sogo-yun','sujie','kexin-cloud']);

const independent = {
  'feimao-yun': [{
    label: '飞猫云评测：套餐价格、协议支持与全节点样本', publisher: 'AI灯塔', url: 'https://www.aidengta.blog/review/feimaoyun/',
    sourceType: 'third-party-test', publishedAt: '2026-07-31', collectedAt: '2026-08-24',
    supports: ['第三方 56 节点样本', '分地区 TLS RTT 与吞吐区间'], mayBeOutdated: true,
    notes: '第三方单次测试；网络位置、工具和时段与本站未来测试不可直接横比。'
  }, {
    label: '飞猫云套餐与公开信息核验', publisher: '机场知库', url: 'https://jichangzhiku.com/reviews/feimaoyun/',
    sourceType: 'third-party-review', publishedAt: '2026-08-06', collectedAt: '2026-08-24',
    supports: ['第三方套餐整理', '公开信息不足提示'], mayBeOutdated: true
  }],
  'kuajie-yun': [{
    label: '跨界云套餐与风险分析', publisher: 'Clash节点查', url: 'https://clashjiedian.org/kuajieyun-review',
    sourceType: 'third-party-review', publishedAt: '2026-08-01', collectedAt: '2026-08-24',
    supports: ['第三方套餐结构整理', '新服务短周期试用建议'], mayBeOutdated: true
  }],
  'sogo-yun': [{
    label: 'SOGO云公开资料与截图样本说明', publisher: '二毛', url: 'https://www.ermao.net/blog/sogoyun/',
    sourceType: 'third-party-review', publishedAt: '2026-04-14', collectedAt: '2026-08-24',
    supports: ['第三方套餐与客户端信息', '截图样本的证据边界'], mayBeOutdated: true
  }],
  'weitu-cloud': [{
    label: '唯兔云 50 节点第三方测试', publisher: '机场推荐指南', url: 'https://githubvpn.pro/reviews/weituyun',
    sourceType: 'third-party-test', publishedAt: '2026-07-19', collectedAt: '2026-08-24',
    supports: ['第三方测试时间与节点样本', '香港与新加坡 TLS RTT 区间'], mayBeOutdated: true,
    notes: '测试发生在 17:24，来源明确提示不是晚高峰；速度单位与工具需按原页理解。'
  }, {
    label: '唯兔云历史测速与状态更新', publisher: '茶波博客', url: 'https://clashx.pro/onlyrabbit-review/',
    sourceType: 'third-party-review', collectedAt: '2026-08-24', supports: ['多运营商测速截图入口', '历史状态更新'], mayBeOutdated: true
  }],
  'guangsu': [{
    label: '光速云第三方全节点测试', publisher: 'AI灯塔', url: 'https://www.aidengta.blog/review/guangsuyun/',
    sourceType: 'third-party-test', publishedAt: '2026-07-31', collectedAt: '2026-08-24',
    supports: ['第三方 63 节点测试', '协议与地区样本'], mayBeOutdated: true
  }, {
    label: '光速云 MiaoKo 历史测试解读', publisher: '川沐', url: 'https://www.cuanmu.com/blog/guangsuyun-vpn-review/',
    sourceType: 'third-party-test', publishedAt: '2026-06-15', collectedAt: '2026-08-24',
    supports: ['2025-12 历史测速样本', '测试工具与节点数说明'], mayBeOutdated: true
  }],
  'wuyou': [{
    label: '无忧链接公开资料页', publisher: '机场之家', url: 'https://jichanghome.com/airport/wuyoulianjie',
    sourceType: 'third-party-review', collectedAt: '2026-08-24', supports: ['第三方套餐与节点地区整理'], mayBeOutdated: true
  }],
  'lingmao': [{
    label: '灵猫公开资料与测试边界', publisher: '机场实测室', url: 'https://jichangtuijian.mom/reviews/lingmao/',
    sourceType: 'third-party-review', publishedAt: '2026-08-18', collectedAt: '2026-08-24',
    supports: ['第三方套餐分析', '未测试项目说明'], mayBeOutdated: true
  }]
};

function cleanOfficial(raw) {
  const url = new URL(raw);
  return `${url.protocol}//${url.host}/`;
}

function q(value) { return JSON.stringify(value); }

function yamlSource(source) {
  const lines = [
    `  - label: ${q(source.label)}`,
    `    publisher: ${q(source.publisher)}`,
    `    url: ${q(source.url)}`,
    `    sourceType: ${q(source.sourceType)}`,
  ];
  if (source.publishedAt) lines.push(`    publishedAt: ${source.publishedAt}`);
  lines.push(`    collectedAt: ${source.collectedAt}`);
  lines.push('    supports:');
  for (const item of source.supports) lines.push(`      - ${q(item)}`);
  lines.push(`    mayBeOutdated: ${source.mayBeOutdated ? 'true' : 'false'}`);
  if (source.notes) lines.push(`    notes: ${q(source.notes)}`);
  return lines.join('\n');
}

function sourcesFor(brand) {
  const official = {
    label: `${brand.name}品牌入口`, publisher: brand.name, url: cleanOfficial(brand.affiliateUrl),
    sourceType: 'official', collectedAt: '2026-08-24',
    supports: ['品牌注册或用户中心入口', '购买前复核套餐与规则的原始入口'], mayBeOutdated: true,
    notes: '站内现有品牌入口；页面主体、套餐、条款和域名变更仍需在付款前再次核对。'
  };
  return [official, ...(tiziBrands.has(brand.slug) ? [tizi] : []), ...(independent[brand.slug] || [])];
}

function citationRows(sources) {
  return sources.map((s) => `| [${s.label}](${s.url}) | ${s.publisher} | ${s.sourceType === 'official' ? '品牌入口/原始页面' : s.sourceType === 'third-party-test' ? '第三方测试' : '第三方整理'} | ${s.collectedAt} | ${s.supports.join('；')} |`).join('\n');
}

function findingText(slug) {
  const findings = {
    'feimao-yun': 'AI灯塔公开了一组 2026-07-31 的 56 节点第三方样本，并按香港、台湾、新加坡、日本、美国等地区给出 TLS RTT 与吞吐区间。本文只把它当作该来源、该时点的外部观察，不将其改写成本站测速，也不与本站后台 71 条节点快照强行一一对应。',
    'kuajie-yun': 'Clash节点查与 TiziNodes 都整理了跨界云的套餐结构，但对长期运营记录和独立性能证据持保留态度。可据此交叉检查套餐名称和购买门槛，不能据此证明“全专线”或晚高峰稳定。',
    'sogo-yun': '二毛的页面说明其结论来自提供的测速截图，并明确提醒样本不代表所有地区与时段。这类截图可以证明曾出现过某次结果，但缺少完整原始日志时不进入本站性能排名。',
    'weitu-cloud': '机场推荐指南标注了 2026-07-19 17:24 的 50 节点测试，香港 TLS RTT 为 81–113ms、新加坡为 81–108ms，并明确提示并非晚高峰。茶波博客另有不同时间与运营商的历史记录，且后续状态评价发生变化，说明单次漂亮结果不能替代持续复测。',
    'guangsu': 'AI灯塔记录了 2026-07-31 的 63 节点第三方测试；川沐引用 MiaoKo 的 2025-12 历史样本。两组资料测试日期、协议和环境不同，只能分别呈现，不能合并成一个“平均速度”。',
    'wuyou': '机场之家整理了无忧的套餐与常见节点地区，但其页面以公开资料为主。本文只用它帮助交叉核对字段，不采纳缺少测试环境的性能结论。',
    'lingmao': '机场实测室明确区分节点测速截图与未执行的流媒体、AI 测试。本文沿用这一证据边界：没有逐平台操作记录的项目仍写“未测试”。'
  };
  return findings[slug] || '本轮公开检索没有找到同时具备明确测试日期、网络环境、工具、节点样本和原始记录的独立性能报告。为了避免用搜索摘要或营销转载补数字，本文保留“尚无可复现第三方测速”的结论；读者仍可通过上表入口复核当前套餐与规则。';
}

for (const brand of brands) {
  const sources = sourcesFor(brand);
  const yaml = `sources:\n${sources.map(yamlSource).join('\n')}`;
  const table = `| 来源 | 发布者 | 类型 | 本次采集 | 可支持的内容 |\n| --- | --- | --- | --- | --- |\n${citationRows(sources)}`;
  const reviewSection = `\n\n## 公开资料与第三方信息核验\n\n本轮于 **2026-08-24** 对 ${brand.name} 的品牌入口、公开评测与可见测试资料进行了检索。来源分级如下；链接可能包含推广关系的页面也只作为外部资料使用，不能替代原始日志或本站独立测试。\n\n${table}\n\n${findingText(brand.slug)}\n\n### 这些资料怎样进入结论\n\n套餐名称、价格、周期和流量优先与品牌入口交叉核对；第三方整理若与现有套餐表冲突，会保留采集日期并标记差异。线路、带宽、原生 IP、解锁与“专线”等宣传词，除非有路由、逐节点测试或平台访问证据，否则只写成运营方或第三方的表述。第三方测速必须保留发布者、测试日期、环境与限制，不参与本站实测排名。\n`;
  const speedSection = `\n\n## 第三方测速资料与可比性\n\n${table}\n\n${findingText(brand.slug)}\n\n第三方数据的价值是提供外部样本，不是替本站完成测试。不同来源的网络接入、城市、设备、客户端、并发、测速服务器和时段往往不同，因此本文不会把它们直接横向排名，也不会把 MB/s 与 Mbps 混用。只有来源明确给出的数字才会引用；没有测试方法或仅有营销结论的页面不进入结果表。\n`;

  for (const [folder, section, marker] of [
    ['reviews', reviewSection, '## 公开资料与第三方信息核验'],
    ['speed-tests', speedSection, '## 第三方测速资料与可比性']
  ]) {
    const file = path.join(root, 'src/content', folder, `${brand.slug}.md`);
    let text = fs.readFileSync(file, 'utf8');
    text = text.replace(/^sources:\s*\[\]\s*$/m, yaml);
    text = text.replace(/^updatedAt:.*$/m, 'updatedAt: 2026-08-24T18:30:00+08:00');
    if (!text.includes(marker)) text += section;
    fs.writeFileSync(file, text, 'utf8');
  }
}

console.log(`Updated ${brands.length * 2} articles with public-source provenance.`);
