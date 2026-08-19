---
title: 大哥云测速资料汇总：一组北京电信晚高峰样本
description: 汇总大哥云在2026年7月8日北京电信100Mbps环境下的一组第三方晚高峰记录，并核对套餐页面差异、Netflix加载与证据缺口。
createdAt: 2026-08-19
updatedAt: 2026-08-19
draft: true
status: fact-checking
primaryIntent: 帮助用户了解大哥云现有公开晚高峰样本、套餐资料冲突和仍需补测的关键项目。
originalValue: 不把单次8.9Mbps视频速率、6.2MB/s文件下载或来源自报的97.1%稳定性扩展为长期结论，并将互相冲突的套餐页面分开说明。
editorialReview:
  checked: false
  notes: 等待人工复核；第三方测试公开日期、时段、地点、运营商、基础带宽和客户端，但缺少节点名称、套餐、设备、原始测速链接、上传、丢包及稳定性计算方法。
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
brandSlug: dage-yun
reviewSlug: dage-yun
keywords: [大哥云测速, 大哥云机场测速, 大哥云晚高峰, 大哥云速度, 大哥云套餐]
sources:
  - label: 大哥云登录后套餐页面截图
    publisher: 大哥云
    url: https://a03.dgy02.com/
    sourceType: official
    collectedAt: 2026-08-19
    supports: [当前五种套餐、价格、流量、时长、带宽、Trojan协议、地区限制、重置与退款规则]
    mayBeOutdated: true
    notes: 用户通过推广入口登录后提供；截图包含个人邮箱，原图不公开，购买前仍应在结算页复核。
  - label: 2026年机场晚高峰速度实测
    publisher: 勇哥博客
    url: https://yongjichang.com/blog-airport-speed-2026
    sourceType: third-party-test
    collectedAt: 2026-08-19
    supports: [2026年7月8日北京电信100Mbps环境、Windows Clash、测试时段及大哥云单组结果]
    mayBeOutdated: true
    notes: 未提供节点名称、套餐、设备、上传、丢包、原始测速链接或稳定性计算方法；页面含推荐与推广内容。
  - label: 大哥云套餐与使用说明页面
    publisher: 大哥云商业落地页
    url: https://cn.cns-dageyun.com/
    sourceType: third-party-review
    collectedAt: 2026-08-19
    supports: [Trojan协议、套餐价格、流量、带宽、重置规则及退款限制的页面表述]
    mayBeOutdated: true
    notes: 搜索到的商业落地页，并非通过用户登录后台核验；不得视为当前官方成交信息。
  - label: 大哥云机场资料页
    publisher: 机场推荐｜机场列表
    url: https://jichangliebiao.com/jichang/dageyun
    sourceType: third-party-review
    collectedAt: 2026-08-19
    supports: [另一第三方套餐表及客户端、协议和解锁宣传]
    mayBeOutdated: true
  - label: 大哥云机场资料与套餐
    publisher: 节点哥哥
    url: https://nodegege.com/node/dageyun/
    sourceType: third-party-review
    collectedAt: 2026-08-19
    supports: [第三方套餐表、Trojan协议、地区与客户端宣传]
    mayBeOutdated: true
---

> **资料状态：仅找到一组可读的第三方晚高峰样本，尚不足以评价长期稳定性。** 测试页面公开了日期、地点、运营商、宽带和客户端，但没有原始测速链接，也未解释“97.1%稳定性”的采样周期和算法。

## 测试来源与环境

勇哥博客称其在 **2026年7月8日18:00至23:00** 测试多家服务，地点为北京，网络是电信100Mbps宽带，客户端为Windows Clash，并统一选择各服务的“快速节点”。项目包括YouTube 1080P、Netflix 4K、文件下载和延迟。

这些条件比只给一张速度数字更完整，但仍缺少大哥云的节点地区和名称、购买套餐、设备型号、测速服务器、原始结果链接、上传与丢包。页面也没有说明各指标测试了几次，因此本站只把它作为单日截面，不称为“找机场实测”。

## 公开晚高峰结果

| 项目 | 来源记录 | 本站解读 |
| --- | ---: | --- |
| YouTube 1080P速率 | 8.9Mbps | 来源称可播放，但可能需等待缓冲 |
| Netflix 4K | 加载约30秒 | 不能写成“秒解”或全节点流畅 |
| 文件下载 | 6.2MB/s | 约合49.6Mbps，仅为单次文件下载表现 |
| 延迟 | 95ms | 节点地区和测试目标未公开 |
| 稳定性 | 来源标注97.1% | 采样周期、次数和计算方式未公开，不纳入本站评分 |

6.2MB/s文件下载约等于49.6Mbps，接近测试宽带标称上限的一半，但不能与YouTube显示的8.9Mbps直接比较：两者使用的目标服务器、协议和内容分发路径可能不同。

来源随后判断大哥云在该次晚高峰表现下降，并推测可能与基础设施、负载或客户端限速有关。这些只是作者推测，页面没有服务商回复或变更记录佐证，本文不把推测写成故障原因。

## 这组数据不能证明什么

一组北京电信样本不能代表移动、联通或其他地区，也不能代表香港、日本、新加坡、美国等全部节点。测试只写“快速节点”，连被测地区都不明确，所以95ms不能用来判断哪条线路延迟较低。

同样，Netflix加载约30秒只说明当时被选节点的体验，不等于永久解锁失败，也不等于其他节点都能解锁。来源标注的97.1%没有计算方法，本站不会将其转成星级、排名或长期在线率。

## 登录后官方套餐页

用户于2026年8月19日提供了从本站推广入口进入后的大哥云登录套餐页。截图中可见五种套餐：

| 套餐 | 当前价格 | 每月流量 | 最大带宽 |
| --- | ---: | ---: | ---: |
| VIP1小流量 | ¥88/年 | 15GB/月 | 500Mbps |
| 单月套餐A | ¥19.90/月 | 100GB | 500Mbps |
| 季付套餐A | ¥69/季 | 200GB/月 | 1000Mbps |
| 年付套餐A | ¥199/年 | 300GB/月 | 1000Mbps |
| 年付套餐A 500GB | ¥299/年 | 500GB/月 | 1000Mbps |

五张卡片均标注 **新疆地区不可用、Trojan协议、不支持原路退款**。单月套餐按自然月计算，并写明订单日或续费套餐时重置；季付和年付套餐分别为90天与365天，写明订单日或购买流量包时重置。年付300GB与500GB卡片显示九折优惠券 `mcuE8uOq`，优惠能否使用仍以结算页为准。

登录后的当前五档与此前第三方页面中的主要价格相符，但截图没有出现第三方曾列出的29.90元月付150GB和699元年付1000GB。它们可能已下架、暂时隐藏或属于其他页面版本，因此本文不再把这两档列为当前可购买套餐。

套餐卡片给出的是最大带宽，不是晚高峰最低保障，也不能用来替代上文的实际下载样本。截图中含登录邮箱，本站只整理套餐字段，不公开带个人信息的原图。

## 关键项目完整度

| 必填项目 | 当前状态 |
| --- | --- |
| 有效订阅 | 暂未找到公开证明 |
| 节点列表 | 未公开，仅称选择快速节点 |
| 白天与晚高峰 | 只有一组18:00至23:00晚高峰记录 |
| 延迟 | 95ms，测试目标未公开 |
| 下载速度 | YouTube 8.9Mbps、文件下载6.2MB/s |
| 上传速度 | 暂未找到可靠资料 |
| 丢包率 | 暂未找到可靠资料 |
| 流媒体或AI解锁 | Netflix加载约30秒；AI未测 |
| 测试设备、网络和客户端 | 北京电信100Mbps、Windows Clash；设备缺失 |
| 未修改的原始截图 | 暂未找到可靠资料 |

## 当前结论与后续验证

现有公开资料只能确认：在来源描述的北京电信100Mbps晚高峰环境中，大哥云被选节点出现8.9Mbps YouTube速率、6.2MB/s文件下载、95ms延迟和Netflix较长加载。它不能回答多节点、多运营商和多日期是否稳定。

下一轮至少需要补充登录后套餐页、有效订阅、完整节点列表、被测节点名称、同日白天与晚高峰、下载与上传、延迟抖动、丢包、逐节点AI/流媒体解锁、设备和未修改原图。达到至少7个不同日期和28条样本前，本站不生成综合评分。

## 来源与利益披露

本站大哥云品牌页包含推广链接，但本页没有采用商业页面的“稳定不限速”作为事实，也没有隐去Netflix加载慢、测速证据不足和套餐来源冲突。第三方测速与套餐信息可能随线路和运营策略变化。
