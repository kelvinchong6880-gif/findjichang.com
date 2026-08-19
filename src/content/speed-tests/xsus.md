---
title: XSUS机场测速资料汇总：两次晚高峰样本与跨日波动
description: 汇总XSUS在2026年7月18日和8月12日的第三方Speedtest记录，对比香港、日本、新加坡和美国节点的下载、上传及解锁变化。
createdAt: 2026-08-19
updatedAt: 2026-08-19
draft: true
status: fact-checking
primaryIntent: 帮助用户了解XSUS两次公开晚高峰测速的地区差异、跨日波动和仍待补充的测试条件。
originalValue: 同时保留美国31.86Mbps、香港上传2.96Mbps及解锁记录矛盾，不用单日高速结果包装稳定性。
editorialReview:
  checked: false
  notes: 等待人工复核；第三方记录附Speedtest外链且公开1000Mbps测试宽带，但单条记录未明确本地地区、运营商、设备、具体客户端、订阅证明和丢包率。
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
brandSlug: xsus
reviewSlug: xsus
keywords: [XSUS测速, XSUS机场测速, XSUS速度, XSUS晚高峰, XSUS节点]
sources:
  - label: XSUS官方套餐页
    publisher: XSUS
    url: https://xsus.cloud/plan
    sourceType: official
    collectedAt: 2026-08-19
    supports: [用户提供的官方套餐截图确认十种套餐、价格、流量、IP限制与页面所列权益]
    mayBeOutdated: true
    notes: 原图不公开；线路与解锁权益是官方销售说明，不是测速证明。
  - label: 机场测速原始记录
    publisher: Siilas
    url: https://siilas.com/test/
    sourceType: third-party-test
    collectedAt: 2026-08-19
    supports: [2026年7月18日和8月12日XSUS四地区的下载、上传、ChatGPT及流媒体记录]
    mayBeOutdated: true
    notes: 记录附Speedtest外链；测试方法页称使用1000Mbps本地宽带和专属或Clash客户端，但单条记录未明确本地地区、运营商、设备和具体客户端。
  - label: 测试方法与评分规则
    publisher: Siilas
    url: https://siilas.com/methodology/
    sourceType: third-party-test
    collectedAt: 2026-08-19
    supports: [确认1000Mbps本地宽带、全天不定时、客户端范围、原始链接和评分门槛]
    mayBeOutdated: true
  - label: XSUS机场公告栏
    publisher: XSUS
    url: https://t.me/s/xsusgg/211
    sourceType: official
    collectedAt: 2026-08-19
    supports: [记录官方对入口调整、晚高峰反馈及日美韩新节点优先选择的说明]
    mayBeOutdated: true
    notes: 官方运营公告与自述，不是独立测速证明。
---

> **资料状态：已找到两次、四地区的第三方晚高峰Speedtest记录，但仍不是找机场实测。** 两次数据的地区排序和解锁状态变化明显，暂不足以生成长期稳定性评分。

## 样本来源与测试条件

Siilas测速中心公开了XSUS在 **2026年7月18日和8月12日** 的香港、日本、新加坡和美国节点记录，每条包含下载、上传、ChatGPT、流媒体状态及Speedtest外链。记录时间集中在19:53至21:38，均可视为晚高峰截面。

该站的方法页说明测试使用1000Mbps本地宽带，按机场支持情况选择专属客户端或Clash，并保留日期、时间和结果链接。但XSUS单条记录没有写明测试者地区、运营商、设备、具体客户端、有效订阅和丢包率。因此本站只将其作为第三方样本。

## 两次四地区速度记录

| 日期 | 地区 | 下载 | 上传 | ChatGPT | 流媒体 |
| --- | --- | ---: | ---: | --- | --- |
| 7月18日 | 新加坡 | 815.92Mbps | 43.48Mbps | 流畅 | 流畅 |
| 7月18日 | 香港 | 449.41Mbps | 19.77Mbps | 不可用 | 流畅 |
| 7月18日 | 日本 | 328.12Mbps | 11.70Mbps | 轻微延迟 | 轻微缓冲 |
| 7月18日 | 美国 | 31.86Mbps | 3.27Mbps | 响应较慢 | 缓冲严重 |
| 8月12日 | 日本 | 537.72Mbps | 7.52Mbps | 流畅 | 轻微缓冲 |
| 8月12日 | 新加坡 | 433.03Mbps | 24.51Mbps | 轻微延迟 | 轻微缓冲 |
| 8月12日 | 美国 | 273.35Mbps | 10.59Mbps | 轻微延迟 | 流畅 |
| 8月12日 | 香港 | 109.64Mbps | 2.96Mbps | 流畅 | 流畅 |

这些是各地区被选中节点的单次结果，不是全部节点的平均值，也不能证明套餐内所有线路具有相同表现。

## 跨日波动说明了什么

7月18日新加坡下载815.92Mbps，是两组中的最高值；到8月12日降至433.03Mbps，但仍高于400Mbps。日本则从328.12升至537.72Mbps，不过上传从11.70降至7.52Mbps，说明下载变快不等于双向质量同步改善。

美国变化最大：下载从31.86升至273.35Mbps，上传从3.27升至10.59Mbps，流媒体从缓冲严重变为流畅。香港方向相反，下载从449.41降至109.64Mbps，上传从19.77降至2.96Mbps。这种变化不适合用一个峰值概括“晚高峰稳定”。

## 香港ChatGPT记录存在矛盾

7月18日香港记录为ChatGPT不可用，8月12日却写为流畅。与此同时，Siilas方法页称香港节点按当前实测统一标为ChatGPT不可用。这三处信息不一致，可能来自记录规则更新、不同出口IP或数据维护差异。

在资料站解释前，本站不把8月12日的“流畅”扩展为香港节点可解锁，也不把7月18日结果扩展为永久不可用。香港ChatGPT状态标记为 **第三方记录冲突，待重新核验**。

## 官方套餐与测试入口

用户于2026年8月19日提供XSUS官方套餐页截图。循环套餐包括12元/月168GB、24元/月336GB、30元/月420GB和70元/月1024GB；企业专线套餐为52元/季50GB/月、88元/季100GB/月。另有65元188GB、82元240GB、122元400GB和260元1024GB四种不限时总流量包。

所有套餐页面均写有最多5个IP；不限时包是固定总流量而非无限流量，并注明不可叠加、不可累计。官方页面的IEPL、低延迟、Netflix、Disney与AI解锁属于销售权益，不能用来填补上述第三方测速缺口。

如果用户要复测本文结果，12元月付档是成本最低的短期入口；企业专线与普通循环套餐应分开测试，不能把企业套餐结果代表基础套餐。

## 官方入口调整信息

XSUS公告栏曾表示广港晚间速度不足，随后将线路切换为深港，并邀请用户在晚高峰反馈；公告还建议优先使用日本、美国、韩国和新加坡节点。该信息能说明服务商曾调整入口并承认不同地区负载差异，但不能证明调整后的长期效果。

官方还新增0.8倍率日用节点，并说明部分日用节点不解锁Netflix等流媒体。购买或测试时应区分日用节点与带“NF”标识的节点，不能把某个解锁节点的结果代表全部订阅。

## 关键项目完整度

| 必填项目 | 当前状态 |
| --- | --- |
| 有效订阅 | 暂未找到公开证明 |
| 节点列表 | 仅记录四个地区节点，非完整列表 |
| 白天与晚高峰 | 两次均为晚高峰，缺少同日白天对照 |
| 延迟 | 当前两组主表未提供 |
| 下载速度 | 两次四地区Speedtest记录 |
| 上传速度 | 两次四地区Speedtest记录 |
| 丢包率 | 方法页不采集，当前缺失 |
| 流媒体或AI解锁 | 有体验标签，但香港ChatGPT记录冲突 |
| 测试设备、网络和客户端 | 1000Mbps宽带已公开，其余不完整 |
| 未修改的原始截图 | 有Speedtest结果外链，缺少完整环境截图 |

## 当前结论与后续验证

公开样本显示XSUS在被测节点上既出现过815.92Mbps下载，也出现过美国31.86Mbps和香港2.96Mbps上传。两次结果证明“节点与日期差异”比单个最快数字更重要，但样本天数仍不足。

后续应补充有效订阅、完整节点清单、本地地区和运营商、设备与具体客户端、同日白天对照、延迟抖动、丢包以及标准化解锁原图，并连续覆盖至少7个不同日期。完成前不标注“找机场实测”，不生成评分。

## 来源与利益披露

本站XSUS品牌页包含推广链接，但本页保留了美国低速、香港上传低值和解锁矛盾，没有采用官方“晚高峰稳定”的结论替代数据。第三方记录可能随入口、节点和时间变化。
