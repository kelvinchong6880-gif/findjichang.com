---
title: 飞猫云机场测评：套餐、59节点晚高峰与风险分析
description: 核验飞猫云官方公开配置、客户端、商家提供套餐与第三方晚高峰测速，说明香港与美国节点差异、持续监测变化和购买风险。
createdAt: 2026-08-18
updatedAt: 2026-08-18
draft: true
status: fact-checking
primaryIntent: 帮助查询飞猫云的用户区分官方公开信息、商家提供套餐、单次晚高峰实测与持续监测数据。
originalValue: 将时间不同且结论不同的测速资料并列解释，避免用单次高速度掩盖后续监测变化。
editorialReview:
  checked: false
  notes: 等待人工复核；如获得登录后套餐截图，应替换商家提供价格表。
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
brandSlug: feimao-yun
speedTestSlug: feimao-yun
keywords: [飞猫云, 飞猫云机场, 飞猫云测评, 飞猫云价格, 飞猫云测速, FlyCat]
sources:
  - label: 飞猫云公开站点配置接口
    publisher: 飞猫云
    url: https://m1cfjgcx.feimaogfttt1.xyz/api/v1/guest/comm/config
    sourceType: official
    collectedAt: 2026-08-18
    supports: [确认品牌名称、公开描述与官网指向]
    mayBeOutdated: true
  - label: 飞猫云公开用户面板
    publisher: 飞猫云
    url: https://m1cfjgcx.feimaogfttt1.xyz/
    sourceType: official
    collectedAt: 2026-08-18
    supports: [确认2.2.3多平台客户端入口, 确认未登录无法读取套餐]
    mayBeOutdated: true
  - label: 飞猫云机场实测
    publisher: 机场中文网
    url: https://jichangcnweb.com/reviews/feimaoyun/
    sourceType: third-party-test
    publishedAt: 2026-07-02
    collectedAt: 2026-08-18
    supports: [提供2026-07-11晚高峰原始测速图, 提供测试网络、工具、线程和59节点结果, 提供商家价格表与线路拓扑]
    mayBeOutdated: true
    notes: 页面含推广链接；测速为发布者自有订阅，价格表与拓扑由商家提供，来源属性不同。
  - label: 飞猫云持续监测资料
    publisher: GateRank
    url: https://gate-rank.com/airports/flycat-flycatvipaff
    sourceType: third-party-test
    collectedAt: 2026-08-18
    supports: [提供截至2026-08-10的30天可用率、延迟、下载与代理请求失败率趋势]
    mayBeOutdated: true
    notes: 自动监测方法和用户实际客户端环境不同；用于观察趋势，不直接与9Gbps批量测速横向比较。
---

> **当前结论：有可复核的晚高峰样本，但不宜只看一次高速度。** 飞猫云在 2026 年 7 月的一次珠海联通测试中，香港节点表现较强，美国和台湾相对较弱；另一持续监测来源到 8 月显示下载与请求成功情况恶化。两种测试方法不同，但共同说明购买后仍需在自己的网络连续复测。

## 飞猫云是什么

官方公开配置显示品牌名为“飞猫云”，描述为“轻盈飞跃，快速稳定”，官网指向 `flycat.flycatvipaff.cc`。公开面板脚本提供 Windows、macOS、Android 和 iOS 入口，客户端版本显示为 **2.2.3**；iOS 指向 Nextin。

公开资料不能确认运营团队、成立时间、服务等级协议或长期可用率。第三方安装包只记录入口存在，本站不对文件安全性作保证。

## 套餐与价格资料

未登录状态下，官方套餐接口返回需要登录。目前最完整的价格表由商家提供、第三方评测站于 **2026-07-12** 发布：

| 套餐 | 月流量 | 月付 | 年付 | 证据状态 |
| --- | ---: | ---: | ---: | --- |
| 学生版 | 50GB | 无 | 84元 | 商家提供，待登录后核验 |
| 星耀版 | 150GB | 25元 | 240元 | 商家提供，待登录后核验 |
| 星环版 | 300GB | 45元 | 432元 | 商家提供，待登录后核验 |
| 银河版 | 600GB | 85元 | 816元 | 商家提供，待登录后核验 |
| 宇宙版 | 1000GB | 150元 | 1360元 | 商家提供，待登录后核验 |
| 不限时套餐 | 1000GB | 680元一次性 | 无 | 商家提供，待登录后核验 |

同一来源还记录了 15–150 元的流量重置包，并称设备数不受限制。学生版的“7元/月”是 84 元年付折算价，没有月付入口；想短期试用需要从月付套餐开始。优惠码、长期折扣和结算金额都可能变化，不能仅凭第三方表格付款。

## 线路与节点

商家提供的拓扑资料称入口涉及广东联通双 ASN 和德国电信，出口覆盖香港、日本、新加坡、台湾、美国及多个小众地区。第三方实测订阅包含 **59 个节点**，节点名均带 `BGP-IEPL`。

节点命名、入口拓扑和晚高峰速度可以作为优化线路的旁证，但无法从外部证明所有链路物理层都属于 IEPL。节点数量与供应商也可能调整。

## 晚高峰表现与持续监测

2026-07-11 21:34 的第三方测试使用珠海联通 9Gbps、32线程和 MiaoKo 面板。其汇总显示香港20个节点约56–93MB/s，日本约12–62MB/s，新加坡约14–45MB/s，美国约12–17MB/s，台湾约9–13MB/s。

但 GateRank 的不同方法监测到 2026-08-10 时，中位延迟为165.52ms、下载0.69Mbps、代理请求失败率100%，而其7月初记录明显更好。自动监测与9Gbps批量测速不能直接比较，不过趋势提醒我们：服务状态可能变化，不能用7月的一张高速度截图概括长期体验。

完整证据限制见[飞猫云机场测速资料汇总](/speed-test/feimao-yun/)。

## 流媒体与 AI 解锁

商家宣传和部分第三方页面提到流媒体及 AI 解锁，但上述晚高峰评测明确说明尚未完成解锁测试；GateRank 也标记为未收录。因此 Netflix、Disney+、ChatGPT 等能力目前统一为 **待核验**。

## 优点、限制与适合人群

### 当前可观察的优点

- 有公开的多平台客户端入口，降低新手安装门槛。
- 有一份测试条件较完整的严格晚高峰原始截图。
- 7月单次样本中香港节点表现较强，地区选择较多。

### 主要限制

- 套餐表来自商家提供，尚未用登录后面板截图独立核验。
- 美国、台湾及部分节点在7月样本中明显弱于香港。
- 8月持续监测出现下载下降与高请求失败率，需要继续观察。
- 解锁、客服、退款和长期服务连续性资料不足。

适合愿意先月付、主要使用香港或亚洲节点并能自行复测的用户。需要美区大流量、强依赖解锁或不能接受性能波动的人，应谨慎评估并准备备用线路。

## 注册前检查清单

1. 登录后核对套餐名称、周期、流量、倍率、设备数与结算金额。
2. 不把年付折算价误认为可月付的价格。
3. 在自己的运营商下连续测试20:00–23:00，而不是只看9Gbps测试上限。
4. 核验所需流媒体和AI服务，不假设所有节点都能解锁。
5. 保留订单、套餐和服务条款截图，优先控制首次购买周期。

## 推广披露与更新说明

本页包含飞猫云推广注册链接，注册或购买可能为找机场带来佣金。第三方测速、商家价格表和自动监测均已分开标注，没有采用第三方星级评分。页面最后核验于 **2026 年 8 月 18 日**，人工编辑复核尚未完成，暂不提交搜索引擎收录。
