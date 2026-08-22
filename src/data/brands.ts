export interface Brand {
  name: string;
  slug: string;
  rank: number;
  affiliateUrl: string;
  affiliateLinkStatus: 'unchecked' | 'active' | 'broken';
  affiliateLinkCheckedAt: string | null;
  avatar?: string;
}

export const brands: Brand[] = [
  ['微风', 'weifeng', 'https://edp01.breezenetaff.com/#/?code=hM8APccJ'],
  ['SOGO云', 'sogo-yun', 'https://wzjc.sogoyunaff.cc/#/?code=BC2BL855'],
  ['飞猫云', 'feimao-yun', 'https://flycat1.flycatvipaff.cc/#/?code=w5lO9fqB'],
  ['暮光', 'muguang', 'https://varnexa.twilightaff.com/#/?code=2ILQOoYB'],
  ['Firefly', 'firefly', 'https://vip02.fireflyaff.com/#/?code=8nDg6OEY'],
  ['跨界云', 'kuajie-yun', 'https://vip02.kuajieaff.com/#/?code=hh3QezsW'],
  ['闪跃', 'shanyue', 'https://wep01.flashleapaff.com/#/?code=cs0ekCMG'],
  ['无忧', 'wuyou', 'https://wep01.worryfreeaff.com/#/?code=s1kH64A8'],
  ['灵猫', 'lingmao', 'https://edp01.civetaff.com/#/?code=CYg7QSJo'],
  ['星岛梦', 'xingdaomeng', 'https://kfccbb.xingdaomeng.com/#/?code=0YcwWgSw'],
  ['唯兔云', 'weitu-cloud', 'https://fast.v2yunvipaff.com/#/?code=nbBJVFQP'],
  ['光速云', 'guangsu', 'https://mdlky.gsyaff.com/#/?code=5PLKd4WN'],
  ['U1S1', 'u1s1', 'https://pkdj7.vipaff.cc/#/?code=YUCKdFlR'],
  ['极连云', 'jilian-cloud', 'https://kdjhao.jlyvipaff.com/#/?code=3d87WSjS'],
  ['全球云', 'quanqiu-cloud', 'https://sswdh.gcvipaff.com/#/?code=SHjBKSgm'],
  ['光年梯', 'guangnian', 'https://ggmq.gntaff.com/#/?code=hTN6UF4T'],
  ['一翻云', 'yifan', 'https://wzjc.1flyunaff.cc/#/?code=0tH3Mmch'],
  ['二猫云', 'ermao', 'https://wzjc.2maoyunaff.cc/#/?code=bvsFDmSt'],
].map(([name, slug, affiliateUrl], index) => ({ name, slug, affiliateUrl, rank: index + 1, affiliateLinkStatus: 'unchecked' as const, affiliateLinkCheckedAt: null, avatar: ['weifeng', 'sogo-yun', 'feimao-yun', 'muguang', 'firefly', 'kuajie-yun', 'shanyue'].includes(slug) ? `/images/brands/${slug}${slug === 'shanyue' ? '.jpg' : '.png'}` : undefined }));

export const getBrand = (slug: string) => brands.find((brand) => brand.slug === slug);
