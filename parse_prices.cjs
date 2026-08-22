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
    prices[slug] = '¥9.9/月起'; // Default fallback
  }
});

console.log(JSON.stringify(prices, null, 2));
