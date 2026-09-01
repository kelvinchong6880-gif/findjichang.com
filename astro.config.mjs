import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import tailwindcss from '@tailwindcss/vite';
import rehypeLinkPolicy from './src/lib/rehype-link-policy.mjs';

export default defineConfig({
  site: 'https://www.findjichang.com',
  output: 'static',
  markdown: {
    processor: unified({ rehypePlugins: [rehypeLinkPolicy] }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
