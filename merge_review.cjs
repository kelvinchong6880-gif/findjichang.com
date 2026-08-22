const fs = require('fs');
const path = require('path');

const speedTestPath = path.join(process.cwd(), 'src', 'content', 'speed-tests', 'weifeng.md');
const deepReviewPath = path.join(process.cwd(), 'src', 'content', 'knowledge', 'weifeng-jichang-deep-review.md');

// Read both files
const speedTestContent = fs.readFileSync(speedTestPath, 'utf-8');
const deepReviewContent = fs.readFileSync(deepReviewPath, 'utf-8');

// Extract frontmatter from speed-test
const speedTestLines = speedTestContent.split('\n');
let frontmatterEndIndex = -1;
let inFrontmatter = false;
for (let i = 0; i < speedTestLines.length; i++) {
  if (speedTestLines[i].trim() === '---') {
    if (!inFrontmatter) {
      inFrontmatter = true;
    } else {
      frontmatterEndIndex = i;
      break;
    }
  }
}

const speedTestFrontmatter = speedTestLines.slice(0, frontmatterEndIndex + 1).join('\n');

// Extract body from deep-review
const deepReviewLines = deepReviewContent.split('\n');
let reviewFrontmatterEndIndex = -1;
inFrontmatter = false;
for (let i = 0; i < deepReviewLines.length; i++) {
  if (deepReviewLines[i].trim() === '---') {
    if (!inFrontmatter) {
      inFrontmatter = true;
    } else {
      reviewFrontmatterEndIndex = i;
      break;
    }
  }
}

const deepReviewBody = deepReviewLines.slice(reviewFrontmatterEndIndex + 1).join('\n');

// Update speedTest content
const newSpeedTestContent = speedTestFrontmatter + '\n' + deepReviewBody;
fs.writeFileSync(speedTestPath, newSpeedTestContent, 'utf-8');

// Delete the deep-review file as it's now merged
fs.unlinkSync(deepReviewPath);
console.log('Successfully merged deep review into speed test and deleted the original article.');
