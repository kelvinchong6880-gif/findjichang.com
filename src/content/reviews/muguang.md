---
title: 暮光机场测评：套餐、客户端与晚间样本限制
description: 汇总暮光加速公开配置、服务商投稿套餐和2026年7月晚间60节点测速，说明品牌命名差异、价格证据等级与购买前风险。
createdAt: 2026-08-18
updatedAt: 2026-08-18
draft: true
status: fact-checking
primaryIntent: 帮助搜索暮光机场的用户区分官方公开信息、服务商提供套餐与缺少完整环境的晚间测速样本。
originalValue: 将入口页命名差异、套餐证据等级和测速缺失项放在结论中，避免把服务商投稿写成独立实测。
editorialReview:
  checked: false
  notes: 等待人工复核；套餐仍需登录后官方面板截图确认。
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
brandSlug: muguang
speedTestSlug: muguang
keywords: [暮光机场, 暮光加速, 幕光加速, 暮光机场测评, 暮光机场价格, 暮光测速]
sources:
  - label: 暮光加速公开配置接口
    publisher: 暮光加速
    url: https://asfawsf.twilightttt.sbs/api/v1/guest/comm/config
    sourceType: official
    collectedAt: 2026-08-18
    supports: [确认公开描述、官网指向与客户端入口]
    mayBeOutdated: true
  - label: 暮光加速公开面板
    publisher: 暮光加速
    url: https://asfawsf.twilightttt.sbs/
    sourceType: official
    collectedAt: 2026-08-18
    supports: [确认入口页标题与多平台客户端版本]
    mayBeOutdated: true
  - label: 2026暮光加速机场推荐
    publisher: 二猫子
    url: https://www.ermao.net/blog/twilight-airport/
    sourceType: third-party-test
    publishedAt: 2026-07-23
    collectedAt: 2026-08-18
    supports: [提供服务商投稿套餐、节点说明与2026-07-20晚间测速图]
    mayBeOutdated: true
    notes: 页面明确为机场服务商提供资料且含推广链接，不等同于发布者或本站独立购买实测。
---

> **当前结论：已有公开客户端和一份晚间测速样本，但套餐尚未由登录后官方面板核验。** 价格、线路和解锁能力主要来自服务商投稿资料；首次购买应优先短周期，并在结算页重新确认。

## 暮光机场是什么

公开配置接口的描述为“这里是暮光加速”，官网指向 `muguangjs.com`；但当前入口网页标题显示“幕光加速”。本站沿用用户确认的品牌名“暮光”，同时保留这一命名差异，避免把两个写法误判为不同服务。

公开脚本提供 Windows、macOS、Android 和 iOS 客户端入口，桌面及 Android 版本显示为 **3.0.0**，iOS 指向 Nextin。客户端入口存在不代表安装包已经过本站安全审计，下载前仍应核对域名和文件来源。

## 服务商投稿资料中的套餐

以下价格来自2026年7月发布的服务商投稿资料，不是本站登录后读取的官方订单页。该信息可能已经变化，最终价格、折扣、流量重置和退款条件以购买页为准。

| 套餐 | 流量 | 投稿资料所列价格 |
| --- | ---: | ---: |
| 基础版 | 120GB/月 | 20元/月 |
| 标准版 | 300GB/月 | 40元/月 |
| 旗舰版 | 700GB/月 | 100元/月 |
| 至尊版 | 1.5TB/月 | 180元/月 |
| 年付轻量版 | 70GB/年 | 109元/年 |

投稿资料还列出150GB/219元、400GB/529元、800GB/959元三种一次性不限时流量包，以及600元/月起的定制节点。所谓“基础版16元”来自8折活动表述，缺少可核验的活动条件或优惠码，因此本站不把16元写成常规起价。

年付轻量版的70GB是全年总量，不是每月70GB；不限时套餐通常不自动重置。长期套餐和一次性流量包都会增加服务中断时的剩余价值风险，新用户不宜只按折算月价判断。

## 线路、节点与使用方式

服务商投稿称使用 VLESS 和通用订阅，并列出香港20、台湾10、日本10、新加坡10、美国10等节点。官方公开配置没有提供可独立验证的物理线路、带宽或服务等级协议，因此“专线”、节点数量和最高速率仍需用购买后的订阅验证。

投稿还宣称支持 Netflix、Disney+、ChatGPT 和 TikTok。当前没有逐节点、带日期的解锁原图，统一标记为 **待核验**；解锁能力也可能随节点IP变化。

## 晚间测速能说明什么

服务商提供的一张测速图标注时间为 **2026-07-20 20:54:55 CST**，共60个VLESS节点，成功数60/60。图中不同节点平均下载约9.85–83.33MB/s，最高约36.58–125.17MB/s，但美国01节点的平均和最高速度均为0。

这份样本缺少测试地点、运营商、设备、客户端、基础带宽和重复次数，也没有上传与丢包数据。它只能说明该测试路径在当时能够连接多数节点，不能证明中国大陆不同运营商的长期晚高峰表现。详情见[暮光机场测速资料汇总](/speed-test/muguang/)。

## 适合谁与主要风险

暮光目前更适合愿意先短期试用、能自行检查VLESS兼容性，并会在自己的电信、联通或移动网络上复测的用户。只看公开资料，尚不足以支持年付或把它列为稳定性优先选择。

主要风险包括：品牌显示名不一致；套餐没有登录后截图核验；测速为服务商提供的单次样本；退款、客服响应和长期运营信息缺少可靠证据；流媒体与AI解锁未经逐节点验证。

## 注册前检查清单

1. 在结算页核对套餐、周期、流量、倍率和最终金额。
2. 确认所用客户端支持VLESS，并只从可信入口下载。
3. 先购买短周期，在20:00–23:00用自己的运营商复测。
4. 单独测试所需流媒体和AI服务，不把宣传当成全节点保证。
5. 保存订单、套餐与退款说明截图，避免一次投入过高。

## 推广披露与更新说明

本页含暮光推广注册链接，注册或购买可能为找机场带来佣金。套餐和测速资料均按来源属性标注，没有改写为“找机场实测”，也没有采用第三方星级评分。页面最后核验于 **2026年8月18日**，人工编辑复核未完成，暂不提交搜索引擎收录。
