const clean = (value: string) => value.replace(/\s+/g, ' ').trim();

export const keywordSet = ({ title, supplied = [], brand, type }: { title: string; supplied?: string[]; brand?: string; type: 'guide' | 'knowledge' | 'review' | 'speed-test' | 'comparison' }) => {
  const topic = clean(title.replace(/20\d{2}/g, '').replace(/[：｜|？?（）()]/g, ' '));
  const core = brand ? `${brand}机场` : topic.slice(0, 28);
  const variants = {
    guide: [`${topic}教程`, `${topic}怎么设置`, `${topic}常见问题`],
    knowledge: [topic, `${topic}是什么意思`, `${topic}怎么判断`],
    review: [`${brand}机场评测`, `${brand}机场怎么样`, `${brand}机场值得买吗`],
    'speed-test': [`${brand}机场测速`, `${brand}机场速度怎么样`, `${brand}机场晚高峰`],
    comparison: [`${topic}对比`, `${topic}怎么选`, `${topic}区别`],
  }[type];
  return [...new Set([core, ...supplied, ...variants].map(clean).filter(Boolean))].slice(0, 14);
};
