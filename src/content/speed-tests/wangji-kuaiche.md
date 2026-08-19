---
title: 网际快车测速资料汇总：五节点晚高峰数据待原图核验
description: 汇总网际快车2026年8月2日五个节点的第三方晚高峰数据，比较延迟、平均与最高速度、流媒体解锁，并说明环境缺失和套餐冲突。
createdAt: 2026-08-19
updatedAt: 2026-08-19
draft: true
status: fact-checking
primaryIntent: 帮助用户了解网际快车公开测速数字、节点差异、套餐版本冲突和当前证据边界。
originalValue: 将看似完整的五节点表与缺失的测试环境、原始截图和上传丢包并列呈现，不把80.5MB/s峰值或“全节点解锁”宣传当成长期事实。
editorialReview:
  checked: false
  notes: 等待人工复核；第三方页面提供日期、五节点名称、延迟、平均和最高速度，但缺少具体时段、地点、运营商、基础带宽、设备、客户端、套餐、上传、丢包及原始证据。
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
brandSlug: wangji-kuaiche
reviewSlug: wangji-kuaiche
keywords: [网际快车测速, 网际快车机场测速, 网际快车晚高峰, 网际快车节点, 网际快车套餐]
sources:
  - label: 网际快车登录后商店截图
    publisher: 网际快车
    url: https://j1.wj-kc.com/#/shop
    sourceType: official
    collectedAt: 2026-08-19
    supports: [当前六个永久流量包、三个日享套餐、价格、流量、时长、重置规则与设备说明]
    mayBeOutdated: true
    notes: 用户从登录后商店提供；套餐页的4K秒开属于官方宣传，不是独立测速证明。
  - label: 网际快车机场深度评测
    publisher: 机场top
    url: https://jichangtop.net/blog/wangjikuai-review/
    sourceType: third-party-test
    collectedAt: 2026-08-19
    supports: [2026年8月2日晚高峰五节点延迟、平均与最高速度及解锁表]
    mayBeOutdated: true
    notes: 页面含推广内容，未公开地点、运营商、基础带宽、设备、客户端、套餐、上传、丢包、测试次数和原始截图。
  - label: 网际快车官网入口与评测
    publisher: 二毛翻墙机场严选
    url: https://ermao.org/blog/%E7%BD%91%E9%99%85%E5%BF%AB%E8%BD%A6/
    sourceType: third-party-review
    collectedAt: 2026-08-19
    supports: [快车.com分站入口、不限时与周期套餐模式、住宅IP和不限设备宣传]
    mayBeOutdated: true
  - label: sing-box客户端与网际快车购买教程
    publisher: sing-box.info
    url: https://sing-box.info/zh/
    sourceType: third-party-review
    collectedAt: 2026-08-19
    supports: [网际快车购买与订阅导入流程、100GB套餐历史价格和节点数量截图描述]
    mayBeOutdated: true
    notes: 教程页具有导购属性，节点数量与价格可能变化。
  - label: 网际快车机场评测
    publisher: 魔法机场推荐导航站
    url: https://mofajc.com/wjkc-review/
    sourceType: third-party-review
    collectedAt: 2026-08-19
    supports: [另一版本套餐表、地区和线路宣传]
    mayBeOutdated: true
---

> **资料状态：找到一张文字形式的五节点晚高峰表，但没有原始测速截图和完整环境。** 本页是第三方资料汇总，不是找机场实测，也不根据这一次结果生成评分。

## 样本来源和证据限制

机场top页面称在 **2026年8月2日晚高峰** 从网际快车后台测速面板提取五个节点数据，包括TLS RTT、HTTPS延迟、平均速度和最高速度；另列香港、日本、新加坡、美国四个节点的流媒体与AI解锁状态。

页面没有说明具体测试时间、测试地点、运营商、本地带宽、设备、客户端、购买套餐、测速工具、线程数和测试次数，也没有给出原始截图或结果链接。所谓“后台测速面板”究竟由服务商还是独立测试者运行也不清楚，因此本站将数字标记为 **第三方文字记录，待原图核验**。

## 五节点晚高峰记录

| 节点 | TLS RTT | HTTPS延迟 | 平均速度 | 最高速度 |
| --- | ---: | ---: | ---: | ---: |
| HK-BGP-01 | 35ms | 58ms | 65.2MB/s | 80.5MB/s |
| HK-BGP-02 | 38ms | 61ms | 63.8MB/s | 78.1MB/s |
| JP-Enterprise-01 | 85ms | 110ms | 45.4MB/s | 60.1MB/s |
| SG-Enterprise-02 | 75ms | 95ms | 50.3MB/s | 65.0MB/s |
| US-Premium-01 | 165ms | 185ms | 25.7MB/s | 35.2MB/s |

按表面数字，两个香港节点延迟最低且速度最高，美国节点延迟最高、速度最低，符合距离差异的常见方向。但由于没有测试者位置和本地带宽，不能判断延迟是否合理，也无法确认80.5MB/s峰值是否受到测速服务器或多线程影响。

这里的单位是MB/s而不是Mbps；例如80.5MB/s理论上约等于644Mbps。本文保留来源单位，不把它改写成“网际快车保证644Mbps”。平均速度的统计区间和样本数也未公开。

## 解锁表与“全节点”说法不一致

同一来源列出四个节点的解锁结果：

| 节点 | Netflix | Disney+ | YouTube | ChatGPT | Abema |
| --- | --- | --- | --- | --- | --- |
| HK-BGP-01 | 解锁 | 解锁 | 解锁 | 解锁 | 失败 |
| JP-Enterprise-01 | 解锁 | 解锁 | 解锁 | 解锁 | 解锁 |
| SG-Enterprise-02 | 解锁 | 解锁 | 解锁 | 解锁 | 失败 |
| US-Premium-01 | 解锁 | 解锁 | 解锁 | 解锁 | 失败 |

这张表本身已显示三个节点的Abema失败，因此不能概括为“所有平台全节点解锁”。即使Netflix、Disney+、YouTube和ChatGPT在四个样本中均显示成功，也只代表来源记录当时的出口IP，解锁状态可能随IP和平台策略变化。

页面没有提供解锁检测原图、账号区域和测试方法，本站不把这些标签提升为官方保证或长期结论。

## 登录后商店的当前套餐

用户于2026年8月19日提供网际快车登录后商店截图，确认当前有六个永久流量包和三个日享套餐。

### 永久流量包

| 套餐 | 一次性价格 | 总流量 |
| --- | ---: | ---: |
| 试用套餐—不限时间 | ¥6.80 | 20GB |
| 标准套餐—不限时间 | ¥24.00 | 100GB |
| 优选套餐—不限时间 | ¥44.00 | 200GB |
| 高级套餐—不限时间 | ¥78.00 | 380GB |
| 大神套餐—不限时间 | ¥198.00 | 1000GB |
| 至尊套餐—不限时间 | ¥368.00 | 1980GB |

商店明确写明这是一次购买、流量用完为止且不过期，**不是无限流量**。六档均标注不限设备数量和“4K视频秒开”；后者是商家销售说明，不能替代上文第三方测速，也不能保证所有地区和晚高峰表现。

### 日享套餐

| 套餐 | 当前价格 | 使用时长 | 每日额度 | 页面折算总流量 |
| --- | ---: | ---: | ---: | ---: |
| 包月套餐 | ¥28.00 | 30天 | 60GB/天 | 1800GB |
| 包季套餐 | ¥68.00 | 90天 | 60GB/天 | 5400GB |
| 包年套餐 | ¥198.00 | 365天 | 60GB/天 | 21900GB |

日享套餐写明每天独立60GB额度，到期前每日可用，额度每天重置，未使用部分不会累积。三档也标注不限设备数量和“4K视频秒开”，同样只作为官方权益说明。

这组当前后台数据解决了此前第三方页面的价格冲突：16元/100GB、29元/200GB、49元/380GB以及24元月付等属于旧资料或其他版本，不再列为当前价格。价格仍可能变化，付款前应在结算页复核。

## 关键项目完整度

| 必填项目 | 当前状态 |
| --- | --- |
| 有效订阅 | 暂未找到可靠资料 |
| 节点列表 | 有5个测速节点名称，第三方教程称39或54个，完整列表待核验 |
| 白天与晚高峰 | 仅一组标记为晚高峰，具体时间缺失 |
| 延迟 | 有TLS RTT和HTTPS延迟文字表 |
| 下载速度 | 有平均与最高速度文字表 |
| 上传速度 | 暂未找到可靠资料 |
| 丢包率 | 暂未找到可靠资料，不能采用“零丢包”宣传 |
| 流媒体或AI解锁 | 有四节点文字表，无原图 |
| 测试设备、网络和客户端 | 均未公开 |
| 未修改的原始截图 | 暂未找到可靠资料 |

## 当前结论与后续验证

现有文字记录显示五个被测节点之间存在清晰的地区差异，香港表面结果最高、美国最低；解锁表也保留了Abema失败，而非全绿。但缺少完整测试环境和原始证据，数字尚不能用于跨品牌排名或购买保证。

后续需要补充登录后套餐页、有效订阅、完整节点列表、原始测速面板、本地网络与设备、客户端、测试线程、上传、丢包、同日白天对照以及连续多日复测。达到至少7个不同日期和28条样本前，不生成综合评分或“找机场实测”标签。

## 来源与利益披露

本站网际快车品牌页包含推广链接，但本页没有采用“4K秒开、零丢包、全节点解锁”等宣传作为事实，并公开说明测速环境缺失、Abema失败和套餐价格冲突。第三方数据可能已经变化。
