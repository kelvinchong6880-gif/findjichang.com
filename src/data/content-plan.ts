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
  { id: `review-${brand.slug}`, type: 'review', title: `${brand.name}机场测评`, path: `/jichang/${brand.slug}/`, priority: brand.rank * 2 - 1, status: 'published', relatedBrands: [brand.slug] },
]);

export const contentPlan: PlannedContent[] = [...brandContent];
export const firstPublishingBatch: PlannedContent[] = contentPlan.filter((item) => item.priority <= 18);

