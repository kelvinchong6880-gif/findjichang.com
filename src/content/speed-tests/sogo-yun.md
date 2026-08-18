---
title: Sogo云机场测速资料汇总：辽宁移动样本与证据限制
description: 整理 Sogo云 2026年4月第三方测速截图，记录测试网络、工具、节点、延迟和下载速度范围，并说明晚高峰、上传与丢包数据缺口。
createdAt: 2026-08-18
updatedAt: 2026-08-18
draft: true
status: fact-checking
primaryIntent: 帮助用户正确理解 Sogo云现有第三方测速截图能证明什么、不能证明什么。
originalValue: 读取原始截图中的环境、时间、节点与指标，同时明确缺失字段，不根据单次样本生成排名。
editorialReview:
  checked: false
  notes: 等待人工复核；需要补充晚高峰、上传、丢包和不同运营商样本。
bingChecklist:
  intentSatisfied: true
  originalValue: true
  factsVerified: false
  sourcesAttributed: true
  naturalLanguage: true
  affiliateDisclosure: true
  headingStructure: true
  imageAltText: false
  internalLinksChecked: true
  structuredDataMatches: true
  notThinContent: true
  datesAccurate: true
brandSlug: sogo-yun
reviewSlug: sogo-yun
keywords: [Sogo云测速, Sogo机场测速, Sogo Cloud速度, Sogo云晚高峰]
sources:
  - label: Sogo云机场评测与原始测速图
    publisher: 二毛
    url: https://www.ermao.net/blog/sogoyun/
    sourceType: third-party-test
    publishedAt: 2026-04-14
    collectedAt: 2026-08-18
    supports: [提供两张原始测速截图, 提供测试日期、网络、工具、线程数和节点结果]
    mayBeOutdated: true
    notes: 测试发生于下午，缺少设备、上传、丢包和晚高峰记录；页面含推广入口。
testContext:
  device: 官方未公开
  network: 东北—辽宁移动 1Gbps（截图底部标注）
  client: 喵速 5.0.0-beta8 / 主端 4.3.3（696）
  period: 2026-04-13 17:32–17:33 CST，非晚高峰
  originalScreenshot: https://image.ermao.net/images/blog/sogo%E4%BA%91/20260414_090830-ad2052.png
  screenshotEdited: false
---

> **资料状态：第三方单次下午样本。** 截图具备日期、网络和测试工具，比纯文字说法更可核验；但它不是找机场自行实测，也不能代表晚高峰或所有中国大陆用户。

## 样本概况

来源页面提供两张测速截图，底部记录测试时间为 **2026-04-13 17:32–17:33 CST**，网络为 **东北—辽宁移动 1Gbps**，工具为 **喵速 5.0.0-beta8**、主端 **4.3.3（696）**，线程数为 8。截图列出约 60 个 VLESS 节点，涉及香港、台湾、日本、新加坡和美国。

## 截图中能读到的指标

| 项目 | 截图表现 | 解读限制 |
| --- | --- | --- |
| TLS RTT | 约 66–386ms，按节点地区差异明显 | 仅一个入口网络和一次测试 |
| HTTP 延迟 | 多数约 300–1000ms，个别更高 | 不等同于日常网页完整加载时间 |
| 平均下载速度 | 多数可见结果约 40–55MB/s | 存在 0.00MB 和较低结果；未计算全体平均值 |
| 最高速度 | 多数可见结果约 55–63MB/s | 受 1Gbps 本地宽带、测速服务器和 8 线程影响 |
| 上传速度 | 截图未提供 | 待核验 |
| 丢包率 | 截图未提供 | 待核验 |

这里使用 **MB/s**，不能直接与常见的 **Mbps** 混写；理论换算需乘以 8，但协议开销和测试方式会影响实际结果。本站没有从图片手工计算“平均速度”，以免产生虚假精度。

## 节点与解锁截图观察

截图中的节点主要来自香港、台湾、日本、新加坡和美国。Netflix、YouTube 与 ChatGPT 栏多数显示相应地区的“解锁”，BiliBili 一栏多处显示失败或仅部分地区可用。解锁结果只对应当时的出口 IP，后续可能变化。

原始图也出现查询失败、0.00MB/s 和个别明显偏低结果。这些异常没有被删除，说明单次批量测试内部也有差异；不能只挑最高速度代表整体体验。

## 为什么还不能给晚高峰结论

17:32–17:33 不属于本站定义的 20:00–23:00 晚高峰，而且两张图片的测试时间只相隔约一分钟，更像同一批次或重复运行，不是跨天稳定性样本。还缺少：

- 测试设备和操作系统；
- 有效订阅与套餐凭证；
- 上传速度与丢包率；
- 白天和晚高峰的多日对照；
- 电信、联通及其他地区移动网络样本；
- 客户端实际播放、AI 登录与断线重连记录。

## 当前可用结论

这组截图可以证明：该第三方订阅在 2026 年 4 月 13 日的辽宁移动 1Gbps 环境下返回约 60 个节点，并完成过批量延迟、下载与解锁检测。它不能证明 Sogo云长期稳定、全节点不限速或所有用户都能获得相同结果。

购买前建议用最低风险的短周期方案，在自己的网络和设备上连续测试。套餐信息与其他风险见[Sogo云机场测评](/jichang/sogo-yun/)。

## 来源与利益披露

原始截图由第三方评测页面公开，图片版权归原发布者；本站不复制图片，只链接来源并做证据限制分析。来源页面和本站测评页均可能包含推广链接，佣金关系不会把第三方样本改写成本站实测。
