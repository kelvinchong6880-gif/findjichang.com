// 生成 GitHub 仓库首页 README（「机场推荐」榜单页），数据全部读自本站数据文件，不手写数字
// 用法：pnpm readme   → 覆盖根目录 README.md（开发说明在 docs/DEVELOPMENT.md）
// 数据来源：src/data/brands.ts（排名、名称）、src/data/plans.ts（套餐、优惠码、更新日期）、src/data/picks.ts（推荐理由）
import fs from 'node:fs';

const SITE = 'https://www.findjichang.com';
const read = (f) => fs.readFileSync(f, 'utf8');
const between = (txt, start, end) => {
  const i = txt.indexOf(start);
  if (i < 0) throw new Error(`找不到：${start}`);
  const j = txt.indexOf(end, i + start.length);
  return txt.slice(i + start.length, j);
};
const evalLiteral = (src) => new Function(`return (${src});`)();

const brandsSrc = read('src/data/brands.ts');
const plansSrc = read('src/data/plans.ts');
const picksSrc = read('src/data/picks.ts');

const brands = evalLiteral(`[${between(brandsSrc, 'export const brands: Brand[] = [', '].map(')}]`)
  .map(([name, slug], i) => ({ name, slug, rank: i + 1 }));
const plans = evalLiteral(`{${between(plansSrc, 'export const plans: Record<string, PlanSet> = {', '\n};')}}`);
const reasons = evalLiteral(`{${between(picksSrc, 'export const reasons: Record<string, string> = {', '\n};')}}`);
const UPDATED = plansSrc.match(/export const UPDATED = '([\d-]+)'/)[1];
const year = UPDATED.slice(0, 4);
const month = Number(UPDATED.slice(5, 7));

const yuan = (n) => `¥${Number.isInteger(n) ? n : n.toFixed(2).replace(/0$/, '')}`;
const gb = (n) => (n >= 1000 ? `${(n / 1000).toFixed(n % 1000 ? 1 : 0)}TB` : `${n}GB`);
const eqOf = (p) => {
  const c = [];
  if (p.month) c.push(p.month.price);
  if (p.year) c.push(p.year.price / 12);
  if (p.quarter) c.push(p.quarter.price / 3);
  return c.length ? Math.min(...c) : null;
};
const go = (slug) => `${SITE}/go/${slug}/?from=/github/`; // from 必须以 / 开头，见 functions/go/[brand].ts
const review = (slug) => `${SITE}/jichang/${slug}/`;

const rows = brands.map((b) => ({ ...b, p: plans[b.slug] ?? {} })).map((r) => ({ ...r, eq: eqOf(r.p) }));
const top = rows.slice(0, 12);

const table = top.map((r, i) => {
  const name = i === 0 ? `**[${r.name}](${review(r.slug)})** 主推` : `[${r.name}](${review(r.slug)})`;
  const m = r.p.month ? `${yuan(r.p.month.price)} · ${gb(r.p.month.gb)}` : '—';
  const y = r.p.year ? `${yuan(r.p.year.price)} · 每月${gb(r.p.year.gb)}` : r.p.quarter ? `季付 ${yuan(r.p.quarter.price)}` : '—';
  const eq = r.eq !== null ? `¥${Math.round(r.eq * 10) / 10}` : '不限时包';
  return `| ${i + 1} | ${name} | ${m} | ${y} | ${eq} | ${r.p.promo ? `\`${r.p.promo}\`` : '—'} | [官网](${go(r.slug)}) |`;
}).join('\n');

const reasonList = rows.filter((r) => reasons[r.slug]).slice(0, 5)
  .map((r, i) => `${i + 1}. **[${r.name}](${review(r.slug)})**：${reasons[r.slug]}`).join('\n');

const fair = rows.filter((r) => !(r.p.note || '').includes('倍率')); // 有流量倍率的机场标称流量不可直接比较，不放进预算推荐
const withEq = rows.filter((r) => r.eq !== null);
const cheapest = withEq.filter((r) => fair.includes(r)).sort((a, b) => a.eq - b.eq || a.rank - b.rank);
const monthOnly = fair.filter((r) => r.p.month).sort((a, b) => a.p.month.price - b.p.month.price || a.rank - b.rank);
const perGB = fair.filter((r) => r.p.month).sort((a, b) => a.p.month.price / a.p.month.gb - b.p.month.price / b.p.month.gb || a.rank - b.rank);
const eqs = withEq.map((r) => r.eq).sort((a, b) => a - b);
const fmt = (n) => `¥${Math.round(n * 10) / 10}`;

const md = `# ${year} 机场推荐｜${rows.length} 家机场排行榜与价格对比（${month}月更新）

> 本仓库是 [找机场（findjichang.com）](${SITE}/) 的网站源码，首页是「机场推荐」榜单精简版，随官网数据同步更新。
> 完整榜单、每家机场的测评、测速资料与新手教程请看：**[机场推荐 · ${year}](${SITE}/)**

收录 **${rows.length} 家**机场，按本站推荐顺序排名，综合考虑套餐价格、流量、节点数量和资料完整度。价格整理于 ${UPDATED}，以各机场官网实时价格为准。

## ${year} 机场推荐 TOP ${top.length}

月付 = 最便宜的月付套餐；年付 = 最便宜的年付套餐（流量为每月）；折合月价 = 月付、季付、年付中最便宜的折合每月价格。

| # | 机场 | 月付 | 年付 | 折合月价 | 优惠码 | 官网 |
|:-:|---|---|---|:-:|---|:-:|
${table}

完整 ${rows.length} 家排名见 **[机场排行榜](${SITE}/ranking/)**。

## 前五名推荐理由

${reasonList}

## 按预算选机场

- **折合月价最低**：${cheapest.slice(0, 3).map((r) => `[${r.name}](${review(r.slug)})（${fmt(r.eq)}）`).join('、')}
- **月付门槛最低**：${monthOnly.slice(0, 3).map((r) => `[${r.name}](${review(r.slug)})（${yuan(r.p.month.price)}/月 · ${gb(r.p.month.gb)}）`).join('、')}
- **每 GB 最便宜**：${perGB.slice(0, 3).map((r) => `[${r.name}](${review(r.slug)})（${yuan(r.p.month.price)} · ${gb(r.p.month.gb)}）`).join('、')}

| 需求 | 推荐看 |
|---|---|
| 不知道怎么选 | [机场推荐](${SITE}/) |
| 看完整排名 | [机场排行榜](${SITE}/ranking/) |
| 预算有限、学生党 | [便宜机场](${SITE}/cheap-airport/) |
| 流量用得多、比单价 | [性价比机场](${SITE}/best-value-airport/) |
| 多家并排比较 | [机场对比表](${SITE}/compare/) |
| 看测速记录 | [机场测速资料](${SITE}/speed-test/) |
| 新手配置客户端 | [使用教程](${SITE}/guide/) |

## ${year} 机场价格行情

- 折合月价最低：${fmt(eqs[0])}
- 折合月价中位数：${fmt(eqs[Math.floor(eqs.length / 2)])}
- 折合月价 10 元以内：${eqs.filter((n) => n <= 10).length} 家
- 有月付套餐：${rows.filter((r) => r.p.month).length} 家

## 买机场前的 5 个建议

1. **先月付**：第一次买先买一个月，在自己的网络里试过晚高峰再考虑年付。
2. **看折合月价**：年付通常更便宜，但流量按月重置，用不完不累计。
3. **看倍率**：部分机场节点有流量倍率，实际可用流量要除以倍率。
4. **看解锁**：要用 ChatGPT 或看 Netflix，先确认节点地区与解锁说明。
5. **留备用**：主力机场之外，留一个小流量或不限时流量包防失联。

## 常见问题

**机场排行榜怎么排的？**
综合套餐价格、流量、节点数量和资料完整度排序，方法见 [评测与测速资料方法](${SITE}/methodology/)。

**机场和 VPN 有什么区别？**
见 [机场知识](${SITE}/knowledge/)。客户端怎么配置见 [使用教程](${SITE}/guide/)。

## 声明

- 数据来源：各机场官网公开套餐，价格以官网实时显示为准。
- 表格中的「官网」为推广链接，通过它购买本站可能获得佣金，不影响你的购买价格；详见 [推广关系与链接说明](${SITE}/affiliate-disclosure/)。
- 请遵守当地法律法规，合理使用网络服务。
- 网站开发说明见 [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)。

---

最后更新：${UPDATED}　·　完整版：**[findjichang.com](${SITE}/)**
`;

fs.writeFileSync('README.md', md);
console.log(`已生成 README.md（${top.length} 家榜单，共 ${rows.length} 家，最后更新 ${UPDATED}）`);
