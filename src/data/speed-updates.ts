// 首页“最新测速更新”板块的数据。数字取自站点管理者提供的测速截图，本站未独立复测。
// 速度单位沿用截图里的 MB；backend9g 为 true 的用 9Gbps 后端测，不能和 5Gbps 的直接比。
export const HOME_UPDATED = '2026-11-09';
export const HOME_UPDATED_LABEL = '2026 年 11 月 9 日';

export interface SpeedUpdate { slug: string; when: string; nodes: number; hk: string; note: string; backend9g?: boolean }

export const speedUpdates: SpeedUpdate[] = [
  { slug: 'sogo-yun', when: '8 月 11 日傍晚', nodes: 62, hk: '44–61MB', note: '日本、美国最快，香港延迟最低（14–23ms）' },
  { slug: 'weifeng', when: '7 月 19 日晚高峰', nodes: 50, hk: '469–546MB', note: '香港、新加坡很快，美国偏慢', backend9g: true },
  { slug: 'ermao', when: '8 月 11 日上午', nodes: 63, hk: '67–91MB', note: '五个主要地区都跑出速度，3 个小地区节点几乎不可用' },
  { slug: 'guangsu', when: '8 月 11 日下午', nodes: 54, hk: '54–75MB', note: '各地区速度平均，美国节点表现好' },
  { slug: 'xingdaomeng', when: '8 月 11 日凌晨', nodes: 55, hk: '55–70MB', note: '香港整齐，台湾、美国偏慢' },
  { slug: 'yifan', when: '8 月 11 日午夜', nodes: 55, hk: '43–92MB', note: '香港、美国较快，新加坡、日本部分节点偏慢' },
  { slug: 'quanqiu-cloud', when: '8 月 11 日下午', nodes: 63, hk: '73–91MB', note: '香港、台湾整齐，日本延迟偏高' },
  { slug: 'weitu-cloud', when: '8 月 11 日下午', nodes: 53, hk: '41–65MB', note: '主要地区 40–65MB，表现平稳' },
  { slug: 'lingmao', when: '8 月 11 日傍晚', nodes: 54, hk: '18–33MB', note: '香港延迟低但速度一般，新加坡较快' },
  { slug: 'jilian-cloud', when: '8 月 11 日晚高峰', nodes: 63, hk: '35–99MB', note: '香港专线快，日本、美国参差' },
  { slug: 'kuaili', when: '8 月 11 日晚高峰', nodes: 50, hk: '505–551MB', note: '香港很快，美国偏慢', backend9g: true },
  { slug: 'guangnian', when: '8 月 11 日下午', nodes: 63, hk: '43–96MB', note: '新加坡最稳，美国偏慢' },
  { slug: 'kexin-cloud', when: '日期不明', nodes: 55, hk: '29–53MB', note: '整体偏低，个别节点几乎不可用' },
];
