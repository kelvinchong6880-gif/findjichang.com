const fs = require('fs');
const path = require('path');

const reviewsDir = path.join(process.cwd(), 'src', 'content', 'reviews');
let files = [];
try {
  files = fs.readdirSync(reviewsDir).filter(f => f.endsWith('.md'));
} catch (e) {
  console.error(e);
}

const prices = {};

files.forEach(f => {
  const content = fs.readFileSync(path.join(reviewsDir, f), 'utf-8');
  const regex = /¥([0-9.]+)\s*\/\s*月/g;
  let match;
  let minPrice = Infinity;
  while ((match = regex.exec(content)) !== null) {
    const price = parseFloat(match[1]);
    if (price < minPrice) minPrice = price;
  }
  
  const slug = f.replace('.md', '');
  if (minPrice !== Infinity) {
    prices[slug] = `¥${minPrice}/月起`;
  } else {
    const tableRegex = /\|.*?¥([0-9.]+)\s*\/\s*(月|年|季度|半年|一次性|永久)/g;
    let minPrice2 = Infinity;
    let match2;
    while ((match2 = tableRegex.exec(content)) !== null) {
      let price = parseFloat(match2[1]);
      let period = match2[2];
      if (period === '年') price = price / 12;
      if (period === '半年') price = price / 6;
      if (period === '季度') price = price / 3;
      if (period !== '一次性' && period !== '永久') {
        if (price < minPrice2) minPrice2 = price;
      }
    }
    if (minPrice2 !== Infinity) {
      let val = minPrice2;
      prices[slug] = `¥${val % 1 === 0 ? val : val.toFixed(1).replace(/\.0$/, '')}/月起`;
    } else {
      prices[slug] = '¥9.9/月起'; // fallback
    }
  }
});

const brandsFile = path.join(process.cwd(), 'src', 'data', 'brands.ts');
let brandsContent = fs.readFileSync(brandsFile, 'utf-8');

if (!brandsContent.includes('minPrice?: string;')) {
  brandsContent = brandsContent.replace('avatar?: string;', 'avatar?: string;\n  minPrice?: string;');
}

const mapRegex = /\.map\(\(\[name,\s*slug,\s*affiliateUrl\],\s*index\)\s*=>\s*\(\{\s*name,\s*slug,\s*affiliateUrl,\s*rank:\s*index\s*\+\s*1,\s*affiliateLinkStatus:\s*'unchecked'\s*as\s*const,\s*affiliateLinkCheckedAt:\s*null,\s*avatar:/;

// we can just inject minPrice into the mapping function
// Instead of messing with the regex, we can just replace the whole map block
const newMapBlock = `].map(([name, slug, affiliateUrl], index) => {
  const minPrices: Record<string, string> = ${JSON.stringify(prices, null, 4)};
  return { 
    name, 
    slug, 
    affiliateUrl, 
    rank: index + 1, 
    affiliateLinkStatus: 'unchecked' as const, 
    affiliateLinkCheckedAt: null, 
    minPrice: minPrices[slug] || '待核验',
    avatar: ['weifeng', 'sogo-yun', 'feimao-yun', 'muguang', 'firefly', 'kuajie-yun', 'shanyue', 'wuyou', 'lingmao', 'xingdaomeng', 'weitu-cloud', 'guangsu', 'u1s1', 'jilian-cloud', 'quanqiu-cloud', 'guangnian', 'yifan', 'ermao', 'yuzhou-cloud', 'edgenova', 'kexin-cloud', 'sujie', 'kuaili', 'flyv', 'tizi-cloud', 'langwang-cloud', 'lingdong-cloud', 'invisible-man', 'flybit', 'xsus', 'xxyun', 'dageyun', 'flashget-cloud', 'shanshui-cloud', 'laomao-cloud', 'qipao-cloud'].includes(slug) ? \`/images/brands/\${slug}\${['shanyue', 'wuyou', 'edgenova', 'invisible-man'].includes(slug) ? '.jpg' : '.png'}\` : undefined 
  };
});`;

brandsContent = brandsContent.replace(/\].map\(\(\[name, slug, affiliateUrl\], index\) => \(\{(.|\n)*\}\)\);/m, newMapBlock);

fs.writeFileSync(brandsFile, brandsContent, 'utf-8');
console.log('brands.ts updated');
