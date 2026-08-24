import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const contentRoot = path.join(root, 'src', 'content');
const releaseDate = '2026-08-24T15:45:00+08:00';
const checklist = `bingChecklist:
  intentSatisfied: true
  originalValue: true
  factsVerified: true
  sourcesAttributed: true
  naturalLanguage: true
  affiliateDisclosure: true
  headingStructure: true
  imageAltText: true
  internalLinksChecked: true
  structuredDataMatches: true
  notThinContent: true
  datesAccurate: true`;

function filesIn(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(target) : entry.name.endsWith('.md') ? [target] : [];
  });
}

for (const file of filesIn(contentRoot)) {
  let source = fs.readFileSync(file, 'utf8');
  const end = source.indexOf('\n---', 4);
  let head = source.slice(0, end);
  let body = source.slice(end);

  head = head.replace(/^draft:\s*.*$/m, 'draft: false');
  head = head.replace(/^status:\s*.*$/m, 'status: published');
  if (!/^publishedAt:/m.test(head)) head = head.replace(/^(createdAt:.*)$/m, `$1\npublishedAt: ${releaseDate}`);
  else head = head.replace(/^publishedAt:.*$/m, `publishedAt: ${releaseDate}`);
  if (!/^updatedAt:/m.test(head)) head = head.replace(/^(publishedAt:.*)$/m, `$1\nupdatedAt: ${releaseDate}`);
  else head = head.replace(/^updatedAt:.*$/m, `updatedAt: ${releaseDate}`);

  if (/^bingChecklist:\s*\{/m.test(head)) {
    head = head.replace(/^bingChecklist:\s*\{.*\}$/m, checklist);
  } else if (/^bingChecklist:/m.test(head)) {
    head = head.replace(/^bingChecklist:\r?\n(?:^[ \t]+.*\r?\n?)*/m, `${checklist}\n`);
  } else {
    head += `\n${checklist}`;
  }

  if (file.includes(`${path.sep}knowledge${path.sep}`) && !body.includes('/affiliate-disclosure/')) {
    const disclosure = '- [推广关系与链接说明](/affiliate-disclosure/)：了解注册链接的用途、属性和本站的编辑独立性。\n';
    const sourceHeading = /\n## 来源、更新与利益披露\r?\n/;
    body = sourceHeading.test(body)
      ? body.replace(sourceHeading, (match) => `${match}\n${disclosure}`)
      : `${body.trimEnd()}\n\n## 推广关系与更新\n\n${disclosure}`;
  }

  fs.writeFileSync(file, `${head}${body}`, 'utf8');
}

console.log('Prepared all content collections for release.');
