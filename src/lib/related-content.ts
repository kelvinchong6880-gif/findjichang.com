export interface LinkCandidate {
  id: string;
  path: string;
  title: string;
  description?: string;
  keywords?: string[];
  devices?: string[];
  clients?: string[];
  useCases?: string[];
  lineTypes?: string[];
  relatedBrands?: string[];
}

const concepts: Array<[string, RegExp]> = [
  ['android', /android|安卓/i], ['windows', /windows|微软|uwp/i], ['macos', /mac|macos|苹果电脑/i],
  ['ios', /ios|iphone|ipad|小火箭|shadowrocket|loon|quantumult/i], ['router', /路由|openwrt|openclash|passwall/i],
  ['clash', /clash|mihomo/i], ['sing-box', /sing[ -]?box/i], ['v2ray', /v2ray|vmess|vless|reality/i],
  ['netflix', /netflix|奈飞/i], ['ai', /chatgpt|openai|claude|gemini|人工智能|\bai\b/i], ['streaming', /流媒体|disney|youtube|tiktok/i],
  ['troubleshooting', /报错|故障|超时|断流|无法|失败|排查|修复/i], ['speed', /测速|速度|带宽|吞吐/i],
  ['latency', /延迟|抖动|丢包|晚高峰/i], ['subscription', /订阅|节点|转换/i], ['security', /安全|隐私|泄露|风险/i],
  ['traffic', /流量|倍率|重置|月付|年付|套餐|预算/i], ['line', /线路|专线|iplc|iepl|中转|直连|bgp/i], ['ip', /原生ip|住宅ip|出口ip|ip地址/i],
];

const tokens = (item: LinkCandidate) => {
  const searchable = [item.title, item.description, ...(item.keywords ?? [])].filter(Boolean).join(' ');
  return new Set([
  ...(item.keywords ?? []), ...(item.devices ?? []), ...(item.clients ?? []),
  ...(item.useCases ?? []), ...(item.lineTypes ?? []), ...(item.relatedBrands ?? []),
  ...item.title.toLowerCase().split(/[\s：，、？（）()·｜|/]+/).filter((word) => word.length > 1),
  ...concepts.filter(([, pattern]) => pattern.test(searchable)).map(([name]) => name),
  ].map((word) => word.toLowerCase()));
};

export const relatedContent = (current: LinkCandidate, candidates: LinkCandidate[], limit = 4) => {
  const currentTokens = tokens(current);
  return candidates
    .filter((item) => item.path !== current.path)
    .map((item) => ({ item, score: [...tokens(item)].reduce((score, token) => score + (currentTokens.has(token) ? 1 : 0), 0) }))
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title, 'zh-CN'))
    .slice(0, limit)
    .map(({ item }) => ({ href: item.path, title: item.title, description: item.description }));
};

export const toCandidate = (entry: any, section: 'guide' | 'knowledge'): LinkCandidate => ({
  id: entry.id,
  path: `/${section}/${entry.id}/`,
  title: entry.data.title,
  description: entry.data.description,
  keywords: entry.data.keywords,
  devices: entry.data.devices,
  clients: entry.data.clients,
  useCases: entry.data.useCases,
  lineTypes: entry.data.lineTypes,
  relatedBrands: entry.data.relatedBrands,
});
