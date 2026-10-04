// 各机场入门套餐（整理自本站测评页中的官网套餐表，2026-10-04 复核整理）
// month：最便宜的月付套餐；year：最便宜的年付套餐（流量为每月）；once：最便宜的不限时 / 一次性流量包
import { brands, type Brand } from './brands';

export interface Plan { name: string; price: number; gb: number }
export interface PlanSet {
  month?: Plan;
  year?: Plan;
  once?: Plan;
  quarter?: Plan;
  promo?: string;
  note?: string;
}

export const UPDATED = '2026-10-04';
export const UPDATED_LABEL = '2026 年 10 月 4 日';
export const UPDATED_MONTH = '2026年10月';

export const plans: Record<string, PlanSet> = {
  weifeng: { month: { name: '乘风', price: 27, gb: 200 }, year: { name: '清风', price: 137, gb: 100 }, once: { name: '信风', price: 200, gb: 270 }, promo: 'weifeng90' },
  'feimao-yun': { month: { name: '星耀版', price: 25, gb: 150 }, year: { name: '学生版', price: 84, gb: 50 }, once: { name: '不限时套餐', price: 680, gb: 1000 }, promo: 'flycat888' },
  firefly: { month: { name: 'Firefly Lite', price: 25, gb: 150 }, year: { name: '年付版', price: 96, gb: 60 }, promo: 'firefly' },
  wuyou: { month: { name: '舒心', price: 19, gb: 100 }, year: { name: 'MINI', price: 79, gb: 40 }, promo: 'wuyou' },
  'kuajie-yun': { month: { name: '轻云 Lite', price: 20, gb: 120 }, year: { name: '年付版', price: 96, gb: 60 }, promo: 'kuajie' },
  lingmao: { year: { name: '年付小包', price: 85, gb: 45 }, promo: 'lingmao', note: '只有年付套餐，另有年付 Small ¥195（150GB/月）' },
  shanyue: { month: { name: '闪动 Flicker', price: 24, gb: 150 }, year: { name: '年付版', price: 96, gb: 60 }, promo: 'shanyue' },
  'jilian-cloud': { month: { name: '基础套餐', price: 18, gb: 100 }, year: { name: '年付体验', price: 96, gb: 60 } },
  u1s1: { month: { name: '普通人真够了包', price: 20, gb: 120 }, year: { name: '就是好用包', price: 96, gb: 60 } },
  flyv: { month: { name: '入门方案', price: 25, gb: 150 }, year: { name: '年付轻量版', price: 99, gb: 65 } },
  flybit: { month: { name: '每月 128G', price: 15, gb: 128 } },
  xsus: { month: { name: 'P-Small', price: 12, gb: 168 } },
  kuaili: { month: { name: '月狸小套餐', price: 15, gb: 50 }, year: { name: '森狸年付', price: 120, gb: 30 } },
  'shanshui-cloud': { year: { name: '64G 轻量套餐', price: 88, gb: 64 }, quarter: { name: '256G 轻量套餐', price: 75, gb: 256 }, note: '没有月付，季付 ¥75 每月 256GB' },
  'sogo-yun': { month: { name: '基础版', price: 25, gb: 150 }, year: { name: '小包年付版', price: 98, gb: 60 }, promo: 'sogo10000' },
  'yuzhou-cloud': { month: { name: '行星基础版', price: 25, gb: 160 }, year: { name: '星云年付小包', price: 96, gb: 60 } },
  'lingdong-cloud': { month: { name: '拂风', price: 20, gb: 100 }, year: { name: '穿云', price: 99, gb: 70 } },
  'laomao-cloud': { month: { name: 'E 套餐', price: 40, gb: 300 }, quarter: { name: 'B 套餐', price: 45, gb: 50 } },
  ermao: { month: { name: '白猫套餐', price: 20, gb: 130 }, year: { name: '年付小包', price: 89, gb: 60 } },
  sujie: { month: { name: '月付小包', price: 15, gb: 50 }, year: { name: '年付', price: 90, gb: 50 } },
  'flashget-cloud': { once: { name: '试用套餐', price: 6.8, gb: 20 }, note: '只卖不限时流量包，标准套餐 ¥24 / 100GB' },
  xxyun: { month: { name: '初级', price: 9.99, gb: 100 }, note: '月付 ¥19.9 / 300GB、¥39.9 / 1000GB' },
  yifan: { month: { name: '轻享版', price: 20, gb: 150 }, year: { name: '年付小包', price: 98, gb: 60 } },
  edgenova: { month: { name: '月付小包', price: 15, gb: 50 }, year: { name: '年付小包', price: 108, gb: 45 } },
  xingdaomeng: { month: { name: '超量 150G', price: 25, gb: 150 }, year: { name: '贴心小包', price: 96, gb: 60 } },
  'qipao-cloud': { month: { name: '包月套餐', price: 9.9, gb: 100 }, once: { name: '200G 流量包', price: 30, gb: 200 } },
  'quanqiu-cloud': { month: { name: 'BGP 入门方案', price: 20, gb: 120 }, year: { name: '轻量版', price: 99, gb: 59 } },
  guangsu: { month: { name: '较快版', price: 23, gb: 148 }, year: { name: '轻量版', price: 99, gb: 59 } },
  'invisible-man': { month: { name: '白银纪元', price: 24, gb: 144 } },
  'weitu-cloud': { year: { name: '年付限量款', price: 79.9, gb: 45 }, note: '只有年付套餐' },
  muguang: { month: { name: '基础版', price: 20, gb: 120 }, year: { name: '年付轻量版', price: 109, gb: 70 } },
  guangnian: { month: { name: '入门版', price: 18, gb: 110 }, year: { name: '年付限时套餐', price: 89, gb: 50 } },
  'kexin-cloud': { month: { name: '月付小包', price: 15, gb: 60 }, year: { name: '年费小礼包', price: 96, gb: 60 } },
  jiuyun: { month: { name: '招财版', price: 6, gb: 150 }, year: { name: '年付 400G', price: 99, gb: 400 }, once: { name: '鸿运版', price: 99, gb: 300 } },
  'tizi-cloud': { month: { name: '基础视界', price: 25, gb: 125 }, year: { name: '年度保活', price: 89, gb: 60 } },
  'langwang-cloud': { month: { name: '入门', price: 30, gb: 150 }, year: { name: '年付标准', price: 119, gb: 80 } },
  'jisu-cloud': { month: { name: '体验套餐', price: 8.9, gb: 100 }, note: '官网标注 10 倍流量倍率，原生节点 15 倍，实际可用流量要除以倍率' },
  dageyun: { month: { name: '单月套餐 A', price: 19.9, gb: 100 }, year: { name: '年付 300G', price: 199, gb: 300 }, note: '年付 ¥199 每月 300GB' },
};

export const planOf = (slug: string): PlanSet => plans[slug] ?? {};

/** 折合每月价格（用于排序比较） */
export const monthlyEq = (p: PlanSet): number | null => {
  const c: number[] = [];
  if (p.month) c.push(p.month.price);
  if (p.year) c.push(p.year.price / 12);
  if (p.quarter) c.push(p.quarter.price / 3);
  return c.length ? Math.min(...c) : null;
};

/** 月付套餐每 GB 单价 */
export const perGB = (p: Plan) => p.price / p.gb;

export const yuan = (n: number) => `¥${Number.isInteger(n) ? n : n.toFixed(2).replace(/0$/, '')}`;
export const fmtGB = (gb: number) => (gb >= 1000 ? `${(gb / 1000).toFixed(gb % 1000 ? 1 : 0)}TB` : `${gb}GB`);
export const monthLabel = (p: PlanSet) => (p.month ? `${yuan(p.month.price)}/月 · ${fmtGB(p.month.gb)}` : '无月付');
export const yearLabel = (p: PlanSet) => (p.year ? `${yuan(p.year.price)}/年 · 每月${fmtGB(p.year.gb)}` : '—');
export const entryLabel = (p: PlanSet) => {
  if (p.month) return monthLabel(p);
  if (p.year) return `${yuan(p.year.price)}/年（折合 ${yuan(Math.round((p.year.price / 12) * 10) / 10)}/月）`;
  if (p.quarter) return `${yuan(p.quarter.price)}/季`;
  if (p.once) return `${yuan(p.once.price)} 不限时 ${fmtGB(p.once.gb)}`;
  return '以官网为准';
};

export interface Row { brand: Brand; plan: PlanSet; eq: number | null }
export const rows: Row[] = brands.map((brand) => ({ brand, plan: planOf(brand.slug), eq: monthlyEq(planOf(brand.slug)) }));

/** 有月付套餐的机场，按月付入门价从低到高 */
export const byMonthPrice = rows.filter((r) => r.plan.month).sort((a, b) => a.plan.month!.price - b.plan.month!.price || a.brand.rank - b.brand.rank);
/** 有年付套餐的机场，按年付价格从低到高 */
export const byYearPrice = rows.filter((r) => r.plan.year).sort((a, b) => a.plan.year!.price - b.plan.year!.price || a.brand.rank - b.brand.rank);
/** 月付套餐每 GB 单价从低到高 */
export const byPerGB = rows.filter((r) => r.plan.month).sort((a, b) => perGB(a.plan.month!) - perGB(b.plan.month!) || a.brand.rank - b.brand.rank);
