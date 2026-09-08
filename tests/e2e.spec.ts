import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'Mobile-Small', width: 360, height: 800 },
  { name: 'Mobile-Standard', width: 390, height: 844 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Desktop', width: 1440, height: 900 }
];

test.describe('Full Site E2E Tests', () => {
  for (const vp of viewports) {
    test.describe(`Viewport: ${vp.name}`, () => {
      test.use({ viewport: { width: vp.width, height: vp.height } });

      test('Responsive Layout & Mobile Menu', async ({ page }) => {
        await page.goto('http://127.0.0.1:4322/');
        
        // 1. Check Horizontal Overflow
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        const innerWidth = await page.evaluate(() => window.innerWidth);
        expect(scrollWidth).toBeLessThanOrEqual(innerWidth);

        // 2. Test Mobile Menu if applicable
        if (vp.width <= 768) {
          const menuBtn = page.locator('.menu-toggle, button[aria-label="Toggle menu"], #menu-btn').first();
          if (await menuBtn.count() > 0) {
            await menuBtn.click();
            const navMenu = page.locator('nav, .mobile-menu').first();
            await expect(navMenu).toBeVisible();
            // Close menu
            await menuBtn.click();
            await expect(navMenu).not.toBeVisible();
          }
        }
      });

      test('Brand List Filtering', async ({ page }) => {
        await page.goto('http://127.0.0.1:4322/jichang/');
        
        // Assume there is a filter button or input. We need to check if they exist first.
        const filterButtons = page.locator('.filter-btn, button[data-filter]');
        if (await filterButtons.count() > 0) {
          // Click a filter
          await filterButtons.nth(1).click();
          // Check that results updated
          const articles = page.locator('article');
          await expect(articles).not.toHaveCount(0); // Should have results
          
          // Test empty state
          // Need to find a combination that yields empty, this is app specific.
          // For now, check if clear filter works.
          const clearBtn = page.locator('.clear-filter, button:has-text("清除")');
          if (await clearBtn.count() > 0) {
            await clearBtn.click();
            const allArticles = page.locator('article');
            expect(await allArticles.count()).toBeGreaterThan(5);
          }
        }
      });

      test('Compare Page Table Scroll', async ({ page }) => {
        await page.goto('http://127.0.0.1:4322/compare/');
        
        // Page should not overflow horizontally
        const pageScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        const innerWidth = await page.evaluate(() => window.innerWidth);
        expect(pageScrollWidth).toBeLessThanOrEqual(innerWidth);
        
        // Table should be able to scroll inside its container
        const tableWrapper = page.locator('.table-container, .table-wrapper, figure table, .overflow-x-auto').first();
        if (await tableWrapper.count() > 0) {
           const wrapperWidth = await tableWrapper.evaluate(el => el.clientWidth);
           const tableWidth = await tableWrapper.evaluate(el => el.scrollWidth);
           if (vp.width < 1000) {
             expect(tableWidth).toBeGreaterThan(wrapperWidth);
           }
        }
      });

      test('TOC Navigation on Article Page', async ({ page }) => {
        await page.goto('http://127.0.0.1:4322/guide/netflix-proxy-error-native-ip-guide/');
        
        const tocLinks = page.locator('.toc a, aside a, nav.toc a');
        if (await tocLinks.count() > 0) {
          const firstLink = tocLinks.first();
          const href = await firstLink.getAttribute('href');
          if (href && href.startsWith('#')) {
            await firstLink.click();
            // Check if the URL hash is updated and element is visible in viewport
            expect(page.url()).toContain(href);
          }
        }
      });
    });
  }
});
