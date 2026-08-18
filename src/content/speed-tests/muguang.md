---
title: 暮光机场测速资料汇总：60节点晚间单次样本
description: 整理暮光加速2026年7月20日晚间60个VLESS节点测速，说明速度范围、美国节点异常及测试环境、上传和丢包等缺失项。
createdAt: 2026-08-18
updatedAt: 2026-08-18
draft: true
status: fact-checking
primaryIntent: 帮助用户正确理解暮光服务商提供的单次晚间测速图能证明什么、不能证明什么。
originalValue: 保留异常节点并逐项列出缺失测试条件，不根据单次峰值生成评分或排名。
editorialReview:
  checked: false
  notes: 等待人工复核；需要补充原始图片直链及多运营商同方法复测。
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
reviewSlug: muguang
keywords: [暮光测速, 暮光机场测速, 幕光加速测速, 暮光晚高峰, 暮光节点]
sources:
  - label: 暮光加速晚间测速资料
    publisher: 二猫子
    url: https://www.ermao.net/blog/twilight-airport/
    sourceType: third-party-test
    publishedAt: 2026-07-23
    collectedAt: 2026-08-18
    supports: [提供服务商投稿的2026-07-20测速图、60节点成功数及速度结果]
    mayBeOutdated: true
    notes: 原始数据由机场服务商提供，页面含推广链接；不是发布者或本站独立购买实测。
testContext:
  device: 未标注
  network: 测试地点、运营商与基础带宽均未标注
  client: 测速工具及版本未标注
  period: 2026-07-20 20:54:55 CST，晚间单次样本
  screenshotEdited: false
---

> **资料状态：有晚间原始图，但证据来自服务商投稿且测试环境不完整。** 下列结果不是找机场自行购买订阅后的实测，不能用于生成综合评分或长期稳定性排名。

## 测试环境

来源页中的截图标注时间为 **2026-07-20 20:54:55 CST**，协议为VLESS，共测试60个节点，成功数60/60。截图没有标注测试地点、运营商、设备、基础带宽、客户端、线程数和重复次数。

“晚间”不自动等于严格晚高峰，也不能代表中国大陆电信、联通和移动三网表现。没有上述环境信息时，不应拿这组数字与其他机场不同条件的测速横向排名。

## 下载结果与异常节点

图中各节点平均下载速度大致分布在 **9.85–83.33MB/s**，最高下载大致为 **36.58–125.17MB/s**。60个节点显示连接成功，但美国01节点的平均与最高速度均为0，说明“成功”判定不等于实际下载可用。

这些范围能够反映该服务商提供测试路径的一次下载表现，却无法回答普通家庭宽带能否达到相同速度，也无法判断同一节点连续数日是否稳定。本站保留0速度异常，不用最快节点代替全体节点。

## 关键项目完整度

| 必填项目 | 当前状态 |
| --- | --- |
| 有效订阅 | 服务商提供样本，本站未验证订单 |
| 节点列表 | 有60个VLESS节点结果，完整订阅待核验 |
| 白天与晚高峰 | 只有晚间单次样本，缺少白天同环境对照 |
| 延迟 | 图中有延迟字段，但测试路径说明不足 |
| 下载速度 | 有平均与最高下载结果 |
| 上传速度 | 暂未找到可靠资料 |
| 丢包率 | 暂未找到可靠资料 |
| 流媒体与AI解锁 | 只有宣传，缺少逐节点原图 |
| 设备、网络和客户端 | 未标注 |
| 未修改原始截图 | 来源页可查看；本站尚未取得可长期引用的图片直链 |

## 当前能得出的结论

这份样本只支持一个有限结论：2026年7月20日该服务商提供的测试路径连接了60个VLESS节点，多数节点取得可见下载结果，同时至少一个美国节点出现0速度异常。

由于缺少测试网络、设备、客户端、上传、丢包和多日复测，暮光的晚高峰稳定性、不同运营商适配和长期可用率仍为 **待核验**。套餐与购买风险见[暮光机场测评](/jichang/muguang/)。

## 来源与利益披露

测速图由第三方页面发布，但页面注明资料来自机场服务商，且包含推广链接。本站只做字段整理和证据限制分析，不把该结果写成“找机场实测”，也不根据这份单次样本给出推荐分数。
