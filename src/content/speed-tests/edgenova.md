---
title: EdgeNova测速资料汇总：晚高峰节点、当前套餐与解锁核验
description: 汇总EdgeNova当前6种套餐、2026年晚高峰42节点记录、开业期MiaoKo测速与解锁资料，并标明模板残留、协议和客户端冲突。
createdAt: 2026-08-19
updatedAt: 2026-08-19
draft: true
status: fact-checking
primaryIntent: 帮助用户核对EdgeNova当前套餐、晚高峰节点可用率与速度，以及IPLC、协议、客户端和解锁宣传的可信边界。
originalValue: 以用户提供的登录后官网资料确认6种当前套餐，识别多档套餐的低流量年费模板残留，并结合全节点晚高峰中位数与开业期白天节点表分级呈现，不把推广测速写成本站实测。
editorialReview:
  checked: false
  notes: 当前套餐依据用户提供的登录后官网文字复核；晚高峰汇总仓库当前无法打开，白天测速和解锁图片缺少本站归档的原始文件。
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
brandSlug: edgenova
reviewSlug: edgenova
keywords: [EdgeNova测速, EdgeNova机场测速, EdgeNova晚高峰, 边缘节点套餐, EdgeNova速度]
sources:
  - label: EdgeNova登录后购买订阅页
    publisher: EdgeNova
    url: https://zvbghs02.ztymforedge.lol/#/plans
    sourceType: official
    collectedAt: 2026-08-19
    supports: [当前套餐、价格、流量、周期、设备、节点和解锁宣传]
    mayBeOutdated: true
    notes: 依据用户提供的登录后官网文字整理；Starting From作为当前标价。多个常规档详情残留年费小包与低流量用户模板文案。
  - label: 2026年机场晚高峰节点汇总
    publisher: jichangyyds
    url: https://github.com/jichangyyds/jichang-tuijian
    sourceType: third-party-test
    collectedAt: 2026-08-19
    supports: [42/42节点可用、香港节点中位速度114.16MB/s、中位延迟39ms、北京电信2Gbps测试入口]
    mayBeOutdated: true
    notes: 搜索索引保留汇总表，但仓库当前返回404；缺少本站可复核的逐节点原始文件和完整地区表。
  - label: EdgeNova开业期MiaoKo订阅测速
    publisher: 川沐
    url: https://cuanmu.com/blog/edgenova-vpn-review/
    sourceType: third-party-test
    collectedAt: 2026-08-19
    supports: [2026-05-30 14时43分、五地区VLESS节点、约7至45MB/s速度区间、UDP类型]
    mayBeOutdated: true
    notes: 白天开业期样本，不是晚高峰；页面含推广链接和优惠码，未提供可下载原始表，不能代表用户增长后的长期表现。
  - label: EdgeNova三网拓扑、测速与解锁资料页
    publisher: Theo Docs
    url: https://doc.theojs.cn/serve/airport/edgenova
    sourceType: third-party-test
    collectedAt: 2026-08-19
    supports: [三网拓扑、流媒体解锁和测速图片入口、套餐周期交叉核对]
    mayBeOutdated: true
    notes: 页面含推广链接和优惠码，图片缺少正文结构化环境与逐节点数字，只作资料入口。
---

> **资料状态：当前套餐已核验，晚高峰有42节点汇总，但原始文件仍待归档。** 本文不是找机场自购订阅实测，不生成评分，也不把官网“全IPLC、2.5Gbps、高峰不降速、全面解锁”直接当成事实。

## 当前6种套餐

用户提供的登录后官网资料显示，EdgeNova当前有2个限时小包和4个常规档：

| 套餐 | 当前价格 | 流量规则 |
| --- | ---: | ---: |
| 限时体验月付小包 | 15元/月 | 每月50GB |
| 限时年付 | 108元/年 | 每月45GB |
| 极界·标准套餐 | 25元/月 | 每月120GB |
| 极界·进阶套餐 | 50元/月 | 每月250GB |
| 极界·高级套餐 | 100元/月 | 每月499GB |
| 极界·极限套餐 | 200元/月 | 每月1TB |

常规档提供月付、季付、半年付和年付，官网写年付85折、两年付8折、三年付75折；限时体验月付不参加优惠。本文没有进入最终结算页逐项核对，因此不计算折后价，也不收录第三方优惠码。

限时年付详情写“10元重置”，但没有说明重置后的流量、次数、有效期和触发方式，不能据此计算额外流量成本，购买前应向客服确认。

## 多个套餐详情存在模板残留

极界标准、进阶、高级和极限套餐的详情都写“年费小包，适用于低流量用户学生党”，但这些档位实际上支持月付等多周期，流量从120GB到1TB。尤其1TB套餐显然不属于低流量小包。

本文采用套餐名称、Starting From、包含流量和周期按钮等结构化字段，不采用这段复制文案来判断适用人群。实际价格、流量和周期仍以订单确认页为准。

## 套餐宣传不等于测速证据

官网宣传所有节点1倍率、高峰不降速、全IPLC、最高2.5Gbps、原生IP、不限设备、智能路由，以及Netflix、Disney+、ChatGPT和TikTok解锁。页面列出的地区包括港、台、日、新、美、韩以及马来西亚、越南、菲律宾、泰国、印度、英、法、德和阿根廷等。

这些属于服务方描述。没有当前订阅、完整节点、入口与出口路由、IP检测和带宽监控，本站不能确认全部节点均为IPLC，也不能把2.5Gbps理解为每位用户的保证速度。

## 晚高峰42节点汇总

搜索索引保留的一份2026年公开汇总称，EdgeNova使用北京电信2Gbps入口完成42个节点测试：

| 项目 | 来源汇总结果 |
| --- | ---: |
| 完成节点 | 42/42 |
| 香港节点中位速度 | 114.16MB/s，约913Mbps |
| 香港节点中位延迟 | 39ms |
| 测试入口 | 北京电信2Gbps |

全节点完成率和地区中位数比最快节点更有参考价值。不过仓库当前返回404，本站没有取得42个节点逐项表、准确测试日期、上传、丢包、失败重试、客户端参数和未修改原图，无法复算114.16MB/s，也不能外推到联通、移动或当前日期。

## 开业期白天MiaoKo测速

川沐页面记录一份2026年5月30日14:43的MiaoKo订阅测速，覆盖日本、新加坡、美国、台湾和香港VLESS节点。其文字整理称节点没有失败项，多数平均速度约20至45MB/s，个别台湾节点约7MB/s，并记录多数UDP为FullCone、少数为Unknown。

这组资料提供时间、工具、地区和速度区间，能说明当时白天的节点差异，但它发生在开业前后、不是晚高峰，页面也直接指出尚未经历真正高峰压力。它不能和晚高峰114.16MB/s中位数直接平均，更不能证明长期稳定。

## 三网和解锁图片只有资料入口

Theo Docs页面提供“三网拓扑”“流媒体解锁图”和“测速图”入口，并交叉列出套餐周期。异域茶壶页面也展示节点测速与解锁图片，但将EdgeNova描述为VLESS、AnyTLS海外中转，并称没有冷门地区。

这些信息与官网的全IPLC、众多冷门地区宣传并不完全一致；图片正文也没有结构化测试时间、入口带宽、客户端、上传和标准丢包数字。因此本文只把它们列为待复核资料入口，不据此生成三网平均速度或全解锁结论。

## 协议和客户端说法冲突

第三方资料分别写VLESS、AnyTLS、IEPL、IPLC或海外中转。客户端方面，川沐称开业期通用订阅尚未开放、主要使用自研客户端；Theo Docs则称支持Clash、Sing-box、v2rayN和Shadowrocket等。

这些差异可能来自服务更新，也可能是推广页面混用模板。没有当前订阅页、客户端下载页、协议截图和路由原图，本站不确认全部节点协议、物理线路或通用客户端支持状态。

## 关键项目完整度

| 必填项目 | 当前状态 |
| --- | --- |
| 有效订阅 | 有登录后官网套餐资料，无已购有效订阅证明 |
| 节点列表 | 有42/42汇总和地区宣传，无当前完整清单 |
| 白天与晚高峰 | 有开业期白天样本和晚高峰汇总，环境不同 |
| 延迟 | 有香港中位数，缺少当前逐节点三网表 |
| 下载速度 | 有中位速度与白天区间，等待原始文件核验 |
| 上传速度 | 暂未找到可靠结构化数字 |
| 丢包率 | 暂未找到可靠、可复算的数字 |
| 流媒体或AI解锁 | 有第三方图片入口，无当前逐节点原图归档 |
| 测试设备、网络和客户端 | 两组资料部分已知，未形成统一环境 |
| 未修改的原始截图 | 暂未归档可复核文件 |

## 当前结论与后续验证

EdgeNova当前最低月付为15元50GB，常规档从25元120GB到200元1TB。公开晚高峰汇总的42/42节点与114.16MB/s香港中位速度具有一定参考价值，但原始仓库已经无法打开；开业期白天MiaoKo表和第三方图片也不足以证明长期高峰稳定或全节点解锁。

后续应取得有效订阅和完整节点清单，在同一设备、客户端和测速服务器上，分别用电信、联通、移动测试白天及20:00至23:00，保留下载、上传、延迟、标准丢包、失败节点、逐节点解锁和未修改原图。证据补齐前，不生成“找机场实测”评分或全IPLC达标结论。

## 来源与利益披露

本站EdgeNova品牌页包含推广链接，用户注册或购买可能为本站带来佣金。本文采用官网Starting From核对当前价格，同时披露模板残留、协议与客户端冲突，以及第三方资料限制；价格、线路、节点与解锁可能变化，最终以实时结算页、服务条款和用户本地复测为准。
