export interface Brand {
  name: string;
  slug: string;
  rank: number;
  affiliateUrl: string;
  affiliateLinkStatus: 'unchecked' | 'active' | 'broken';
  affiliateLinkCheckedAt: string | null;
  avatar?: string;
  minPrice?: string;
  pricePerMonth?: number;
  billingCycles?: string[];
}

export const brands: Brand[] = [
  ['微风', 'weifeng', 'https://edp01.breezenetaff.com/#/?code=hM8APccJ'],
  ['飞猫云', 'feimao-yun', 'https://flycat1.flycatvipaff.cc/#/?code=w5lO9fqB'],
  ['Firefly', 'firefly', 'https://vip02.fireflyaff.com/#/?code=8nDg6OEY'],
  ['无忧', 'wuyou', 'https://wep01.worryfreeaff.com/#/?code=s1kH64A8'],
  ['跨界云', 'kuajie-yun', 'https://vip02.kuajieaff.com/#/?code=hh3QezsW'],
  ['灵猫', 'lingmao', 'https://edp01.civetaff.com/#/?code=CYg7QSJo'],
  ['闪跃', 'shanyue', 'https://wep01.flashleapaff.com/#/?code=cs0ekCMG'],
  ['极连云', 'jilian-cloud', 'https://reuire23oure.jilianat.homes/#/?code=b2OTDcAo'],
  ['U1S1', 'u1s1', 'https://pkdj7.vipaff.cc/#/?code=YUCKdFlR'],
  ['飞V', 'flyv', 'https://varnexa.flyvaff.com/#/?code=XsiIuDgj'],
  ['Flybit', 'flybit', 'https://1.flybit.network/#/register?code=Aga7bd1s'],
  ['xsus', 'xsus', 'https://xsus.cloud/register?code=QQh1M1i9'],
  ['快狸', 'kuaili', 'https://work.kuailicloud.cc/#/?code=azB6yNBW'],
  ['山水云', 'shanshui-cloud', 'https://sldm1.ssyylf.com/#/register?code=Rh44jFWe'],
  ['SOGO云', 'sogo-yun', 'https://wzjc.sogoyunaff.cc/#/?code=BC2BL855'],
  ['宇宙云', 'yuzhou-cloud', 'https://wzjc.yuzoucloud.cc/#/?code=IWowgER5'],
  ['灵动', 'lingdong-cloud', 'https://varnexa.lingdongaff.com/#/?code=HDiWuF7L'],
  ['老猫云', 'laomao-cloud', 'https://222.22laomao.com/#/register?code=jcPU1grl'],
  ['二猫云', 'ermao', 'https://wzjc.2maoyunaff.cc/#/?code=bvsFDmSt'],
  ['速界', 'sujie', 'https://work.speedworldaff.cc/#/?code=wZYGdnTC'],
  ['网际快车', 'flashget-cloud', 'https://NGYHGO.快车.com'],
  ['xxyun', 'xxyun', 'https://www.xx-yun.com/?code=pi9fB906'],
  ['一翻云', 'yifan', 'https://wzjc.1flyunaff.cc/#/?code=0tH3Mmch'],
  ['边缘节点', 'edgenova', 'https://work.edgenovaaff.cc/#/?code=k7VCKPvN'],
  ['星岛梦', 'xingdaomeng', 'https://kfccbb.xingdaomeng.com/#/?code=0YcwWgSw'],
  ['气泡云', 'qipao-cloud', 'https://x1.qipaoyun.xyz/#/register?code=UtKCpyVa'],
  ['全球云', 'quanqiu-cloud', 'https://sswdh.gcvipaff.com/#/?code=SHjBKSgm'],
  ['光速云', 'guangsu', 'https://mdlky.gsyaff.com/#/?code=5PLKd4WN'],
  ['隐形人', 'invisible-man', 'https://varnexa.invisibleaff.com/#/?code=BtPRayAl'],
  ['唯兔云', 'weitu-cloud', 'https://fast.v2yunvipaff.com/#/?code=nbBJVFQP'],
  ['暮光', 'muguang', 'https://varnexa.twilightaff.com/#/?code=2ILQOoYB'],
  ['光年梯', 'guangnian', 'https://vv3dbvb.guangnianertt1.homes/#/?code=mv41lVsv'],
  ['可信云', 'kexin-cloud', 'https://work.kosingaff.com/#/?code=k7T1sOyG'],
  ['九云', 'jiuyun', 'https://888.jiuyundl.com/#/register?code=INW5fS7Q'],
  ['梯子云', 'tizi-cloud', 'https://varnexa.ladderaff.com/#/?code=zUCoDtv6'],
  ['浪网', 'langwang-cloud', 'https://varnexa.wavenetaff.com/#/?code=9U2hOtDu'],
  ['极速cloud', 'jisu-cloud', 'https://kelvin.jsjc456789.com'],
  ['大哥云', 'dageyun', 'https://a03.dgy02.com/#/register?code=wojBN2a4'],

].map(([name, slug, affiliateUrl], index) => {
  const minPrices: Record<string, string> = {
    "dageyun": "¥7.33/月起",
    "edgenova": "¥9.9/月起",
    "ermao": "¥7.4/月起",
    "feimao-yun": "¥7/月起",
    "firefly": "¥8/月起",
    "flashget-cloud": "¥28/月起",
    "flybit": "¥12.3/月起",
    "flyv": "¥25/月起",
    "guangnian": "¥7.4/月起",
    "guangsu": "¥23/月起",
    "invisible-man": "¥24/月起",
    "jilian-cloud": "¥8/月起",
    "jisu-cloud": "¥8.9/月起",
    "jiuyun": "¥6/月起",
    "kexin-cloud": "¥15/月起",
    "kuaili": "¥15/月起",
    "kuajie-yun": "¥8/月起",
    "langwang-cloud": "¥30/月起",
    "laomao-cloud": "¥15/月起",
    "lingdong-cloud": "¥20/月起",
    "lingmao": "¥7/月起",
    "muguang": "¥9/月起",
    "qipao-cloud": "¥9.9/月起",
    "quanqiu-cloud": "¥8.25/月起",
    "shanshui-cloud": "¥7.3/月起",
    "shanyue": "¥8/月起",
    "sogo-yun": "¥8.1/月起",
    "sujie": "¥25/月起",
    "tizi-cloud": "¥25/月起",
    "u1s1": "¥8/月起",
    "weifeng": "¥11.4/月起",
    "weitu-cloud": "¥6.6/月起",
    "wuyou": "¥6.5/月起",
    "xingdaomeng": "¥8/月起",
    "xsus": "¥12/月起",
    "xxyun": "¥9.99/月起",
    "yifan": "¥8.1/月起",
    "yuzhou-cloud": "¥25/月起"
};
  const minPriceStr = minPrices[slug];
  const priceMatch = minPriceStr ? minPriceStr.match(/[\d\.]+/) : null;
  const pricePerMonth = priceMatch ? parseFloat(priceMatch[0]) : 999;
  
  // Default billing cycles (mock data for now, user will update later)
  const billingCycles = pricePerMonth < 15 ? ['month', 'quarter', 'year'] : ['month', 'year'];

  return { 
    name, 
    slug, 
    affiliateUrl, 
    rank: index + 1, 
    affiliateLinkStatus: 'unchecked' as const, 
    affiliateLinkCheckedAt: null, 
    minPrice: minPriceStr || '待核验',
    pricePerMonth,
    billingCycles,
    avatar: ['weifeng', 'jiuyun', 'sogo-yun', 'feimao-yun', 'muguang', 'firefly', 'kuajie-yun', 'shanyue', 'wuyou', 'lingmao', 'xingdaomeng', 'weitu-cloud', 'guangsu', 'u1s1', 'jilian-cloud', 'quanqiu-cloud', 'guangnian', 'yifan', 'ermao', 'yuzhou-cloud', 'edgenova', 'kexin-cloud', 'sujie', 'kuaili', 'flyv', 'tizi-cloud', 'langwang-cloud', 'lingdong-cloud', 'invisible-man', 'flybit', 'xsus', 'xxyun', 'dageyun', 'flashget-cloud', 'shanshui-cloud', 'laomao-cloud', 'qipao-cloud', 'jisu-cloud'].includes(slug) ? `/images/brands/${slug}${['shanyue', 'wuyou', 'edgenova', 'invisible-man', 'jiuyun'].includes(slug) ? '.jpg' : '.png'}` : undefined 
  };
});

export const getBrand = (slug: string) => brands.find((brand) => brand.slug === slug);
