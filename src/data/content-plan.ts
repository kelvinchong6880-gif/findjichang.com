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

export const contentPlan: PlannedContent[] = [];
export const firstPublishingBatch: PlannedContent[] = [];

