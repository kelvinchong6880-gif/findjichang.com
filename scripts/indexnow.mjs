const key = process.env.INDEXNOW_KEY;
const keyLocation = process.env.INDEXNOW_KEY_LOCATION;
const urls = process.argv.slice(2);

if (!key || !keyLocation) throw new Error('缺少 INDEXNOW_KEY 或 INDEXNOW_KEY_LOCATION');
if (urls.length === 0) throw new Error('请提供至少一个实际发生新增、更新或删除的 URL');
if (urls.some((url) => new URL(url).hostname !== 'www.findjichang.com')) throw new Error('只允许提交 www.findjichang.com 的 URL');

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: 'www.findjichang.com', key, keyLocation, urlList: urls }),
});
if (!response.ok) throw new Error(`IndexNow 提交失败：${response.status}`);
console.log(`IndexNow 已接收 ${urls.length} 个变更网址。`);

