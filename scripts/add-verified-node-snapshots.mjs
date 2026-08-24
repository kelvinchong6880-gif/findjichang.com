import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));

const snapshots = {
  weifeng: {
    name: '微风', collected: '2026-08-24 14:27（Asia/Kuala_Lumpur）', total: 62, online: 62,
    protocol: '用户提供资料未显示协议',
    rows: [
      ['香港', '香港 01–15', '15', '15', '1x', '常规节点'],
      ['台湾', '台湾 01–05', '5', '5', '1x', '常规节点'],
      ['新加坡', '新加坡 01–10', '10', '10', '1x', '常规节点'],
      ['日本', '日本 01–10', '10', '10', '1x', '常规节点'],
      ['美国', '美国 01–10', '10', '10', '1x', '常规节点'],
      ['德国', '德国 01–04-直连', '4', '4', '1x', '后台名称含“直连”'],
      ['美国', '美国 01–04-直连', '4', '4', '1x', '后台名称含“直连”'],
      ['日本', '日本 01–04-直连', '4', '4', '1x', '后台名称含“直连”'],
    ],
    notes: '编号 1–62 连续；“直连”仅是后台节点名称，不据此证明实际路由。',
  },
  'feimao-yun': {
    name: '飞猫云', collected: '2026-08-24 14:09–14:28（Asia/Kuala_Lumpur）', total: 71, online: 68,
    protocol: 'VLESS',
    rows: [
      ['香港', 'ss-HK-香港BGP-IEPL01–20', '19', '19', '1x', '缺 ID 7'],
      ['台湾', 'ss-TW-T台湾BGP-IEPL01–05', '5', '5', '1x', '后台原文'],
      ['日本', 'ss-JP-日本BGP-IEPL01–10', '10', '10', '1x', '后台原文'],
      ['新加坡', 'ss-SG-新加坡BGP-IEPL01–10', '10', '10', '1x', '后台原文'],
      ['美国', 'ss-US-美国BGP-IEPL01–10', '10', '10', '1x', '后台原文'],
      ['德国', '直连-DE-德国BGP01–04', '4', '1', '1x', 'ID 56、57、59 离线；ID 58 在线'],
      ['土耳其', 'ss-TR-土耳其BGP-IEPL01', '1', '1', '1x', '后台原文'],
      ['菲律宾', 'ss-FLB-菲律宾BGP-IEPL01', '1', '1', '1x', '后台原文'],
      ['越南', 'ss-VN-越南BGP-养号/低价区', '1', '1', '1x', '用途文字为后台原文'],
      ['交叉标注', '直连-JP-美国BGP01–04', '4', '4', '1x', '国家代码与中文地区不一致'],
      ['交叉标注', '直连-US-日本BGP01–04', '4', '4', '1x', '国家代码与中文地区不一致'],
      ['备用', '防失联-日本备用、德国备用', '2', '2', '1x', '后台原文'],
    ],
    notes: '共收到 71 条记录，编号范围 1–75，缺 ID 7、60、68、73。IEPL、BGP、直连均只按节点名称转录；未通过路由测试确认。',
  },
  firefly: {
    name: 'Firefly', collected: '2026-08-24 14:09:57–14:10:55（Asia/Kuala_Lumpur）', total: 50, online: 50,
    protocol: '用户提供资料未显示协议',
    rows: commonRows('【香港】', '【台湾】', '【新加坡】', '【日本】', '【美国】'),
    notes: '编号 1–50 连续；本快照只能证明后台在该时刻显示在线。',
  },
  'kuajie-yun': {
    name: '跨界云', collected: '2026-08-24 14:20:52–14:21:52（Asia/Kuala_Lumpur）', total: 50, online: 49,
    protocol: 'VLESS',
    rows: commonRows('香港HK', '台湾TWN', '新加坡SG', '日本JPN', '美国US', { usOnline: 9 }),
    notes: '美国 US09（ID 49）显示离线，时间字段为 1970-01-01，属于明显异常值；不把该时间解释为实际离线时长。',
  },
  shanyue: {
    name: '闪跃', collected: '2026-08-24 14:23:21–14:24:16（Asia/Kuala_Lumpur）', total: 50, online: 50,
    protocol: '用户提供资料未显示协议',
    rows: commonRows('香港 | Hong Kong', '台湾 | Taiwan', '新加坡 | Singapore', '日本 | Japan', '美国 | United States'),
    notes: '编号 1–50 连续；节点在线状态尚未转换成速度或稳定性结论。',
  },
  wuyou: {
    name: '无忧', collected: '2026-08-24 14:24:57–14:25:55（Asia/Kuala_Lumpur）', total: 50, online: 50,
    protocol: '用户提供资料未显示协议',
    rows: commonRows('香港HKG - ', '台湾TPE - ', '新加坡SIN - ', '日本TYO - ', '美国LAX - '),
    notes: '编号 1–50 连续；HKG、TPE、SIN、TYO、LAX 为后台节点名称中的地区代码。',
  },
  lingmao: {
    name: '灵猫', collected: '2026-08-24 14:26:04–14:27:03（Asia/Kuala_Lumpur）', total: 50, online: 50,
    protocol: 'VLESS',
    rows: commonRows('香港 Cloud - ', '台湾 Cloud - ', '新加坡 Cloud - ', '日本 Cloud - ', '美国 Cloud - '),
    notes: '编号 1–50 连续；“Cloud”只按后台命名记录，不推断服务器所有权或线路质量。',
  },
};

function commonRows(hk, tw, sg, jp, us, options = {}) {
  return [
    ['香港', `${hk}01–15`, '15', '15', '1x', '后台原文范围'],
    ['台湾', `${tw}01–05`, '5', '5', '1x', '后台原文范围'],
    ['新加坡', `${sg}01–10`, '10', '10', '1x', '后台原文范围'],
    ['日本', `${jp}01–10`, '10', '10', '1x', '后台原文范围'],
    ['美国', `${us}01–10`, '10', String(options.usOnline ?? 10), '1x', options.usOnline === 9 ? 'US09 离线' : '后台原文范围'],
  ];
}

const section = (snapshot) => `## 已核验的节点后台快照

以下内容来自站点管理者登录 ${snapshot.name} 后台后提供的节点列表，采集时间为 **${snapshot.collected}**。它属于一次后台状态快照，不是独立测速，也不能证明节点在其他时间、网络或地区仍然在线。

本次共收到 **${snapshot.total} 条节点记录**，其中后台显示在线 **${snapshot.online} 条**、离线 **${snapshot.total - snapshot.online} 条**；倍率均为 **1x**。协议字段：${snapshot.protocol}。

| 地区或类别 | 后台节点名称范围 | 记录数 | 当时在线 | 倍率 | 说明 |
| --- | --- | ---: | ---: | ---: | --- |
${snapshot.rows.map((row) => `| ${row.join(' | ')} |`).join('\n')}

> 核验边界：${snapshot.notes} 节点名称中的 BGP、IEPL、直连、Cloud 等词均视为运营方标签，除非后续有路由记录或其他证据，否则不升级为编辑部事实判断。

`;

for (const [slug, snapshot] of Object.entries(snapshots)) {
  for (const type of ['reviews', 'speed-tests']) {
    const path = join(root, 'src/content', type, `${slug}.md`);
    let content = readFileSync(path, 'utf8');
    content = content.replace(/## 已核验的节点后台快照[\s\S]*?(?=\n## )/, '');
    const marker = type === 'reviews' ? '## 后续怎样完成真实评测' : '## 统一测试环境';
    if (!content.includes(marker)) throw new Error(`Marker not found: ${path}`);
    content = content.replace(marker, `${section(snapshot)}${marker}`);
    writeFileSync(path, content);
  }
}

console.log(`Added verified snapshots for ${Object.keys(snapshots).length} brands.`);
