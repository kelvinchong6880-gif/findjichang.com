import { chromium } from '@playwright/test';
import fs from 'fs';

const pages = [
  { name: 'Home', url: 'http://127.0.0.1:4322/' },
  { name: 'BrandList', url: 'http://127.0.0.1:4322/jichang/' },
  { name: 'Compare', url: 'http://127.0.0.1:4322/compare/' },
  { name: 'Article', url: 'http://127.0.0.1:4322/guide/netflix-proxy-error-native-ip-guide/' }
];

const runs = 3;

async function measurePage(browser, url) {
  const page = await browser.newPage();
  
  // Setup LCP Observer
  await page.addInitScript(() => {
    window.lcpData = 0;
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      window.lcpData = lastEntry.startTime;
    }).observe({type: 'largest-contentful-paint', buffered: true});
  });

  await page.goto(url, { waitUntil: 'networkidle' });
  
  // Wait a bit for LCP to settle
  await page.waitForTimeout(500);

  const lcp = await page.evaluate(() => window.lcpData || 0);
  
  const fcp = await page.evaluate(() => {
    const paint = performance.getEntriesByType('paint').find(e => e.name === 'first-contentful-paint');
    return paint ? paint.startTime : 0;
  });

  await page.close();
  return { lcp, fcp };
}

const getMedian = (arr) => {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

async function run() {
  console.log('Starting Playwright Performance Measurement...');
  const browser = await chromium.launch({ headless: true });
  
  const results = {};

  for (const page of pages) {
    console.log(`\nTesting ${page.name} (${page.url})...`);
    const metrics = { lcp: [], fcp: [] };
    
    for (let i = 0; i < runs; i++) {
      console.log(`  Run ${i + 1}/${runs}...`);
      const res = await measurePage(browser, page.url);
      metrics.lcp.push(res.lcp);
      metrics.fcp.push(res.fcp);
    }

    results[page.name] = {
      lcp: (getMedian(metrics.lcp) / 1000).toFixed(3) + 's',
      fcp: (getMedian(metrics.fcp) / 1000).toFixed(3) + 's',
      raw: metrics
    };
    
    console.log(`  => Median LCP: ${results[page.name].lcp}, Median FCP: ${results[page.name].fcp}`);
  }

  await browser.close();
  
  fs.writeFileSync('performance-baseline.json', JSON.stringify(results, null, 2));
  console.log('\nBaseline collection complete. Saved to performance-baseline.json');
}

run().catch(console.error);
