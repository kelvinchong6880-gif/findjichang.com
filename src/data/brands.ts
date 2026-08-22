export interface Brand {
  name: string;
  slug: string;
  rank: number;
  affiliateUrl: string;
  affiliateLinkStatus: 'unchecked' | 'active' | 'broken';
  affiliateLinkCheckedAt: string | null;
}

export const brands: Brand[] = [];

export const getBrand = (slug: string) => brands.find((brand) => brand.slug === slug);
