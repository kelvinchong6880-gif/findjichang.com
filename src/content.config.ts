import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { brands } from './data/brands';
import { clients, devices, lineTypes, useCases } from './data/taxonomies';

const knownBrandSlugs = new Set(brands.map((brand) => brand.slug));
const brandSlug = z.string().refine((value) => knownBrandSlugs.has(value), '必须使用品牌资料库中的合法代号');

const shared = {
  title: z.string(),
  description: z.string(),
  createdAt: z.coerce.date(),
  publishedAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  draft: z.boolean().default(false),
  keywords: z.array(z.string()).default([]),
  status: z.enum(['planned', 'researching', 'drafting', 'fact-checking', 'ready', 'published', 'updating']).default('drafting'),
  correctionNotes: z.array(z.object({ date: z.coerce.date(), note: z.string() })).default([]),
  primaryIntent: z.string(),
  originalValue: z.string(),
  editorialReview: z.object({ checked: z.boolean().default(false), checkedAt: z.coerce.date().optional(), notes: z.string().optional() }),
  bingChecklist: z.object({
    intentSatisfied: z.boolean().default(false), originalValue: z.boolean().default(false), factsVerified: z.boolean().default(false),
    sourcesAttributed: z.boolean().default(false), naturalLanguage: z.boolean().default(false), affiliateDisclosure: z.boolean().default(false),
    headingStructure: z.boolean().default(false), imageAltText: z.boolean().default(false), internalLinksChecked: z.boolean().default(false),
    structuredDataMatches: z.boolean().default(false), notThinContent: z.boolean().default(false), datesAccurate: z.boolean().default(false),
  }),
  devices: z.array(z.enum(devices)).default([]),
  clients: z.array(z.enum(clients)).default([]),
  useCases: z.array(z.enum(useCases)).default([]),
  lineTypes: z.array(z.enum(lineTypes)).default([]),
};

const source = z.object({
  label: z.string(),
  publisher: z.string(),
  url: z.url(),
  sourceType: z.enum(['official', 'third-party-test', 'third-party-review', 'user-opinion']),
  publishedAt: z.coerce.date().optional(),
  collectedAt: z.coerce.date(),
  supports: z.array(z.string()).min(1),
  crossCheckedWith: z.array(z.url()).default([]),
  mayBeOutdated: z.boolean().default(false),
  notes: z.string().optional(),
});

const reviews = defineCollection({
  loader: glob({ base: './src/content/reviews', pattern: '**/*.{md,mdx}' }),
  schema: z.object({ ...shared, brandSlug, speedTestSlug: brandSlug, sources: z.array(source).default([]) }),
});

const speedTests = defineCollection({
  loader: glob({ base: './src/content/speed-tests', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    ...shared,
    brandSlug,
    reviewSlug: brandSlug,
    sources: z.array(source).min(1),
    testContext: z.object({
      device: z.string(), network: z.string(), client: z.string(), period: z.string(),
      originalScreenshot: z.string().optional(), screenshotEdited: z.boolean().default(false),
    }).optional(),
  }),
});

const articleSchema = z.object({ ...shared, category: z.string(), relatedBrands: z.array(brandSlug).default([]) });
const guides = defineCollection({ loader: glob({ base: './src/content/guides', pattern: '**/*.{md,mdx}' }), schema: articleSchema });
const knowledge = defineCollection({ loader: glob({ base: './src/content/knowledge', pattern: '**/*.{md,mdx}' }), schema: articleSchema });
const comparisons = defineCollection({
  loader: glob({ base: './src/content/comparisons', pattern: '**/*.{md,mdx}' }),
  schema: z.object({ ...shared, brandSlugs: z.tuple([brandSlug, brandSlug]).refine(([a, b]) => a !== b, '对比文章必须关联两个不同品牌'), sources: z.array(source).default([]) }),
});

export const collections = { reviews, speedTests, guides, knowledge, comparisons };
