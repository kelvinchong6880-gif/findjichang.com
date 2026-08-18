---
title: Sogo云机场测评：套餐差异、客户端与注册前核验
description: 核验 Sogo Cloud 官方公开配置、客户端与第三方套餐资料，说明价格差异、线路宣传、测速证据和购买前注意事项。
createdAt: 2026-08-18
updatedAt: 2026-08-18
draft: true
status: fact-checking
primaryIntent: 帮助查询 Sogo云的用户分清官方公开信息、相互冲突的第三方套餐资料与仍待核验的性能说法。
originalValue: 交叉比较多个日期的套餐与测速来源，指出变化和证据缺口，避免把推广页面结论直接当作事实。
editorialReview:
  checked: false
  notes: 首稿等待人工复核；获得登录后官方套餐截图后再更新价格结论。
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
speedTestSlug: sogo-yun
keywords: [Sogo云, Sogo云机场, Sogo云测评, Sogo Cloud, Sogo云价格, Sogo云测速]
sources:
  - label: Sogo Cloud 公开站点配置接口
    publisher: Sogo Cloud
    url: https://afasfw.sogotztz2.sbs/api/v1/guest/comm/config
    sourceType: official
    collectedAt: 2026-08-18
    supports: [确认公开描述、官网指向与品牌图片地址]
    mayBeOutdated: true
  - label: Sogo Cloud 公开用户面板
    publisher: Sogo Cloud
    url: https://afasfw.sogotztz2.sbs/
    sourceType: official
    collectedAt: 2026-08-18
    supports: [确认公开客户端为 2.2.3, 确认提供 Windows、macOS、Android 与 iOS 入口, 确认套餐接口要求登录]
    mayBeOutdated: true
  - label: 2026 Sogo云机场评测
    publisher: 二毛
    url: https://www.ermao.net/blog/sogoyun/
    sourceType: third-party-review
    publishedAt: 2026-04-14
    collectedAt: 2026-08-18
    supports: [提供 2026-04 的套餐说法, 提供两张带测试环境的第三方测速截图, 提供客户端与订阅方式说法]
    mayBeOutdated: true
    notes: 页面含推广入口；套餐与其他来源冲突，测速只视为单次第三方样本。
  - label: SOGO云机场使用体验
    publisher: 找梯子网
    url: https://zhaotizi.best/blog/SogoTest/
    sourceType: third-party-review
    publishedAt: 2026-06-10
    collectedAt: 2026-08-18
    supports: [提供 2026-06 的套餐说法, 提供客户端版本与使用体验说法]
    mayBeOutdated: true
    notes: 页面含推广入口，价格流量与其他来源存在差异。
---

> **当前结论：客户端信息可确认，套餐与长期稳定性仍需核验。** Sogo Cloud 的公开配置和客户端入口能够访问，但登录前无法读取官方套餐。多个第三方页面的价格和流量不一致，购买时必须以登录后面板及结算页为准。

## Sogo云是什么

公开配置把服务描述为 **Sogo Cloud**，并将官网指向 `sogoyun.cc`。公开面板提供 Android、Windows、macOS 与 iOS 客户端入口；页面脚本显示桌面和 Android 客户端版本为 **2.2.3**，iOS 入口指向 Nextin。

官方公开描述涉及网络访问与游戏加速，但没有在无需登录的页面提供运营团队、成立时间、服务等级协议或可核验的长期可用率。

## 套餐价格为什么暂不能定稿

官方套餐接口在未登录状态下返回“未登录或登陆已过期”。第三方资料在不同时点给出的数字明显不同：

| 套餐 | 2026-04 第三方记录 | 2026-06 第三方记录 | 当前判断 |
| --- | --- | --- | --- |
| 小包 | 活动档 20元/120GB（正文说法） | 15元/月；另有 98元/年、每月60G | 口径冲突，待核验 |
| 基础版 | 25元/月，120GB/月 | 25元/月，150GB/月 | 流量冲突，待核验 |
| 优选版 | 50元/月，250GB/月 | 45元/月，350GB/月 | 价格与流量均冲突 |
| 强化版 | 100元/月，500GB/月 | 未完整列出周期档 | 待核验 |
| 顶配版 | 200元/月，1000GB/月 | 未完整列出周期档 | 待核验 |
| 不限时套餐 | 100–800元，对应100–1000GB | 列出220元/250GB、450元/500GB | 可能已调整，待核验 |

这类差异可能来自活动、改价或页面过期，也可能是第三方录入错误。本站不会从中挑一个更好看的数字当作“当前价格”。如果你能提供与微风相同的登录后套餐截图，我们可以把这一节升级为已核验数据。

## 客户端和使用方式

官方公开脚本能够确认多平台下载入口。第三方页面称 Sogo云同时提供自研客户端与通用订阅，但另一份资料对通用订阅支持情况说法相反，因此“能否导入 Clash 等第三方客户端”仍需在账户面板内核验。

下载第三方 APK 或压缩包前，应确认来源域名和文件签名。本站只记录入口存在，不对安装包安全性作保证。

## 线路、节点与解锁能力

第三方页面常见的说法包括 VLESS、IEPL/IPLC、60多个节点、不限设备，以及 Netflix、YouTube、ChatGPT 等服务可用。公开官方配置没有给出可交叉验证的线路证明、节点总数或解锁清单，因此这些不能作为已确认事实。

现有测速截图可看到香港、台湾、日本、新加坡和美国等节点，但截图只说明测试订阅在当时返回这些节点，不代表节点长期存在。

## 速度与稳定性

目前找到两张 2026 年 4 月 13 日的第三方原始测速图，包含辽宁移动 1Gbps、喵速工具版本、线程数和测试时间。这比只有文字结论的资料更可复核，但仍缺少设备信息、上传速度、丢包率和晚高峰样本。

详情见[Sogo云机场测速资料汇总](/speed-test/sogo-yun/)。本站不会根据这一组下午样本给出综合速度分或“长期稳定”结论。

## 适合谁与主要风险

### 可以继续观察的人群

- 希望使用官方多平台客户端、减少手动配置的新手。
- 愿意先买短周期，并在自己的网络下连续测试的人。
- 把它作为候选或备用，而不是未经验证就作为唯一主线路的人。

### 注册前必须确认

- 登录后真实套餐、流量、周期、倍率与最终结算金额。
- 是否支持你需要的通用订阅或第三方客户端。
- 退款、试用、工单渠道和设备限制；官方公开配置暂未给出服务条款链接。
- 自己所在地和运营商在 20:00–23:00 的表现。

## 推广链接与资料说明

本页包含 Sogo云推广注册链接，你通过该链接注册或购买，找机场可能获得佣金。本文没有采用第三方星级评分，也没有把推广页面的价格、线路或解锁宣传改写成确定事实。页面最后核验于 **2026 年 8 月 18 日**，人工编辑复核尚未完成，暂不提交搜索引擎收录。
