import { site } from '../config/site';

export const absoluteUrl = (path: string) => new URL(path, site.url).toString();

export const websiteSchema = () => ({ '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: site.url, inLanguage: 'zh-CN', description: site.description });
export const organizationSchema = () => ({ '@context': 'https://schema.org', '@type': 'Organization', name: site.name, url: site.url, description: site.description });
export const collectionSchema = (name: string, description: string, path: string) => ({ '@context': 'https://schema.org', '@type': 'CollectionPage', name, description, url: absoluteUrl(path), inLanguage: 'zh-CN' });

export interface ArticleSchemaInput { title: string; description: string; path: string; publishedAt: Date; updatedAt?: Date; image?: string }
export const articleSchema = (input: ArticleSchemaInput) => ({ '@context': 'https://schema.org', '@type': 'Article', headline: input.title, description: input.description, url: absoluteUrl(input.path), datePublished: input.publishedAt.toISOString(), dateModified: (input.updatedAt ?? input.publishedAt).toISOString(), inLanguage: 'zh-CN', publisher: { '@type': 'Organization', name: site.name, url: site.url }, ...(input.image ? { image: absoluteUrl(input.image) } : {}) });

export const itemListSchema = (name: string, items: { name: string; path: string }[]) => ({ '@context': 'https://schema.org', '@type': 'ItemList', name, itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, url: absoluteUrl(item.path) })) });
export const howToSchema = (name: string, description: string, steps: { name: string; text: string }[]) => ({ '@context': 'https://schema.org', '@type': 'HowTo', name, description, step: steps.map((step) => ({ '@type': 'HowToStep', name: step.name, text: step.text })) });
export const datasetSchema = (name: string, description: string, path: string, sourceUrls: string[]) => ({ '@context': 'https://schema.org', '@type': 'Dataset', name, description, url: absoluteUrl(path), isBasedOn: sourceUrls });

