import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const reviewsDir = join(root, 'src/content/reviews');
const speedDir = join(root, 'src/content/speed-tests');

const replaceFrontmatter = (source, key, value) => source.replace(new RegExp(`^${key}:.*$`, 'm'), `${key}: "${value}"`);
const tableAfter = (source, heading) => {
  const start = source.indexOf(heading);
  if (start < 0) return null;
  const rest = source.slice(start + heading.length);
  const match = rest.match(/(?:^\|.*\|\r?\n){3,}/m);
  return match?.[0].trim() ?? null;
};
const rowsOf = (table) => table ? table.split(/\r?\n/).slice(2).map((line) => line.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim())) : [];
const clean = (value = '') => value.replace(/<br\s*\/?>/gi, '、').replace(/\([^)]*折合[^)]*\)/g, '').replace(/\s+/g, ' ').trim();
const hash = (text) => [...text].reduce((sum, char) => sum + char.codePointAt(0), 0);

const openings = [
  (name) => `判断 ${name} 值不值得进一步了解，首先要把“官网写了什么”和“我们实际验证了什么”分开。`,
  (name) => `${name} 的资料页不采用先给排名、再寻找理由的写法，而是从套餐、节点证据和未确认项目逐层判断。`,
  (name) => `对 ${name} 的评价需要回答价格是否可核对、节点是否真实存在、性能是否经过重复测试三个问题。`,
  (name) => `读者搜索 ${name}，通常最关心价格、节点覆盖和晚高峰体验；这三类信息的证据门槛并不相同。`,
  (name) => `${name} 当前更适合被视为一份持续更新的品牌档案，而不是一句“好用”或“不好用”可以概括的产品。`,
  (name) => `本页用可追溯资料整理 ${name}，重点不是堆叠形容词，而是帮助读者识别哪些信息已经确认。`,
];

for (const file of readdirSync(reviewsDir).filter((name) => name.endsWith('.md'))) {
  const slug = file.replace(/\.md$/, '');
  const path = join(reviewsDir, file);
  let source = readFileSync(path, 'utf8');
  const name = source.match(/^title:\s*"?([^"：]+?)(?:机场)?资料页/m)?.[1] ?? slug;
  const planTable = tableAfter(source, '## 官网套餐资料（保留）');
  const nodeTable = tableAfter(source, '## 已核验的节点后台快照');
  const plans = rowsOf(planTable);
  const nodes = rowsOf(nodeTable);
  const snapshot = source.match(/本次共收到 \*\*(\d+) 条节点记录\*\*，其中后台显示在线 \*\*(\d+) 条\*\*、离线 \*\*(\d+) 条\*\*/);
  const namedOnly = source.match(/本次识别到 \*\*(\d+) 个不同节点名称\*\*/);
  const hasNodes = Boolean(snapshot || namedOnly);
  const nodeCount = snapshot?.[1] ?? namedOnly?.[1];
  const primary = slug === 'weifeng';

  const title = primary
    ? `微风机场怎么样？官网套餐、62 条节点快照与选购分析`
    : `${name}机场怎么样？套餐、节点资料与核验进度（2026）`;
  const description = primary
    ? '基于官网套餐与2026年8月24日后台快照整理微风机场62条节点，并说明适用场景、证据边界和后续真实测速计划。'
    : hasNodes
      ? `基于官网套餐与后台快照整理${name}机场的${nodeCount}条节点记录、在线状态、异常项及待验证的真实测速项目。`
      : `整理${name}机场的官网套餐、购买前核验清单和可复现测速计划；目前没有节点证据，不提供虚构速度或稳定性排名。`;
  source = replaceFrontmatter(source, 'title', title);
  source = replaceFrontmatter(source, 'description', description);
  source = source.replace(/## 深度阅读与选购分析[\s\S]*?(?=\n## 当前结论)/, '');

  const firstPlan = plans[0];
  const lastPlan = plans.at(-1);
  const planAnalysis = plans.length
    ? `当前保留的官网套餐表包含 **${plans.length} 个方案**。表中首项为“${clean(firstPlan[0])}”，记录价格为“${clean(firstPlan[1])}”${firstPlan[2] ? `、流量为“${clean(firstPlan[2])}”` : ''}；最后一项为“${clean(lastPlan[0])}”。这些字段适合用来做预算与流量初筛，但不能单独证明线路质量。\n\n选择时可先估算自己的月流量，再比较付款周期。年付或一次性套餐会降低账面月均成本，却也增加服务变化、退款困难和余额沉淀风险；月付更便于观察真实使用情况。表格中的套餐名称若含“入门、影音、团队”等词，应视为运营方命名，不自动等同于编辑推荐。`
    : `目前没有可确认的完整官网套餐表，因此不能以随机价格或其他品牌套餐补位。读者在购买前应保存套餐页截图，核对价格、流量、重置日期、倍率、设备限制、退款规则和工单入口；任何一项缺失，都应作为决策中的不确定性。`;
  const regions = nodes.map((row) => row[0]).filter(Boolean);
  const nodeAnalysis = hasNodes
    ? `后台快照记录了 **${nodeCount} 条${namedOnly ? '节点名称' : '节点记录'}**，涉及 ${[...new Set(regions)].join('、')}。${snapshot ? `采集时显示在线 ${snapshot[2]} 条、离线 ${snapshot[3]} 条。` : '原始界面没有提供统一的在线状态字段。'}这能确认当时后台展示了哪些入口，却不能证明晚高峰速度、跨运营商稳定性或长期可用性。\n\n节点数量较多不必然代表体验更好。真正影响使用的还包括入口拥塞、出口质量、用户所在地、运营商路由、客户端配置和负载调度。后续测试应从主要地区各选代表节点，并保留离线、超时和异常样本；若只展示最快节点，会让读者高估整体表现。`
    : `目前没有 ${name} 的后台节点快照，因此不能确认地区覆盖、协议、倍率或在线状态。页面不会用同一套“香港、日本、新加坡、美国”节点结构自动补齐。节点资料缺失时，最有价值的动作是先验证订阅后台是否可访问，再记录实际出现的节点名称与采集时间。`;
  const primaryBlock = primary ? `## 为什么本站主推微风

本站把微风放在主要推荐位置，依据是目前掌握的官网套餐结构和 62 条后台节点快照较完整，能够比只有宣传文字的品牌提供更多可核对信息。这是编辑选题与商业推广安排，不等于已经证明微风速度第一或适合所有人。

通过本站入口注册可能产生推广收益，读者支付价格原则上不因此增加。推广关系不会改变证据状态：节点在线只代表采集时后台状态，IPLC、直连或解锁能力仍需独立验证。对风险敏感的读者应优先月付或选择较低承诺方案，完成本地测试后再决定是否长期使用。

你可以阅读 [微风稳定性选购分析](/recommend/weifeng-stability/)、[全站推荐说明](/recommend/) 与 [推广披露](/disclaimer/)。准备注册时可使用 [微风站内登记入口](/go/weifeng/?from=/jichang/weifeng/&placement=article-end)，但请先确认官网价格和服务条款没有变化。

` : '';
  const variation = openings[hash(slug) % openings.length](name);
  const expanded = `## 深度阅读与选购分析

${variation} 本页已经删除无来源的速度、解锁和长期稳定性结论，以下分析只使用保留下来的官网套餐记录与用户提供的后台快照。

### 套餐应该怎样比较

${planAnalysis}

### 节点覆盖能说明什么

${nodeAnalysis}

### 哪些读者可以继续观察

如果你能接受先小额验证、愿意记录客户端错误和高峰期表现，并且主要使用地区能在现有资料中找到，${name} 可以进入候选名单。候选并不等于推荐购买：付款前仍应确认官网域名、售后方式、套餐规则和订阅安全，首次尝试避免投入超过自己可承受的损失。

如果你的工作依赖固定出口 IP、明确 SLA、企业合同、可审计隐私条款或稳定的跨境生产环境，仅凭机场后台列表不足以支撑决策。需要长期稳定访问的业务应准备备用方案，也不应把单一订阅作为唯一恢复路径。

### 发布前还缺哪些证据

- 普通时段与晚高峰的重复下载、上传、延迟、抖动和失败记录；
- 测试城市、宽带运营商、设备、客户端版本与本地基线；
- 主要地区代表节点的原始截图或日志，而非只保留最佳结果；
- 流媒体和 AI 平台逐节点、逐时间验证，并区分能打开与能持续使用；
- 官网套餐 URL、服务规则和采集日期，便于后续发现价格变化。

${primaryBlock}`;
  source = source.replace('## 当前结论', `${expanded}## 当前结论`);
  writeFileSync(path, source);

  const speedPath = join(speedDir, file);
  let speed = readFileSync(speedPath, 'utf8');
  const speedTitle = primary
    ? '微风机场测速：62 条节点清单与可复现测试计划'
    : `${name}机场测速：节点清单、测试方案与结果记录（2026）`;
  const speedDescription = hasNodes
    ? `整理${name}机场${nodeCount}条后台节点记录，并提供晚高峰、延迟、丢包和平台可用性的可复现测试矩阵；当前不虚构测速数字。`
    : `${name}机场暂缺真实节点与测速证据；本页提供测试环境、样本选择、原始记录和结果发布标准。`;
  speed = replaceFrontmatter(speed, 'title', speedTitle);
  speed = replaceFrontmatter(speed, 'description', speedDescription);
  speed = speed.replace(/## 分品牌测试执行表[\s\S]*?(?=\n## 当前结论)/, '');

  const matrixRows = nodes.length
    ? nodes.slice(0, 8).map((row, index) => `| ${row[0]} | ${clean(row[1])} | 第 ${index + 1} 组 | 普通时段 + 晚高峰 | 等待实测 |`).join('\n')
    : `| 首批代表节点 | 等待后台清单 | 第 1 组 | 普通时段 + 晚高峰 | 未取得节点 |\n| 第二地区节点 | 等待后台清单 | 第 2 组 | 普通时段 + 晚高峰 | 未取得节点 |`;
  const speedExpanded = `## 分品牌测试执行表

下面的矩阵把 ${name} 当前资料转换为可执行测试任务。测试状态为空不表示性能差，只表示尚未产生合格证据。每组需要固定设备、客户端、测试服务器和本地基线，并保留至少三次结果。

| 地区或样本 | 节点范围 | 测试批次 | 时间窗口 | 当前状态 |
| --- | --- | --- | --- | --- |
${matrixRows}

### 每一批怎样记录

先断开代理测量本地基线，再连接目标节点。下载、上传、延迟和抖动使用相同工具重复采集；连接失败、超时和速度异常都保留。普通时段与晚高峰分开，不把不同时段的数据混成一个“平均速度”。如果节点临时离线，记录观察时间后换到同地区备用节点，但不能删除离线事实。

### 怎样避免误导性排名

不同品牌节点数量、入口位置和用户负载不同，单次速度不能直接排名。正式比较至少需要相同网络、设备、工具、时间窗口和样本数量。后台写有“专线、直连、原生、AI 解锁”等标签时，测试报告仍只报告实际观察，不用标签替代路由或平台验证。

### 结果页将怎样更新

取得真实日志后，本页会增加测试日期、本地基线、每组中位数、波动范围、失败次数和证据说明。只有可复查数据才进入摘要；无法复现或只有单张峰值截图的结果会放入备注，不进入推荐判断。更新历史通过 [更正机制](/corrections/) 保留，完整标准见 [测试方法](/methodology/)。

`;
  speed = speed.replace('## 当前结论', `${speedExpanded}## 当前结论`);
  writeFileSync(speedPath, speed);
}

console.log('Expanded 36 reviews and 36 speed-test articles.');
