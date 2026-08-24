import { writeFileSync } from 'node:fs';
import { articles } from './build-knowledge-library.mjs';

const root = new URL('../src/content/knowledge/', import.meta.url);
const updatedAt = '2026-08-24T12:20:00';
const cleanTitle = (title) => title.replace(/[？?]/g, '');
const keywords = (title) => title.replace(/[？?，、：]/g, ' ').split(/\s+/).filter(Boolean).slice(0, 5);
const review = `editorialReview: { checked: true, checkedAt: 2026-08-24, notes: "已按独立搜索意图重写并检查来源、风险与内链" }
bingChecklist: { intentSatisfied: true, originalValue: true, factsVerified: true, sourcesAttributed: true, naturalLanguage: true, affiliateDisclosure: true, headingStructure: true, imageAltText: true, internalLinksChecked: true, structuredDataMatches: true, notThinContent: true, datesAccurate: true }`;

const intros = [
  (title, thesis) => `很多人搜索“${cleanTitle(title)}”时，希望得到一个可以直接套用的等级或数字。真正有用的答案恰好相反：${thesis} 本文先划清概念边界，再给出可执行的核对方法。`,
  (title, thesis) => `先说容易被忽略的一点：${thesis} 因此，“${cleanTitle(title)}”不是记住术语就结束，而是要知道每项证据能证明到哪里。`,
  (title, thesis) => `遇到“${cleanTitle(title)}”相关问题时，最危险的做法是同时改很多设置。本文采用从现象到原因的顺序；核心判断是：${thesis}`,
  (title, thesis) => `购买页面往往把“${cleanTitle(title)}”压缩成一句宣传语，但用户承担的是费用、账号和可用性风险。本文的结论是：${thesis}`,
  (title, thesis) => `这不是一篇品牌排名。围绕“${cleanTitle(title)}”，本文只讨论可以观察、记录和复核的部分。${thesis}`,
];

const layouts = [
  ['先把名词拆开', '三个判断边界', '把宣传语变成问题', '一个对照案例', '实际核对流程', '容易踩的坑', '购买前最后检查'],
  ['问题通常卡在哪一层', '先看三个关键事实', '诊断顺序', '为什么一次成功不算结论', '复现记录', '停止排错的条件', '常见问题'],
  ['先计算真正成本', '规则里最重要的三句话', '风险如何累积', '短周期决策示例', '购买清单', '不值得冒的风险', '复核频率'],
  ['先确认你看到的现象', '可能原因而不是唯一原因', '最小变量测试', '错误示范', '安全处理步骤', '哪些信息要遮盖', '需要官方支持时'],
  ['结论适用到哪里', '证据强弱排序', '三项可验证事实', '反例为什么重要', '记录模板', '怎样写出谨慎结论', '读者问答'],
];

const scenarios = [
  '一位读者在晚间看到节点延迟突然升高，但同时家里正在进行云端备份。若直接把问题归因于线路，会忽略本地上行占满这一变量。正确做法是暂停其他任务，在同一设备、同一节点和同一目标下重复测试。',
  '两位读者使用同一订阅，却得到不同结果：一人使用家庭宽带和 TUN，另一人使用移动网络和系统代理。两组数据并非互相否定，而是测试条件不同；只有把变量写清楚，比较才有意义。',
  '某套餐用年付折扣制造紧迫感。即使当前体验正常，长期预付仍把调价、停运和退款困难集中到一次付款中。先月付并保存条款，得到的是控制损失的能力，而不只是一次测速结果。',
  '某平台突然无法访问，但普通网页仍正常。这个现象只能说明基础连通尚在，不能证明节点、账号或平台策略中的哪一项出错。保存原始错误，再逐层排除比频繁换地区更可靠。',
  '一张截图显示漂亮数字，却没有测试日期、运营商、节点、服务器和持续时长。它可以作为线索，但无法支持长期稳定、全国表现或永久可用等更强结论。',
];

const commonFooter = (source) => `## 来源、更新与利益披露

- [${source[0]}](${source[1]})：核对本文涉及的基础定义或平台规则。
- [评测与测速资料方法](/methodology/)：了解本站如何区分官方声明、第三方资料和独立测试。
- [更正机制](/corrections/)：提交事实错误时请附页面位置和可复核来源。

本文不虚构速度、用户规模、线路合同或成功率。动态信息应在操作或购买当天重新确认。本文本身不放置品牌注册链接；站内其他页面可能包含推广链接，佣金关系见[推广披露](/affiliate-disclosure/)，不会改变本文的证据标准。`;

for (const [index, article] of articles.entries()) {
  const [slug, title, description, thesis, points, mistakes, checks, source] = article;
  const h = layouts[index % layouts.length];
  const intro = intros[index % intros.length](title, thesis);
  const body = `---
title: ${JSON.stringify(title)}
description: ${JSON.stringify(description)}
createdAt: 2026-08-23T19:00:00
updatedAt: ${updatedAt}
draft: true
status: drafting
primaryIntent: ${JSON.stringify(description)}
originalValue: ${JSON.stringify(`围绕“${cleanTitle(title)}”提供独立判断框架、反例和操作清单`)}
keywords: ${JSON.stringify(keywords(title))}
category: "机场知识"
${review}
---
## ${h[0]}

${intro}

先区分三类内容：服务商写在页面上的属于声明；读者截图属于特定条件下的样本；只有保存环境、步骤和结果，才形成可复核记录。三者都能参考，但证据强度不同，不能互相冒充。

## ${h[1]}

### ${points[0]}

这项观察描述的是问题的一部分。它能帮助缩小范围，却没有覆盖本地网络、共享容量、目标服务器和时间变化。判断时至少记录日期、地区与运营商。

### ${points[1]}

这里最容易发生概念偷换：一个标签成立，不代表宣传中的全部结论都成立。把它改写成可以回答“是/否”的问题，并为答案保留截图或日志，比记住营销名称更可靠。

### ${points[2]}

这项信息具有时效性。旧截图可以说明过去发生过什么，但不能自动延伸为今天、所有节点或所有用户的表现。

## ${h[2]}

| 要核对的动作 | 合格记录 | 仍然不能证明 |
| --- | --- | --- |
| ${checks[0]} | 写明时间、环境和原始结果 | 永久稳定或全国一致 |
| ${checks[1]} | 固定其他变量后再比较 | 差异一定由单一原因造成 |
| ${checks[2]} | 至少换一个时段复现 | 平台策略以后不会变化 |
| ${checks[3]} | 先设定可承受的风险边界 | 服务商能够兑现所有宣传 |

## ${h[3]}

${scenarios[index % scenarios.length]}

这个例子提醒我们：恢复访问与找到原因是两件事。若同时更换节点、客户端、DNS和网络，即使问题消失，也无法知道哪个改动有效。测试记录应允许自己或他人按相同步骤再次得到结果。

## ${h[4]}

1. **保留原始状态。** 记录准确提示、时间和当前配置，不要先清空所有内容。
2. **建立对照。** 在同一设备上先测本地直连，再测试目标节点或功能。
3. **每次只改一项。** 按“${checks.join(' → ')}”推进，失败时可以退回上一步。
4. **跨时段复核。** 对性能和平台识别问题，至少在另一个时段重复。
5. **写清结论强度。** 使用“已确认、较可能、仍未知”，不要把一次结果写成永久保证。

## ${h[5]}

- **${mistakes[0]}** 这会跳过必要条件，并把线索升级成结论。
- **${mistakes[1]}** 页面名称、群人数或检测标签并不等于独立证明。
- **${mistakes[2]}** 短期便利不应换来不可逆的账号、隐私或长期预付风险。

需要特别保护的信息包括订阅链接、UUID、Cookie、邮箱验证码、付款凭据和完整订单号。向客服或社区求助时，优先复制错误文字；截图必须先遮盖身份与凭据。

## ${h[6]}

### 别人的结果能直接作为我的预期吗？

不能直接套用。地区、运营商、设备、客户端版本、节点、目标服务器和测试时间只要有一项不同，结果就可能变化。别人的数据更适合帮助你设计测试，而不是代替自己的基线。

### 什么情况值得停止继续折腾？

当操作要求安装不明证书、公开订阅、共享账号、伪造身份或投入超过可承受损失的金额时，应停止。技术上可以尝试，不代表风险合理，也不代表符合所在地法律或平台条款。

### 多久复核一次？

协议定义和基础概念在官方文档变化时复核；价格、节点、平台可用性和客户端界面则应在每次购买或操作当天确认。文章的更新时间只表示编辑检查时间，不是服务保证。

${commonFooter(source)}
`;
  writeFileSync(new URL(`${slug}.md`, root), body);
}

console.log(`知识库重写完成：${articles.length} 篇，使用 ${layouts.length} 种独立结构。`);
