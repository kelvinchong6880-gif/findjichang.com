---
title: Firefly机场测速资料汇总：晚高峰与原始结果待补
description: 审核Firefly的IPLC、不限速、原生IP和解锁宣传，说明当前缺少测试环境、节点明细、上传、丢包与原始截图。
createdAt: 2026-08-18
updatedAt: 2026-08-18
draft: true
status: fact-checking
primaryIntent: 帮助用户识别Firefly官方线路宣传、第三方评测摘要与可复核测速之间的差别。
originalValue: 不因第三方标题写有深度实测就复制结论，而是逐项检查测试环境和原始证据是否公开。
editorialReview:
  checked: false
  notes: 等待人工复核；当前没有满足本站标准的Firefly原始测速资料。
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
brandSlug: firefly
reviewSlug: firefly
keywords: [Firefly测速, Firefly机场测速, Firefly速度, Firefly节点, Firefly晚高峰]
sources:
  - label: Firefly登录后官方套餐页
    publisher: Firefly
    url: https://fly.fireflytttt.xyz/
    sourceType: official
    collectedAt: 2026-08-18
    supports: [记录套餐页的IPLC、不限速和不限设备数宣传]
    mayBeOutdated: true
    notes: 销售页权益，不是测速结果；用户原图含邮箱，不公开展示。
  - label: 2026年机场资料汇总中的Firefly条目
    publisher: 二毛
    url: https://www.ermao.net/posts/vpn/
    sourceType: third-party-review
    collectedAt: 2026-08-18
    supports: [记录VLESS、原生IP及解锁权益的第三方推广描述]
    mayBeOutdated: true
    notes: 没有提供测试环境和原始测速，不能作为性能证明。
  - label: Firefly机场评测归档摘要
    publisher: 机场100
    url: https://www.jichang100.com/archives
    sourceType: third-party-review
    collectedAt: 2026-08-18
    supports: [记录页面自称进行晚高峰、丢包、吞吐和解锁测试]
    mayBeOutdated: true
    notes: 可访问摘要没有指标明细和原始证据，无法独立复核。
---

> **资料状态：暂未找到满足本站标准的Firefly原始测速。** 套餐页确认了IPLC与不限速宣传，但没有给出真实速度；第三方摘要声称做过测试，却没有公开足够的复核信息。

## 当前能确认什么

官方套餐页统一列出“不限速、不限设备数、IPLC专线网络”。第三方推广汇总和评测摘要进一步提到VLESS、原生IP、ChatGPT、流媒体解锁，以及晚高峰测试。

这些内容没有对应的有效订阅截图、节点清单、测速环境和原始结果。当前可以确认的是“页面存在这些宣传”，不能确认每个节点的延迟、速度、丢包或解锁成功率。

## 第三方实测摘要的证据缺口

第三方归档页使用“深度实测”描述，并称测试了港台日美、丢包、吞吐与解锁。可访问摘要没有展示具体测试日期、测试地点、运营商、基础带宽、设备、客户端、线程数、节点数量、单节点结果或未修改截图。

缺少这些字段时，无法判断它测试的是白天还是晚高峰、单个节点还是全部节点，也无法复算丢包率。因此本站不引用其速度数字，不生成稳定性评分。

## IPLC和不限速怎样验证

IPLC不能只靠节点名称确认，需要结合入口与出口信息、路由或服务商线路材料，并观察公网异常时的表现。“不限速”也不意味着无限共享带宽，节点负载和上游容量仍会影响实际吞吐。

合格验证需要同一订阅在白天和20:00–23:00测试，覆盖多个常用地区并保留失败节点，再在不同日期重复。当前尚无这类资料。

## 关键项目完整度

| 必填项目 | 当前状态 |
| --- | --- |
| 有效订阅 | 暂未找到可靠证明 |
| 节点列表 | 暂未找到可靠资料 |
| 白天与晚高峰测试 | 第三方声称测试，原始资料未公开 |
| 延迟 | 暂未找到可复核数据 |
| 下载速度 | 暂未找到可复核数据 |
| 上传速度 | 暂未找到可靠资料 |
| 丢包率 | 第三方声称测试，指标与原图未公开 |
| 流媒体或AI解锁 | 第三方宣传，缺少逐节点原图 |
| 测试设备、网络和客户端 | 均未标注 |
| 未修改的原始截图 | 暂未找到 |

## 后续需要怎样的测试

合格补充资料应包含有效订阅、完整节点列表、日期、地区、运营商、基础带宽、设备、系统、客户端和版本、线程数，以及白天与晚高峰的延迟、下载、上传、丢包和逐节点解锁原图。

在这些资料到位前，Firefly的实际速度、IPLC覆盖、晚高峰、稳定性、原生IP和解锁能力全部维持 **待核验**。套餐和购买风险见[Firefly机场测评](/jichang/firefly/)。

## 来源与利益披露

本站测评页包含Firefly推广链接，但没有采用无法复核的第三方结论。未来取得原始测试时会保留环境、失败节点和异常值，不只展示最快结果。
