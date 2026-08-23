import { onRequestGet } from '../functions/go/[brand].ts';

const points = [];
const valid = await onRequestGet({
  request: new Request('https://findjichang.com/go/weifeng/?from=%2Fjichang%2Fweifeng%2F&placement=hero'),
  params: { brand: 'weifeng' }, env: { CLICK_EVENTS: { writeDataPoint: (point) => points.push(point) } },
});
const invalid = await onRequestGet({ request: new Request('https://findjichang.com/go/not-a-brand/'), params: { brand: 'not-a-brand' }, env: {} });

const failures = [];
if (valid.status !== 302) failures.push('合法品牌未返回 302');
if (valid.headers.get('location') !== 'https://edp01.breezenetaff.com/#/?code=hM8APccJ') failures.push('微风出口映射错误');
if (valid.headers.get('cache-control') !== 'no-store, private') failures.push('出口没有禁用缓存');
if (valid.headers.get('x-robots-tag') !== 'noindex, nofollow') failures.push('出口缺少搜索引擎屏蔽响应头');
if (valid.headers.get('referrer-policy') !== 'no-referrer') failures.push('出口没有屏蔽来源信息');
if (valid.headers.get('x-content-type-options') !== 'nosniff') failures.push('出口缺少 nosniff 响应头');
if (points.length !== 1 || points[0].indexes[0] !== 'weifeng' || points[0].blobs[1] !== 'hero') failures.push('匿名事件字段错误');
if (invalid.status !== 404) failures.push('非法品牌未返回 404');
console.log(JSON.stringify({ status: failures.length ? 'failed' : 'passed', failures, recordedFields: points[0] }, null, 2));
if (failures.length) process.exitCode = 1;
