---
title: XX云测速资料汇总：三天样本与一次服务异常
description: 汇总XX云在2026年7月13日至15日的第三方测速，比较四地区速度、延迟、ChatGPT与流媒体，并保留客户端无法测速的异常记录。
createdAt: 2026-08-19
updatedAt: 2026-08-19
draft: true
status: fact-checking
primaryIntent: 帮助用户了解XX云公开测速样本、专属客户端限制、跨日变化和服务异常风险。
originalValue: 把正常测速与页面打不开、ChatGPT卡住和流媒体失败放在同一时间线上，不用首日四节点结果代替长期稳定性。
editorialReview:
  checked: false
  notes: 等待人工复核；第三方测试公开1000Mbps环境和专属客户端，但缺少本地地区、运营商、设备、有效订阅截图与丢包率。
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
brandSlug: xx-yun
reviewSlug: xx-yun
keywords: [XX云测速, XXYUN测速, XX云机场测速, XX云晚高峰, XX云节点]
sources:
  - label: xxyun机场评测与原始记录
    publisher: Siilas
    url: https://siilas.com/airport/xxyun/
    sourceType: third-party-test
    collectedAt: 2026-08-19
    supports: [三天七条验证样本、四地区Speedtest记录、专属客户端、服务异常和套餐限速信息]
    mayBeOutdated: true
    notes: 公开1000Mbps测试环境与Speedtest外链，但未明确本地地区、运营商、设备和有效订阅截图。
  - label: 测试方法与评分规则
    publisher: Siilas
    url: https://siilas.com/methodology/
    sourceType: third-party-test
    collectedAt: 2026-08-19
    supports: [确认1000Mbps本地宽带、客户端范围、记录规则及正式评分门槛]
    mayBeOutdated: true
  - label: XXYUN晚高峰评测
    publisher: 一个机场科学上网
    url: https://ygjc.cc/vpn/xxyun
    sourceType: third-party-review
    collectedAt: 2026-08-19
    supports: [记录广东电信300Mbps、20时至21时及70至110Mbps宣传性测试描述]
    mayBeOutdated: true
    notes: 页面结论偏推广，未与Siilas样本混合计算。
---

> **资料状态：找到三天七条第三方验证样本，其中包含一次服务异常。** 数据来自实际用户的1000Mbps测试环境和XX云专属客户端，但仍不是找机场实测，样本量不足以生成长期评分。

## 测试来源与使用限制

Siilas称测试者为XX云实际用户，测试环境为1000Mbps本地宽带，使用XX云官方专属客户端。该服务不支持Clash或其他通用订阅，因此客户端本身的状态会直接影响测速与日常使用。

页面累计 **3个不同日期、7条验证样本**，其中5条有Speedtest结果，另有2条网络质量补充。它没有公开测试者所在地区、运营商、设备、有效订阅截图和丢包率，故本站将其标记为第三方资料。

## 7月13日四地区记录

| 地区 | 下载 | 上传 | ChatGPT | 流媒体 |
| --- | ---: | ---: | --- | --- |
| 新加坡 | 140.94Mbps | 49.91Mbps | 流畅 | 流畅 |
| 美国 | 143.26Mbps | 20.75Mbps | 流畅 | 流畅 |
| 日本 | 138.99Mbps | 51.87Mbps | 流畅 | 流畅 |
| 香港 | 125.18Mbps | 47.95Mbps | 不可用 | 流畅 |

这四次发生在19:15至19:27，接近晚高峰。下载集中在125至143Mbps，差异不大；香港ChatGPT不可用。它们只是四个被选中节点的单次结果，不是完整节点平均值。

## 7月14日补充记录

7月14日记录了两个节点的延迟和网络质量：新加坡78ms、下载468Mbps、上传49.5Mbps，ChatGPT和流媒体均流畅；美国179ms、下载525Mbps、上传46.3Mbps，ChatGPT响应较慢、流媒体轻微缓冲。

这组速度明显高于前一天，可能来自不同节点、测速服务器或当时负载。不能把525Mbps直接当作XX云美国节点长期速度，也不能将两天数字简单平均。

## 7月15日降速与服务异常

7月15日20:08，美国节点下载131.8Mbps、上传12Mbps，ChatGPT响应较慢、流媒体缓冲明显。相比前一天补充记录，下载和上传都明显下降。

同日20:31，测试者记录测速页面打不开、ChatGPT卡住、流媒体无法正常播放，因无法完成测试而没有填造速度或延迟。失败记录对稳定性判断非常重要：只摘录成功的Speedtest会高估实际体验。

## 与另一晚高峰页面的差异

另一第三方页面称在20:00至21:00、广东电信300Mbps环境下测试，下载约70至110Mbps，香港约25ms，日本和新加坡约50至70ms。该页面带有明显推广语气，环境和数字也与Siilas不同。

两组样本不应合并计算。它们能共同说明XX云在不同网络和方法下结果会变化，但不能证明“晚高峰不限速”或“全部流媒体解锁”。

## 专属客户端与套餐限速影响

Siilas记录显示XX云只能使用官方专属客户端。套餐页所列100GB月付和永久500GB档为300Mbps，300GB月付档为500Mbps，1000GB月付和永久2888GB档为800Mbps；节点快照显示1倍倍率。

测试结果必须结合所用套餐限速解读。目前公开记录没有明确说明购买的是哪一档，因此无法判断125至525Mbps究竟受套餐、节点还是本地线路限制。

## 关键项目完整度

| 必填项目 | 当前状态 |
| --- | --- |
| 有效订阅 | 测试者称为实际用户，缺少公开订阅截图 |
| 节点列表 | 有四地区样本，非完整节点清单 |
| 白天与晚高峰 | 主要记录在18:28至20:31，缺少标准白天对照 |
| 延迟 | 7月14日新加坡78ms、美国179ms |
| 下载速度 | 5条Speedtest及2条质量补充 |
| 上传速度 | 5条Speedtest及2条质量补充 |
| 丢包率 | 未采集 |
| 流媒体或AI解锁 | 有体验标签，并记录一次整体失败 |
| 测试设备、网络和客户端 | 1000Mbps与专属客户端已知，其余缺失 |
| 未修改的原始截图 | 有结果链接和补充截图，缺少完整环境截图 |

## 当前结论与后续验证

现有记录表明XX云首日四地区下载较集中，次日部分节点更高，但第三天出现美国降速及客户端服务异常。样本恰好说明为什么需要连续测试，而不能根据一次成功结果给出推荐。

后续应补充测试者地区与运营商、设备、套餐档位、完整节点表、同日白天与晚高峰、更多日期、失败持续时间以及恢复记录。达到至少7个不同日期和28条样本前，本站不标注“找机场实测”，不生成稳定率或综合评分。

## 来源与利益披露

本站XX云品牌页包含推广链接，但本页保留了客户端无法测试、ChatGPT卡住和流媒体失败，没有使用推广页面的“稳定”结论替代失败记录。第三方资料可能随客户端和线路更新而变化。
