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

      test('Mobile Menu Interaction & Keyboard Focus', async ({ page }) => {
        await page.goto('http://127.0.0.1:4322/');
        
        // Horizontal overflow check
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        const innerWidth = await page.evaluate(() => window.innerWidth);
        expect(scrollWidth).toBeLessThanOrEqual(innerWidth);

        if (vp.width <= 768) {
          const menuSummary = page.locator('details.mobile-menu summary');
          const navMenu = page.locator('details.mobile-menu nav');
          
          if (await menuSummary.count() > 0) {
            // Test click toggle
            await menuSummary.click();
            await expect(navMenu).toBeVisible();
            await menuSummary.click();
            await expect(navMenu).not.toBeVisible();
            
            // Test keyboard focus and enter
            await menuSummary.focus();
            await page.keyboard.press('Enter');
            await expect(navMenu).toBeVisible();
          }
        }
      });

      test('Brand List Filtering, Empty State & Clear', async ({ page }) => {
        await page.goto('http://127.0.0.1:4322/jichang/');
        
        const searchInput = page.locator('#brandSearch');
        if (await searchInput.count() > 0) {
          // Combined conditions
          await searchInput.fill('微风');
          await page.locator('#budgetFilter').selectOption('under10');
          // Should have at least one or zero, but no errors
          const articles = page.locator('.brand-card:visible');
          
          // Test empty state
          await searchInput.fill('NOT_EXISTING_BRAND_123');
          await expect(articles).toHaveCount(0);
          
          const emptyState = page.locator('.filter-empty-state:visible');
          await expect(emptyState).toBeVisible();
          
          // Test clear
          const clearBtn = page.locator('.clear-filters-btn');
          await clearBtn.click();
          await expect(emptyState).not.toBeVisible();
          await expect(searchInput).toHaveValue('');
        }
      });

      test('Compare Page Table Horizontal Scroll', async ({ page }) => {
        await page.goto('http://127.0.0.1:4322/compare/');
        
        const pageScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        const innerWidth = await page.evaluate(() => window.innerWidth);
        expect(pageScrollWidth).toBeLessThanOrEqual(innerWidth); // Whole page must not overflow
        
        const tableWrapper = page.locator('.overflow-x-auto').first();
        if (await tableWrapper.count() > 0) {
           const wrapperWidth = await tableWrapper.evaluate(el => el.clientWidth);
           const tableWidth = await tableWrapper.evaluate(el => el.scrollWidth);
           if (vp.width < 1000) {
             // Table must be able to scroll internally if screen is small
             expect(tableWidth).toBeGreaterThan(wrapperWidth);
           }
        }
      });

      test('TOC Navigation on Article Page', async ({ page }) => {
        await page.goto('http://127.0.0.1:4322/guide/netflix-proxy-error-native-ip-tutorial/');
        
        const tocLinks = page.locator('.toc a, aside a, nav.toc a');
        if (await tocLinks.count() > 0) {
          const firstLink = tocLinks.first();
          const href = await firstLink.getAttribute('href');
          if (href && href.startsWith('#')) {
            await firstLink.click();
            // Check if the URL hash is updated
            expect(decodeURIComponent(page.url())).toContain(href);
          }
        }
      });

      test('Affiliate Button Targets', async ({ page }) => {
        await page.goto('http://127.0.0.1:4322/jichang/');
        const affiliateBtn = page.locator('a[href^="/go/"]').first();
        if (await affiliateBtn.count() > 0) {
          const href = await affiliateBtn.getAttribute('href');
          expect(href).toContain('from=');
          expect(href).toContain('placement=');
        }
      });
    });
  }
});
