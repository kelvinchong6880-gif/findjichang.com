import { brands } from './brands';

export type ContentType = 'review' | 'speed-test' | 'recommendation' | 'comparison' | 'guide' | 'knowledge';
export type ContentStatus = 'planned' | 'researching' | 'drafting' | 'fact-checking' | 'ready' | 'published' | 'updating';

export interface PlannedContent {
  id: string;
  type: ContentType;
  title: string;
  path: string;
  priority: number;
  status: ContentStatus;
  relatedBrands: string[];
}

const brandContent: PlannedContent[] = brands.flatMap((brand) => [
  { id: `review-${brand.slug}`, type: 'review', title: `${brand.name}机场测评`, path: `/jichang/${brand.slug}/`, priority: brand.rank * 2 - 1, status: 'planned', relatedBrands: [brand.slug] },
  { id: `speed-${brand.slug}`, type: 'speed-test', title: `${brand.name}机场测速资料汇总`, path: `/speed-test/${brand.slug}/`, priority: brand.rank * 2, status: 'planned', relatedBrands: [brand.slug] },
]);

const recommendations = [
  ['机场推荐：新手如何选择', 'beginner'], ['稳定机场推荐', 'stable'], ['便宜机场推荐', 'budget'],
  ['低延迟机场推荐', 'low-latency'], ['流媒体机场推荐', 'streaming'], ['ChatGPT 与 AI 服务机场推荐', 'ai'],
].map(([title, slug], index): PlannedContent => ({ id: `recommend-${slug}`, type: 'recommendation', title, path: `/recommend/${slug}/`, priority: 73 + index, status: 'planned', relatedBrands: [] }));

const comparisonPairs = [
  ['weifeng', 'sogo-yun'], ['weifeng', 'feimao-yun'], ['weifeng', 'muguang'], ['weifeng', 'wuyou'],
  ['weifeng', 'firefly'], ['sogo-yun', 'feimao-yun'], ['wuyou', 'kuajie-yun'], ['shanyue', 'lingmao'],
];
const comparisons = comparisonPairs.map(([a, b], index): PlannedContent => {
  const left = brands.find((brand) => brand.slug === a)!;
  const right = brands.find((brand) => brand.slug === b)!;
  return { id: `compare-${a}-${b}`, type: 'comparison', title: `${left.name} vs ${right.name}：机场对比`, path: `/compare/${a}-vs-${b}/`, priority: 79 + index, status: 'planned', relatedBrands: [a, b] };
});

const guides = [
  ['机场是什么', 'what-is-jichang'], ['新手购买机场完整流程', 'buy-jichang'], ['如何导入机场订阅', 'import-subscription'],
  ['Windows 客户端使用教程', 'windows-client'], ['Android 客户端使用教程', 'android-client'], ['iPhone 与 iPad 使用教程', 'ios-client'],
  ['macOS 使用教程', 'macos-client'], ['订阅更新失败怎么办', 'subscription-update-failed'], ['节点无法连接怎么办', 'node-connection-failed'],
  ['如何辨别真正的机场官网', 'identify-official-site'],
].map(([title, slug], index): PlannedContent => ({ id: `guide-${slug}`, type: 'guide', title, path: `/guide/${slug}/`, priority: 87 + index, status: 'planned', relatedBrands: [] }));

const knowledge = [
  ['机场节点是什么意思', 'what-is-node'], ['IPLC、IEPL 和中转线路的区别', 'iplc-iepl-transit'], ['延迟多少算正常', 'latency'],
  ['丢包率是什么意思', 'packet-loss'], ['流量倍率是什么意思', 'traffic-multiplier'], ['机场晚高峰是什么意思', 'peak-hours'],
  ['机场测速应该怎么看', 'read-speed-test'], ['Netflix 解锁是什么意思', 'netflix-unlock'], ['ChatGPT 无法使用的常见原因', 'chatgpt-unavailable'],
  ['机场跑路风险如何判断', 'shutdown-risk'],
].map(([title, slug], index): PlannedContent => ({ id: `knowledge-${slug}`, type: 'knowledge', title, path: `/knowledge/${slug}/`, priority: 97 + index, status: 'planned', relatedBrands: [] }));

export const contentPlan: PlannedContent[] = [...brandContent, ...recommendations, ...comparisons, ...guides, ...knowledge];
export const firstPublishingBatch = contentPlan.filter((item) => item.priority <= 18);

