import { brands } from './brands';

export type ContentType = 'review' | 'speed-test' | 'recommendation' | 'comparison' | 'guide' | 'knowledge' | 'page';
export type ContentStatus = 'planned' | 'researching' | 'drafting' | 'fact-checking' | 'ready' | 'published' | 'updating';
export interface PlannedContent { id:string; type:ContentType; title:string; path:string; priority:number; status:ContentStatus; relatedBrands:string[] }

const guideSlugs = [
  'android-proxy-battery-optimization-guide','android-proxy-client-ultimate-guide-2026','apple-tv-netflix-proxy-tutorial',
  'chatgpt-access-denied-1020-error-tutorial','clash-for-android-tutorial-configuration-guide','clash-verge-mac-client-tutorial-guide',
  'clash-verge-rev-windows-tutorial-2026','domestic-website-slow-clash-routing-tutorial','free-us-apple-id-register-complete-tutorial',
  'global-vs-rule-pac-mode-tutorial','ios-shadowrocket-proxy-complete-guide','ios-shadowrocket-proxy-complete-tutorial',
  'loon-client-tutorial-configuration-guide','mac-apple-proxy-ultimate-guide-2026','mac-terminal-proxy-configuration-guide',
  'nekoray-windows-tutorial','netflix-proxy-error-native-ip-tutorial','node-timeout-red-troubleshooting-tutorial',
  'node-troubleshooting-ai-streaming-tutorial','quantumult-x-tutorial-configuration-guide','router-openwrt-proxy-configuration-guide',
  'shadowrocket-mac-client-tutorial-guide','sing-box-android-client-tutorial-guide','sing-box-windows-client-configuration-guide',
  'soft-router-openclash-tutorial','soft-router-openwrt-passwall-tutorial','subconverter-node-conversion-tutorial',
  'surfboard-android-client-tutorial-guide','surge-5-basic-configuration-guide','surge-mac-advanced-configuration-guide',
  'tun-mode-clash-sing-box-tutorial','uwp-microsoft-store-proxy-fix-tutorial','v2rayn-windows-client-tutorial-vmess-vless-trojan',
  'v2rayng-android-client-tutorial-guide','v2rayu-mac-client-tutorial-guide','windows-pc-proxy-client-tutorial',
] as const;
const knowledgeSlugs = [
  'line-types-explained','bgp-transit-explained','dedicated-line-stability','ip-types-explained','entry-exit-node-explained',
  'how-to-read-speed-test','fast-test-slow-browsing','peak-hour-testing','latency-reference-ranges','speed-test-tools-compared',
  'traffic-multiplier-and-renewal','monthly-data-estimator','monthly-vs-annual-plan','unlimited-devices-explained','speed-connection-thread-limits',
  'subscription-link-security','nodes-subscriptions-rules','proxy-protocols-compared','hysteria2-tuic-reality','client-speed-differences',
  'netflix-unlock-meaning','google-works-ai-fails','chatgpt-error-codes','tiktok-region-errors','ai-streaming-line-claims',
  'proxy-privacy-https','free-node-risks','shutdown-risk-checklist','subscription-leak-response','legal-account-payment-risks',
] as const;
const comparisonItems = [
  ['weifeng-vs-sogo-yun',['weifeng','sogo-yun']],
  ['sogo-yun-vs-feimao-yun',['sogo-yun','feimao-yun']],
] as const;
const pageItems = [
  ['recommendation','机场候选与购买前检查','/recommend/','drafting'],
  ['about','关于找机场','/about/','ready'],['contact','联系我们','/contact/','ready'],
  ['methodology','评测与测速资料方法','/methodology/','ready'],
  ['privacy','隐私政策','/privacy/','ready'],['terms','使用条款','/terms/','ready'],['disclaimer','免责声明','/disclaimer/','ready'],
] as const;

const brandContent: PlannedContent[] = brands.flatMap((brand) => [
  { id:`review-${brand.slug}`, type:'review', title:`${brand.name}机场测评`, path:`/jichang/${brand.slug}/`, priority:brand.rank * 2 - 1, status:'fact-checking', relatedBrands:[brand.slug] },
  { id:`speed-${brand.slug}`, type:'speed-test', title:`${brand.name}测速资料`, path:`/speed-test/${brand.slug}/`, priority:brand.rank * 2, status:'fact-checking', relatedBrands:[brand.slug] },
]);
const guideContent: PlannedContent[] = guideSlugs.map((slug,index)=>({id:`guide-${slug}`,type:'guide',title:slug,path:`/guide/${slug}/`,priority:100+index,status:'drafting',relatedBrands:[]}));
const knowledgeContent: PlannedContent[] = knowledgeSlugs.map((slug,index)=>({id:`knowledge-${slug}`,type:'knowledge',title:slug,path:`/knowledge/${slug}/`,priority:200+index,status:'drafting',relatedBrands:[]}));
const comparisonContent: PlannedContent[] = comparisonItems.map(([slug,relatedBrands],index)=>({id:`comparison-${slug}`,type:'comparison',title:slug,path:`/compare/${slug}/`,priority:220+index,status:'drafting',relatedBrands:[...relatedBrands]}));
const pageContent: PlannedContent[] = pageItems.map(([id,title,path,status],index)=>({id:`page-${id}`,type:id==='recommendation'?'recommendation':'page',title,path,priority:240+index,status,relatedBrands:[]}));

export const contentPlan: PlannedContent[] = [...brandContent,...guideContent,...knowledgeContent,...comparisonContent,...pageContent];
export const firstPublishingBatch = contentPlan.filter(item=>item.priority<=18);
export const contentPlanSummary = contentPlan.reduce<Record<string,number>>((summary,item)=>{summary[item.type]=(summary[item.type]??0)+1;return summary;},{});
