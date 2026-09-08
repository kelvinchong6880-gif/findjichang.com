import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = join(__dirname, '..');

const tmpDir = join(root, 'tmp/qa-test');
const tmpBrandsFile = join(tmpDir, 'brands.ts');
const tmpOutDir = join(tmpDir, 'out');

// Read original
const originalBrands = readFileSync(join(root, 'src/data/brands.ts'), 'utf8');

function runTest(description, modificationFn, expectedFailure) {
  try {
    const newContent = modificationFn(originalBrands);
    writeFileSync(tmpBrandsFile, newContent);
    execSync('node scripts/validate-site.mjs', { 
      stdio: 'pipe',
      env: {
        ...process.env,
        TEST_BRANDS_PATH: tmpBrandsFile,
        TEST_OUT_PATH: tmpOutDir
      }
    });
    console.log(`❌ Failed: ${description} did not trigger an error.`);
  } catch (error) {
    const output = error.stdout?.toString() + error.stderr?.toString();
    if (output.includes(expectedFailure)) {
      console.log(`✅ Passed: ${description} correctly triggered "${expectedFailure}"`);
    } else {
      console.log(`❌ Failed: ${description} threw an error, but not the expected one. Expected: "${expectedFailure}".\nActual Output snippet: ${output.slice(0, 300)}`);
    }
  }
}

console.log("Running isolated negative tests (modifying temp data only)...\n");

// Setup isolated environment
rmSync(tmpDir, { recursive: true, force: true });
mkdirSync(tmpDir, { recursive: true });
mkdirSync(tmpOutDir, { recursive: true });

// 1. Duplicate slug
runTest("Duplicate slug", content => content.replace("['飞猫云', 'feimao-yun',", "['飞猫云', 'weifeng',"), "品牌代号存在重复");

// 2. Missing route
runTest("Missing route", content => content.replace("].map(", "  ['Fake', 'fake-brand', 'https://fake.com'],\n].map("), "品牌测评路由集合不匹配");

// 3. Incorrect order
runTest("Incorrect order", content => {
  const line1 = "  ['微风', 'weifeng', 'https://edp01.breezenetaff.com/#/?code=hM8APccJ'],";
  const line2 = "  ['极速cloud', 'jisu-cloud', 'https://kelvin.jsjc456789.com'],";
  return content.replace(line1, "TEMP").replace(line2, line1).replace("TEMP", line2);
}, "机场总对比包含遗漏、多余品牌或整体顺序错误");

console.log("\nCleaning up temp directory...");
rmSync(tmpDir, { recursive: true, force: true });
console.log("Done.");
