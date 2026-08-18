---
title: 飞猫云机场测速资料汇总：59节点晚高峰与30天趋势
description: 整理飞猫云2026年7月珠海联通9Gbps晚高峰原始测速，以及截至8月的持续监测变化，说明节点差异、缺失指标和适用范围。
createdAt: 2026-08-18
updatedAt: 2026-08-18
draft: true
status: fact-checking
primaryIntent: 帮助用户理解飞猫云单次晚高峰批量测速与持续自动监测的不同结论和限制。
originalValue: 对照两种测试方法与日期，保留异常节点和后续性能下降，不用单次峰值生成排名。
editorialReview:
  checked: false
  notes: 等待人工复核；仍缺少上传、丢包和多运营商同方法复测。
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
reviewSlug: feimao-yun
keywords: [飞猫云测速, 飞猫云晚高峰, FlyCat测速, 飞猫云速度, 飞猫云节点]
sources:
  - label: 飞猫云59节点晚高峰原始测速
    publisher: 机场中文网
    url: https://jichangcnweb.com/reviews/feimaoyun/
    sourceType: third-party-test
    publishedAt: 2026-07-02
    collectedAt: 2026-08-18
    supports: [提供原始测速长图, 提供日期、网络、线程数、节点数与分地区结果]
    mayBeOutdated: true
    notes: 发布者称使用自有订阅亲测；页面含推广链接，缺少上传与丢包数据。
  - label: 飞猫云30天自动监测
    publisher: GateRank
    url: https://gate-rank.com/airports/flycat-flycatvipaff
    sourceType: third-party-test
    collectedAt: 2026-08-18
    supports: [提供截至2026-08-10的可用率、延迟、下载和请求失败率趋势]
    mayBeOutdated: true
    notes: 自动探针方法不同于用户客户端批量测速，只用于趋势观察。
testContext:
  device: 官方未公开
  network: 珠海联通 9Gbps（来源页标注）
  client: MiaoKo 测试面板，32线程
  period: 2026-07-11 21:34，严格晚高峰
  originalScreenshot: https://jichangcnweb.com/_astro/speedtest-evening-peak-2026-07-11.C2-xiAGd_M4rrc.webp
  screenshotEdited: false
---

> **资料状态：有严格晚高峰原图，也有后续持续监测，但方法不同。** 下列数据不是找机场自行实测。单次9Gbps批量测速适合观察节点上限，自动探针适合观察趋势，两者不能直接排列高低。

## 晚高峰测试环境

原始长图的测试时间为 **2026-07-11 21:34**，网络为 **珠海联通9Gbps**，使用 **MiaoKo面板、32线程**，对59个节点进行全量测试。9Gbps远高于普通家庭宽带，因此结果更接近节点带宽上限，不代表普通用户可以获得相同数字。

## 分地区结果

| 地区 | 节点数量 | TLS RTT | 平均下载速度 | 观察 |
| --- | ---: | ---: | ---: | --- |
| 香港 | 20 | 123–359ms | 56–93MB/s | 样本中最强，但部分HTTPS延迟偏高 |
| 日本 | 10 | 154–209ms | 12–62MB/s | 节点间差异明显 |
| 新加坡 | 8 | 146–197ms | 14–45MB/s | 个别节点异常 |
| 美国 | 10 | 247–273ms | 12–17MB/s | 晚高峰明显弱于香港 |
| 台湾 | 2 | 126–175ms | 9–13MB/s | 数量少、速度偏低 |
| 其他地区 | 若干 | 暂未完整汇总 | 6–46MB/s | 质量参差 |

原图保留了日本10、土耳其01无数据和新加坡08异常等情况。本站不删除异常值，也不把香港最高结果当作全体节点速度。

## 30天监测为什么给出不同信号

另一来源截至 **2026-08-10** 的自动监测记录为：30天可用率100%、中位延迟165.52ms、下载0.69Mbps、代理请求失败率100%。其趋势还显示7月初下载曾为78.22Mbps，随后明显下降。

这不一定与7月11日的9Gbps批量测速矛盾，因为测试目标、探针位置、并发、协议和成功判定可能完全不同。但它说明至少在该自动监测路径上，8月出现了严重请求或性能问题，需要后续同方法复测，而不能只引用7月的高速度。

## 仍然缺失的关键数据

| 必填项目 | 当前状态 |
| --- | --- |
| 有效订阅 | 来源称订阅到期至2028-11-17，但本站未验证订单 |
| 白天与晚高峰 | 有严格晚高峰；缺少同环境白天对照 |
| 延迟与下载 | 有原图及分地区汇总 |
| 上传速度 | 暂未找到可靠资料 |
| 丢包率 | 暂未找到可靠资料 |
| 流媒体与AI解锁 | 来源明确尚未测试；另一来源也未收录 |
| 设备与操作系统 | 未标注 |
| 多运营商复测 | 缺少电信、移动及其他地区同方法样本 |

## 当前能得出的结论

2026年7月11日的珠海联通样本说明，飞猫云当时的香港节点在严格晚高峰具有较高下载上限，美国、台湾和部分小众节点较弱。到8月的不同自动监测路径出现明显恶化信号，因此长期稳定性仍为 **待核验**。

核心指标卡继续保持“待核验”，因为本站尚无统一方法下的多日、多运营商、上传和丢包数据。套餐与购买风险见[飞猫云机场测评](/jichang/feimao-yun/)。

## 来源与利益披露

原始测速图由第三方发布，图片版权归原发布者；本站只链接原图并进行证据限制分析。来源页面及本站测评可能包含推广链接，这不会把第三方结果改写成“找机场实测”。
