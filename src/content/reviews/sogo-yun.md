---
title: Sogo云机场测评：9种套餐、客户端与测速证据
description: 根据登录后官方面板截图核验 Sogo云九种套餐、价格、流量、节点与页面所列权益，并分析第三方测速证据和购买风险。
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
    supports: [确认公开客户端为 2.2.3, 确认提供 Windows、macOS、Android 与 iOS 入口, 用户提供的登录后面板截图确认九种套餐及页面所列权益]
    mayBeOutdated: true
    notes: 套餐证据来自用户于 2026-08-18 提供的登录后官方面板截图；原图含登录邮箱，不公开展示。面板卡片与详情存在少量数字不一致，正文已保留说明。
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

> **当前结论：九种套餐已由登录后官方面板截图核验，长期稳定性仍待核验。** 截图能够确认采集时的套餐卡片与页面所列权益，但付款金额、线路真实性、晚高峰表现和解锁能力仍需独立验证。

## Sogo云是什么

公开配置把服务描述为 **Sogo Cloud**，并将官网指向 `sogoyun.cc`。公开面板提供 Android、Windows、macOS 与 iOS 客户端入口；页面脚本显示桌面和 Android 客户端版本为 **2.2.3**，iOS 入口指向 Nextin。

官方公开描述涉及网络访问与游戏加速，但没有在无需登录的页面提供运营团队、成立时间、服务等级协议或可核验的长期可用率。

## 登录后官方面板的九种套餐

用户于 **2026 年 8 月 18 日** 提供了登录后的 Sogo云官方面板截图。原图含登录邮箱，出于隐私保护不直接公开。以下以套餐卡片上的价格和流量为主：

| 套餐 | 面板所列流量 | 面板所列价格 | 周期 |
| --- | ---: | ---: | --- |
| 小包·年付版 | 60GB/月 | 98元/年 | 年付，每30天重置 |
| 基础版 | 150GB/月 | 25元/月 | 月、季、半年、年付 |
| 优选版 | 350GB/月 | 45元/月 | 月、季、半年、年付 |
| 强化版 | 550GB/月 | 80元/月 | 月、季、半年、年付 |
| 顶配版 | 卡片1.1TB；详情1050G/月 | 150元/月 | 月、季、半年、年付 |
| SOGO基础餐不限时版 | 120GB | 120元/一次性 | 不自动重置 |
| SOGO优选餐不限时版 | 250GB | 220元/一次性 | 不自动重置 |
| SOGO强化餐不限时版 | 500GB | 450元/一次性 | 不自动重置 |
| SOGO至尊餐不限时版 | 1.0TB | 850元/一次性 | 不自动重置 |

周期套餐页面写有年付8折、两年付7折、三年付6折。不限时套餐说明流量用完为止，可付费手动重置；但详情区域多处残留“售价100元”“重置费90元”的相同模板文字，与250GB、500GB、1TB套餐卡片价格明显不一致。因此表格采用卡片醒目标价，付款前仍须以结算页为准。

这些截图也解释了旧第三方资料为何互相冲突：当前卡片已显示150GB/25元、350GB/45元、550GB/80元及1.1TB/150元。旧页面只能作为历史记录，不再作为当前套餐依据。

## 客户端和使用方式

官方公开脚本能够确认多平台下载入口。第三方页面称 Sogo云同时提供自研客户端与通用订阅，但另一份资料对通用订阅支持情况说法相反，因此“能否导入 Clash 等第三方客户端”仍需在账户面板内核验。

下载第三方 APK 或压缩包前，应确认来源域名和文件签名。本站只记录入口存在，不对安装包安全性作保证。

## 线路、节点与解锁能力

登录后面板对所有套餐描述了全 IPLC 专线、全节点1倍、晚高峰不限速、单节点峰值最高2.5Gbps、设备不限，并称支持 Netflix、Disney+、ChatGPT 与 TikTok。面板还列出香港20、台湾5、日本10、新加坡10、美国10、马来西亚2等节点，以及英国、法国、德国、土耳其、泰国、巴西等地区。

以上可确认为**官方面板的服务描述**，但不是找机场的独立验证结果。节点数量可能变化，“最高2.5Gbps”也不等于每位用户都能达到该速度。

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

- 结算页金额是否与套餐卡片一致，特别是不限时套餐详情中的模板数字。
- 是否支持你需要的通用订阅或第三方客户端。
- 退款、试用、工单渠道和设备限制；官方公开配置暂未给出服务条款链接。
- 自己所在地和运营商在 20:00–23:00 的表现。

## 推广链接与资料说明

本页包含 Sogo云推广注册链接，你通过该链接注册或购买，找机场可能获得佣金。套餐来自用户提供的登录后官方面板截图；因原图含个人邮箱，没有公开展示。本文没有采用第三方星级评分，也没有把官方线路宣传或第三方测速改写成独立实测结论。页面最后核验于 **2026 年 8 月 18 日**，人工编辑复核尚未完成，暂不提交搜索引擎收录。
