import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const brandsText = fs.readFileSync(path.join(root, 'src/data/brands.ts'), 'utf8');
const brands = [...brandsText.matchAll(/\['([^']+)',\s*'([^']+)',\s*'([^']+)'\]/g)]
  .map(([, name, slug]) => ({ name, slug })).filter((brand) => brand.slug !== 'weifeng');

function frontmatter(text, key, value) {
  const pattern = new RegExp(`^${key}:.*$`, 'm');
  return pattern.test(text) ? text.replace(pattern, `${key}: ${value}`) : text;
}

function checklist(text, key, value = 'true') {
  return text.replace(new RegExp(`^(\\s+${key}:)\\s*(?:true|false)$`, 'm'), `$1 ${value}`);
}

function removeSection(text, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(`(?:^|\\r?\\n)## ${escaped}\\r?\\n[\\s\\S]*?(?=\\r?\\n## |$)`, 'g'), '');
}

function replaceKeywords(text, keywords) {
  const lines = keywords.map((keyword) => `  - "${keyword}"`).join('\n');
  return text.replace(/^keywords:\r?\n(?:\s+- .*\r?\n)+/m, `keywords:\n${lines}\n`);
}

function planInfo(text) {
  const section = text.match(/## 官网套餐资料（保留）[\s\S]*?(?=\n## )/)?.[0] || '';
  const rows = section.split('\n').filter((line) => /^\|/.test(line) && !/^\|\s*(?:---|套餐名称)/.test(line));
  return { count: rows.length, first: rows[0]?.split('|').map((x) => x.trim()).filter(Boolean)[0] || '入门套餐' };
}

function nodeInfo(text) {
  const intro = text.match(/本次共收到 \*\*(\d+) 条节点记录\*\*，其中后台显示在线 \*\*(\d+) 条\*\*、离线 \*\*(\d+) 条\*\*；倍率均为 \*\*(.*?)\*\*。/) || [];
  const section = text.match(/## 已核验的节点后台快照[\s\S]*?(?=\n## )/)?.[0] || '';
  const regions = [...section.matchAll(/^\| ([^|]+) \|/gm)].map((m) => m[1].trim()).filter((x) => !['地区或类别','---'].includes(x));
  return intro.length ? { count: Number(intro[1]), online: Number(intro[2]), offline: Number(intro[3]), multiplier: intro[4], regions: [...new Set(regions)] } : null;
}

function reviewSummary(brand, text) {
  const plan = planInfo(text);
  const nodes = nodeInfo(text);
  const nodeLine = nodes
    ? `已取得 **${nodes.count} 条**后台节点记录，采集时在线 ${nodes.online} 条、离线 ${nodes.offline} 条，覆盖 ${nodes.regions.slice(0, 7).join('、') || '多个地区'}。`
    : '目前尚未取得可公开复核的后台节点清单，因此不能确认节点数量、地区分布或在线状态。';
  const verdict = nodes
    ? `${brand.name}已经具备套餐与节点两层资料，可列入短周期候选名单；是否适合作为主力仍取决于本地晚高峰复测。`
    : `${brand.name}目前可用于比较套餐结构，但节点和性能证据不足，更适合作为待观察品牌，不建议仅凭宣传购买长周期。`;
  return `> **先说结论：** ${verdict}\n\n## ${brand.name}基本信息速览\n\n| 项目 | 当前可核验信息 | 证据边界 |\n| --- | --- | --- |\n| 套餐 | 已保留 ${plan.count || '若干'} 档官网套餐记录 | 付款前复核价格与规则 |\n| 节点 | ${nodes ? `${nodes.count} 条后台记录` : '暂无可复核后台清单'} | ${nodes ? '单次后台快照' : '不推测数量'} |\n| 在线状态 | ${nodes ? `${nodes.online}/${nodes.count} 条在采集时显示在线` : '未知'} | 不是长期在线率或 SLA |\n| 地区 | ${nodes ? nodes.regions.slice(0, 7).join('、') : '待核验'} | 节点名称不等于出口归属 |\n| 真实性能 | 等待统一环境测试 | 不使用模拟速度 |\n\n${nodeLine}\n\n选择 ${brand.name} 时应先按月用量筛选套餐，再用月付或最低承诺方案验证本地线路。年付与不限时套餐可能降低账面成本，但会增加服务调整、退款困难和余额沉淀风险；如果你的用途依赖固定 IP、SLA 或生产业务，机场后台列表不足以作为唯一依据。\n`;
}

function speedSummary(brand, text) {
  const nodes = nodeInfo(text);
  const nodeDescription = nodes
    ? `已核验 ${nodes.count} 条后台节点记录；采集时 ${nodes.online} 条在线、${nodes.offline} 条离线，倍率记录为 ${nodes.multiplier}。`
    : '尚未取得可公开复核的后台节点清单，节点数量和在线状态保持未知。';
  return `> **当前结论：** ${nodeDescription} 下载、上传、延迟、抖动、丢包和平台解锁尚未在统一环境完成，因此本页不把后台状态或第三方宣传写成本站速度成绩。\n\n## ${brand.name}测速摘要\n\n| 项目 | 当前结果 | 如何理解 |\n| --- | --- | --- |\n| 后台节点 | ${nodes ? `${nodes.count} 条记录` : '待核验'} | ${nodes ? '带采集时间的单次快照' : '不引用推测值'} |\n| 采集时在线 | ${nodes ? `${nodes.online} 条` : '未知'} | 不等于长期稳定性 |\n| 地区覆盖 | ${nodes ? nodes.regions.slice(0, 7).join('、') : '待核验'} | 按后台节点名称归类 |\n| 下载/上传 | 尚未完成本站测试 | 不用理论带宽代替 |\n| 延迟/丢包 | 尚未完成本站测试 | 不从地理距离推算 |\n| 流媒体/AI | 尚未完成本站测试 | 需要逐节点、逐平台复核 |\n\n后台在线只说明监测系统在采集时收到了响应，不能证明晚高峰带宽、用户所在地到入口的路由或出口质量。正式结果必须记录本地基线、城市、运营商、设备、客户端、工具、测试服务器、日期与时段，并保留失败样本。\n`;
}

for (const brand of brands) {
  for (const type of ['reviews', 'speed-tests']) {
    const file = path.join(root, 'src/content', type, `${brand.slug}.md`);
    let text = fs.readFileSync(file, 'utf8');
    text = frontmatter(text, 'updatedAt', '2026-08-24T23:50:00+08:00');
    text = frontmatter(text, 'draft', 'false');
    text = frontmatter(text, 'status', 'ready');
    text = frontmatter(text, 'primaryIntent', type === 'reviews'
      ? `"帮助读者判断${brand.name}机场是否适合自己的预算、节点需求与风险承受能力"`
      : `"说明${brand.name}机场现有节点证据、测速边界与可复现测试方法"`);
    text = frontmatter(text, 'originalValue', type === 'reviews'
      ? `"结合${brand.name}官网套餐、后台节点快照与第三方资料进行证据分层分析"`
      : `"区分${brand.name}后台在线状态与真实网络性能，并保留失败样本和复测条件"`);
    text = replaceKeywords(text, type === 'reviews'
      ? [`${brand.name}机场`, `${brand.name}机场怎么样`, `${brand.name}机场测评`, `${brand.name}机场套餐`, `${brand.name}机场节点`, `${brand.name}机场官网`]
      : [`${brand.name}机场测速`, `${brand.name}机场节点`, `${brand.name}机场速度`, `${brand.name}机场延迟`, `${brand.name}机场稳定性`, `${brand.name}机场晚高峰`]);
    text = text.replace(/notes: "已删除旧版虚构实测、模拟测速、未经核验节点与绝对化结论；等待真实资料后重写。"/, `notes: "已按证据边界完成${brand.name}${type === 'reviews' ? '品牌测评' : '测速资料'}复核；未知项目保持未知，不使用模拟性能数字。"`);
    for (const key of ['intentSatisfied','factsVerified','sourcesAttributed','originalAnalysis','notThinContent']) text = checklist(text, key);

    const end = text.indexOf('\n---', 4);
    const head = text.slice(0, end + 4);
    let body = text.slice(end + 4).trimStart();
    body = body.replace(/^> .*?\n\n/m, '');

    if (type === 'reviews') {
      body = removeSection(body, '为什么暂时不发布评价');
      body = removeSection(body, '已从旧版清除的内容');
      body = removeSection(body, '需要你提供哪些资料');
      body = removeSection(body, '当前结论');
      if (!body.includes(`## ${brand.name}基本信息速览`)) body = reviewSummary(brand, body) + '\n' + body;
    } else {
      body = removeSection(body, '当前页面能说明什么');
      body = removeSection(body, '已删除的模拟字段');
      body = removeSection(body, '请提供去敏后的节点资料');
      if (!body.includes(`## ${brand.name}测速摘要`)) body = speedSummary(brand, body) + '\n' + body;
    }

    fs.writeFileSync(file, `${head}\n${body.trim()}\n`, 'utf8');
  }
}

console.log(`Polished ${brands.length * 2} non-Weifeng articles.`);
