import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const reviewDir = join(root, 'src/content/reviews');
let restored = 0;

const splitRow = (line) => line.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim());
const factualHeader = /(套餐|价格|流量|周期|有效期限)/;
const rejectHeader = /(适用|推荐|场景|亮点|特权|架构|保障|线路|延迟|解锁|折算|折合)/;

for (const name of readdirSync(reviewDir).filter((item) => item.endsWith('.md'))) {
  const old = execFileSync('git', ['show', `c8c121d^:src/content/reviews/${name}`], { cwd: root, encoding: 'utf8' });
  const blocks = [...old.matchAll(/(?:^\|.*\|\r?\n){3,}/gm)].map((match) => match[0].trim());
  const block = blocks.find((candidate) => {
    const header = splitRow(candidate.split(/\r?\n/)[0]);
    return header.some((cell) => /套餐/.test(cell)) && header.some((cell) => /价格/.test(cell));
  });
  if (!block) continue;

  const lines = block.split(/\r?\n/);
  const header = splitRow(lines[0]);
  const keep = header.map((cell, index) => factualHeader.test(cell) && !rejectHeader.test(cell) ? index : -1).filter((index) => index >= 0);
  if (keep.length < 2) continue;

  const rows = lines.slice(2).map(splitRow).filter((row) => row.length >= header.length);
  const clean = (value) => value
    .replace(/\*\*/g, '')
    .replace(/【[^】]*(?:推荐|首选|适合|影音|团队|大户|备用)[^】]*】/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const table = [
    `| ${keep.map((index) => clean(header[index])).join(' | ')} |`,
    `| ${keep.map(() => '---').join(' | ')} |`,
    ...rows.map((row) => `| ${keep.map((index) => clean(row[index])).join(' | ')} |`),
  ].join('\n');

  const path = join(reviewDir, name);
  let current = readFileSync(path, 'utf8');
  current = current.replace(/## 官网套餐资料（保留）[\s\S]*?(?=\n## )/, '');
  const marker = '## 需要你提供哪些资料';
  const section = `## 官网套餐资料（保留）\n\n以下套餐字段沿用清理前已经根据官网整理的记录，并按你的确认继续保留。这里只呈现套餐名称、价格、周期和流量等事实字段，不恢复旧版测速、线路效果或购买推荐。官网可能随时调整套餐，正式发布前仍需补充官网 URL、页面截图与采集日期。\n\n${table}\n\n`;
  current = current.replace(marker, `${section}${marker}`);
  writeFileSync(path, current);
  restored += 1;
}

console.log(`Restored factual plan tables for ${restored} reviews.`);
