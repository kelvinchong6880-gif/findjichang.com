import { readFileSync, writeFileSync } from 'node:fs';

const root = new URL('../src/content/guides/', import.meta.url);
const marker = '## 官方资料、配图与推广说明';

const additions = {
  'node-timeout-red-troubleshooting-tutorial.md': `## 九、按层定位：不要一上来反复重装

建议按“本机网络 → 客户端 → 订阅 → 单个节点 → 服务端”依次排查。先关闭代理确认国内网站可访问，再检查客户端日志中是 DNS、TLS、连接超时还是认证失败；随后只测试一个已知可用节点，并用手机流量与家庭 Wi-Fi 交叉验证。若两种网络均失败且所有设备表现相同，问题更可能在订阅或服务端；若只有一台设备失败，则优先检查系统代理、时间、权限和防火墙。

恢复过程中每次只改一项并记录结果。关闭 TUN、恢复系统 DNS、退出其他代理软件后仍无效，再考虑重装。这样可以避免同时修改多个设置后无法确定真正原因。
`,
  'apple-tv-netflix-proxy-tutorial.md': `## 第九章：上线前检查与安全回滚

开始前记录 Apple TV 当前的 DNS、网关和网络获取方式。优先使用自动获取地址，只在明确知道旁路由地址时才手动修改网关。配置完成后分别测试 Apple TV 系统更新、App Store、Netflix 登录和一段普通视频；能打开首页不等于能够稳定播放。

出现无法联网时，先把 Apple TV 网络恢复为自动获取，重启电视盒子与路由器，再检查代理设备。Netflix 内容库和代理识别会动态变化，某个节点今天可播放并不能代表长期有效；本文不对特定地区片库或画质作保证。
`,
  'subconverter-node-conversion-tutorial.md': `## 九、转换前后的安全核对清单

订阅链接通常包含访问凭据，不应粘贴到来历不明的网页转换器。更安全的顺序是：优先使用服务商提供的目标格式，其次使用本机或自建转换服务，最后才考虑可信的第三方实例。转换完成后检查生成地址的域名、目标客户端类型和是否意外包含多个私人订阅。

转换只能改变配置格式，不能修复失效节点、欠费账号或不兼容协议。若客户端提示配置解析失败，应先导出错误日志并核对 YAML 缩进、规则集地址和客户端支持的字段；不要为了“能导入”而关闭证书校验或把私人订阅发到公开群组求助。
`,
  'global-vs-rule-pac-mode-tutorial.md': `## 九、用四个网址验证分流是否正确

切换模式后，可依次检查一个国内网站、一个海外网站、服务商订阅域名和本地路由器管理地址。国内网站应保持本地出口，海外网站按规则走代理，路由器管理地址与局域网设备应保持直连。若只有个别域名走错，不必切换全局模式，应在日志中找到命中的规则并进行局部修正。

PAC 通常只影响支持系统代理的应用；规则模式由客户端内核按规则集判断；TUN 则能接管更多不遵循系统代理的程序。三者不是简单的新旧关系，选择标准应是应用覆盖范围与可维护性，而不是一律开启权限最大的模式。
`,
  'nekoray-windows-tutorial.md': `## 迁移建议：NekoRay 已停止维护

NekoRay 官方仓库已于 2025 年 3 月归档，并明确提示“不再维护，自寻替代品”。因此本文仅用于旧设备识别配置和迁移，不建议新用户继续把它作为主力客户端。停止维护的软件不会继续获得漏洞修复、内核兼容更新或新协议适配。

迁移前请只在本机备份配置名称与必要参数，不要公开分享包含服务器地址、UUID、密码或订阅令牌的文件。随后在仍维护的客户端中重新导入服务商提供的订阅，并逐项验证系统代理、DNS 和 TUN；新客户端正常后再退出旧程序。不要从非官方“魔改版”覆盖安装。
`,
  'tun-mode-clash-sing-box-tutorial.md': `## 九、最小权限启用与回滚步骤

并非所有用户都需要 TUN。浏览器和少量遵循系统代理的软件能正常工作时，系统代理通常更容易维护。只有游戏启动器、命令行、商店应用或其他不读取系统代理的程序确实漏流量时，再启用 TUN。

启用前记录原 DNS 和路由设置，退出其他 VPN、加速器及虚拟网卡软件。若开启后断网，依次关闭 TUN、退出客户端、恢复系统 DNS，并重启网络适配器；不要同时删除多个驱动。公司电脑或装有安全软件的设备还应遵循管理员策略，避免自行安装网络服务。
`,
  'soft-router-openclash-tutorial.md': `## 九、升级、备份与故障回滚

安装或升级前，应备份 OpenWrt 配置以及 OpenClash 中不含私人订阅凭据的规则设置，并确认路由器架构、剩余存储空间和当前可用的管理入口。不要在远程连接且无人能接触设备时升级网络核心，以免失败后无法进入后台。

更新后先测试 DNS、国内直连、海外规则和局域网访问，再恢复自动更新任务。若插件无法启动，先查看系统日志与内核架构是否匹配；回滚时恢复上一版插件和配置，而不是反复强制安装。核心文件只需必要的可执行权限，使用 755 通常比开放 777 更合适。
`,
  'node-troubleshooting-ai-streaming-tutorial.md': `## 九、把“连通问题”和“账户问题”分开

AI 或流媒体不可用不一定是节点故障。先确认服务是否支持当前国家或地区，再区分 DNS 解析失败、连接超时、HTTP 拒绝、登录验证和账号停用。只有网络层错误才适合通过切换线路、检查 DNS 或路由处理；账号停用、付款地区或平台政策问题不能靠更换节点解决。

排查时保存错误代码与发生时间，但不要公开 Cookie、订阅链接、账号令牌或完整 IP。频繁切换多个国家、叠加多层代理或不断清理登录状态，可能让诊断更困难，也不能保证降低平台风控。
`,
  'netflix-proxy-error-native-ip-tutorial.md': `## 九、正确理解“原生 IP”和可播放性

“原生”“住宅”“机房”是市场常用标签，但不能单独证明 Netflix 可播放。平台会综合判断 IP 信誉、DNS 出口、账户与设备状态，识别结果也可能随时间变化。某个检测网站显示住宅网络，不等于 Netflix 一定开放完整片库；反过来，部分机房网络也可能在特定时间可用。

更可靠的验证方式是记录节点、时间、设备和具体错误代码，并实际播放一段非自制内容。遇到官方代理提示时先参考 Netflix 帮助页面，恢复普通网络确认账号本身正常，再联系服务商；不要把无法核验的“全区永久解锁”当作购买保证。
`,
  'domestic-website-slow-clash-routing-tutorial.md': `## 九、从连接日志定位误代理域名

遇到某个国内 App 变慢时，先在客户端连接日志中复现一次操作，观察相关域名最终命中了 DIRECT 还是代理策略。若命中错误，可添加范围尽量小的直连规则并放在通用规则之前；不要为了一个域名把整段 IP、所有 CDN 或整个应用流量无条件放行。

修改后清理一次 DNS 缓存并重新测试登录、图片、视频和支付页面。银行、政务和公司内部应用对异地出口较敏感，使用时可临时关闭代理或设置独立直连规则。规则集自动更新也可能改变命中结果，因此应保留修改记录和回滚方法。
`,
  'chatgpt-access-denied-1020-error-tutorial.md': `## 九、错误代码记录与合规排查

先记录页面错误代码、时间和所用网络，再查询 OpenAI 服务状态及支持地区。1020 或 Access Denied 只能说明请求被访问策略拒绝，不能仅凭这一页面断定账号被封、机场跑路或 IP 类型有问题。账号已停用时，应通过官方支持渠道处理，切换线路不能恢复账号。

排障时避免在短时间内频繁跨地区登录、叠加 WARP 与多个代理、反复注册账号或向他人发送 Cookie。本文只提供网络诊断思路，不保证任何代理线路能够访问服务，也不建议绕过平台的地区、账户或使用政策。
`,
};

const replacements = {
  'nekoray-windows-tutorial.md': [
    ['title: "NekoRay Windows 版使用教程：支持 Xray/Sing-box 内核的轻量选择"', 'title: "NekoRay Windows 已停更：旧用户配置识别与迁移指南"'],
    ['description: "2026最新 NekoRay Windows 客户端使用教程，深入解析 Xray 与 Sing-box 双内核切换、订阅导入及 TUN 模式配置，打造极速、轻量的网络体验。"', 'description: "NekoRay 官方项目已经归档停止维护。本文供旧用户识别原有配置、导出必要参数并迁移到仍维护的 Windows 客户端。"'],
    ['## NekoRay 核心优势与双内核切换', '## NekoRay 旧版界面与双内核说明'],
    ['### 2. 端口与 SNI 伪装检查若节点仍不稳定，双击 Hysteria2 节点进入编辑界面，检查 **SNI（服务器名称指示）** 字段是否正确填写了服务商提供的伪装域名（例如 `bing.com` 或 `yahoo.com`），这有助于欺骗防火墙，将其伪装成正常的网页请求。', '### 2. 端口与 SNI 配置检查\n若节点仍不稳定，双击节点检查端口与 SNI 是否和服务商提供的参数完全一致。不要自行填写 `bing.com`、`yahoo.com` 等无关域名；错误的 SNI 可能直接导致 TLS 握手失败。'],
  ],
  'clash-for-android-tutorial-configuration-guide.md': [
    ['title: "安卓手机翻墙首选：Clash for Android 下载与订阅配置保姆级教程 (2026最新)"', 'title: "Clash for Android 已停更：旧版配置与安全迁移教程"'],
    ['description: "2026最新安卓翻墙新手指南！详细讲解 Clash for Android (CFA) 安全APK下载安装、机场节点订阅导入、分流模式选择（规则/全局/直连）及应用绕过设置，保姆级教程手把手带您玩转安卓端科学上网。"', 'description: "Clash for Android 原项目已经停更。本文说明旧版配置、安装包风险、订阅迁移和退出前的网络恢复方法，不再推荐新用户安装。"'],
    ['## 一、 为什么 Clash for Android 是安卓手机的翻墙首选？', '## 一、为什么本文不再把 Clash for Android 作为首选？'],
    ['在 Android 开放生态下，科学上网工具有很多选择（如 v2rayNG、SagerNet、NekoBox 等），但如果要选出一款在规则分流、界面直观度、生态兼容性与后台稳定性上达到极致平衡的客户端，Clash for Android（简称 CFA） 依然是绝大多数用户的首选。', '在 Android 生态中有多种代理客户端可选。Clash for Android（简称 CFA）曾拥有较多用户，但原项目已停止正常维护；本文保留给仍在使用旧版的读者，并把迁移与安装包安全放在首位。'],
    ['相比于其他轻量或单一协议的客户端，Clash 框架在安卓端具备以下不可替代的核心优势：', '旧版 CFA 曾提供以下常用功能，但这些功能不代表停更软件仍适合新安装：'],
    ['- **GitHub 开源发布页 (首选)**：前往 Clash for Android 的开源托管页面或可信镜像站下载最新的 `.apk` 安装包。', '- **原项目状态**：原始发布渠道已经停止正常更新。不要把同名下载站、备份仓库或第三方重新打包 APK 当作官方最新版；新用户应选择仍维护且来源可核验的客户端。'],
  ],
  'clash-verge-rev-windows-tutorial-2026.md': [
    ['description: "2026年最全面的 Clash Verge Rev Windows 电脑端使用教程。详细讲解如何从 GitHub 下载、安装汉化、一键导入机场订阅及开启 TUN 虚拟网卡模式。完美替代已停更的 Clash for Windows (CFW)，解决各类连不上网的疑难杂症，零基础新手也能轻松实现全网科学上网。"', 'description: "Clash Verge Rev Windows 使用教程：从官方 GitHub 核对版本，完成订阅导入、规则模式、系统代理、TUN 与常见断网回滚。"'],
    ['## 一、 为什么 2026 年必须换用 Clash Verge Rev？', '## 一、Clash Verge Rev 适合哪些 Windows 用户？'],
    ['它是 2026 年畅游国际互联网的唯一必选项。', '它是目前可考虑的桌面客户端之一，但是否适合仍取决于订阅格式、系统版本和使用习惯。'],
    ['内置的 Mihomo 内核更是目前解析机场高级节点（如防阻断、低延迟节点）的“最强引擎”', '内置 Mihomo 内核，可处理多种常见配置与规则'],
    ['**Clash Verge Rev** 强势崛起，成为了目前 Windows 平台上最完美、最强大的代理客户端替代品。', '**Clash Verge Rev** 是目前仍有社区维护的 Windows 客户端选项之一。'],
    ['*(注：如果你不知道自己的系统架构，默认下载带 `x64-setup.exe` 后缀的文件绝对不会错。)*', '*(注：请先在 Windows“系统信息”中确认 x64 或 ARM64 架构，再下载对应安装包。)*'],
    ['此时，你的整台电脑已经完美接管，各类游戏和顽固软件均可畅通无阻！', '此时 TUN 已接管更多不遵循系统代理的应用；仍应分别测试国内直连、DNS 和目标应用。'],
  ],
  'soft-router-openclash-tutorial.md': [
    ['并务必赋予其 777 的最高可执行权限', '并赋予核心文件必要的可执行权限（通常使用 755，避免无必要的 777 权限）'],
    ['彻底消除网页加载的“等待感”', '减少部分场景中的 DNS 等待'],
  ],
  'netflix-proxy-error-native-ip-tutorial.md': [
    ['## 二、 底层原理：IDC 机房 IP vs 原生住宅 IP', '## 二、底层原理：IP 类型、信誉与平台识别'],
  ],
  'apple-tv-netflix-proxy-tutorial.md': [
    ['必须在客户端策略中，手动指定使用机场提供的“原生 IP”或“流媒体解锁专线”', '可先测试服务商标注的“原生 IP”或“流媒体”节点，但标签本身不等于平台保证'],
    ['强烈建议搭配具备 BGP 或 IPLC 企业级专线中转的节点，彻底告别缓冲转圈与画质降级。', '是否能稳定播放取决于本地宽带、节点负载、出口与平台识别，应以实际播放测试为准。'],
  ],
  'chatgpt-access-denied-1020-error-tutorial.md': [
    ['## 三、 破局第一步：甄别与切换至“原生 IP”节点', '## 三、排查第一步：核对支持地区与网络出口'],
    ['## 七、 高阶极客方案：Cloudflare WARP 与双层代理隔离', '## 七、谨慎使用 WARP 与多层代理'],
    ['要稳定使用 ChatGPT，必须在代理客户端的节点列表中，寻找明确标注为“ChatGPT 解锁”、“原生 IP”或“住宅 ISP”的专用节点。', '先核对 OpenAI 官方支持的国家和地区，再确认当前出口与账户信息是否一致。服务商标注的“解锁”或“住宅 ISP”只能作为测试线索，不能保证可用或账号安全。'],
    ['与其每天在清除缓存、切换节点和 1020 报错中浪费生命，不如直接选择一家提供**原生纯净 IP、且明确承诺 ChatGPT 不封号**的高端专线机场。', '如果错误持续出现，应保留错误代码并通过官方支持渠道确认。任何网络服务都不能承诺 ChatGPT 账号“不封号”。'],
  ],
  'ios-shadowrocket-proxy-complete-guide.md': [
    ['很多刚从安卓阵营转到苹果', '> **本文定位：** 重点解释 Apple 账号、安装来源、安全风险与完整排障。只想快速导入订阅并启动连接，可阅读另一篇基础操作教程。\n\n很多刚从安卓阵营转到苹果'],
  ],
  'ios-shadowrocket-proxy-complete-tutorial.md': [
    ['很多刚刚从安卓阵营转到苹果 iOS 生态', '> **本文定位：** 这是快速上手版，只覆盖下载安装、订阅导入、节点选择和基础故障。账号安全与高级规则原理请参考完整指南。\n\n很多刚刚从安卓阵营转到苹果 iOS 生态'],
  ],
};

for (const [name, pairs] of Object.entries(replacements)) {
  const file = new URL(name, root);
  let text = readFileSync(file, 'utf8');
  for (const [from, to] of pairs) {
    if (!text.includes(from) && text.includes(to)) continue;
    if (!text.includes(from)) throw new Error(`${name} 未找到待替换文本：${from}`);
    text = text.replace(from, to);
  }
  writeFileSync(file, text);
}

for (const [name, section] of Object.entries(additions)) {
  const file = new URL(name, root);
  let text = readFileSync(file, 'utf8');
  if (text.includes(section.trim().split('\n')[0])) continue;
  if (!text.includes(marker)) throw new Error(`${name} 缺少资料章节标记`);
  text = text.replace(marker, `${section.trim()}\n\n${marker}`);
  writeFileSync(file, text);
}

console.log(`已扩写 ${Object.keys(additions).length} 篇教程，并完成 ${Object.keys(replacements).length} 篇定向纠错。`);
