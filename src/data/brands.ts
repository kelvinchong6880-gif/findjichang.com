export interface Brand {
  name: string;
  slug: string;
  rank: number;
  affiliateUrl: string;
  affiliateLinkStatus: 'unchecked' | 'active' | 'broken';
  affiliateLinkCheckedAt: string | null;
}

export const brands: Brand[] = [
  ['微风', 'weifeng', 'https://edp01.breezenetaff.com/#/?code=hM8APccJ'],
  ['SOGO云', 'sogo-yun', 'https://wzjc.sogoyunaff.cc/#/?code=BC2BL855'],
].map(([name, slug, affiliateUrl], index) => ({ name, slug, affiliateUrl, rank: index + 1, affiliateLinkStatus: 'unchecked' as const, affiliateLinkCheckedAt: null }));

export const getBrand = (slug: string) => brands.find((brand) => brand.slug === slug);
