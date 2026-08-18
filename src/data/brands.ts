export interface Brand {
  name: string;
  slug: string;
  rank: number;
  affiliateUrl: string;
  affiliateLinkStatus: 'unchecked' | 'active' | 'broken';
  affiliateLinkCheckedAt: string | null;
}

export const brands: Brand[] = [
  ['微风', 'weifeng', 'https://edp01.breezenetaff.com/#/?code=hM8APccJ'],
  ['Sogo云', 'sogo-yun', 'https://afasfw.sogotztz2.sbs/#/?code=BC2BL855'],
  ['飞猫云', 'feimao-yun', 'https://m1cfjgcx.feimaogfttt1.xyz/#/?code=w5lO9fqB'],
  ['暮光', 'muguang', 'https://asfawsf.twilightttt.sbs/#/?code=2ILQOoYB'],
  ['无忧', 'wuyou', 'https://wep01.worryfreeaff.com/#/?code=s1kH64A8'],
  ['跨界云', 'kuajie-yun', 'https://vip02.kuajieaff.com/#/?code=hh3QezsW'],
  ['闪跃', 'shanyue', 'https://wep01.flashleapaff.com/#/?code=cs0ekCMG'],
  ['灵猫', 'lingmao', 'https://edp01.civetaff.com/#/?code=CYg7QSJo'],
  ['Firefly', 'firefly', 'https://vip02.fireflyaff.com/#/?code=8nDg6OEY'],
  ['Flybit', 'flybit', 'https://1.flybit.network/#/register?code=Aga7bd1s'],
  ['XSUS', 'xsus', 'https://xsus.cloud/register?code=QQh1M1i9'],
  ['XX云', 'xx-yun', 'https://www.xx-yun.com/?code=pi9fB906'],
  ['大哥云', 'dage-yun', 'https://a03.dgy02.com/#/register?code=wojBN2a4'],
  ['网际快车', 'wangji-kuaiche', 'https://NGYHGO.快车.com'],
  ['山水云', 'shanshui-yun', 'https://ss2.byvvcsx.com/#/register?code=Rh44jFWe'],
  ['老猫云', 'laomao-yun', 'https://222.22laomao.com/#/register?code=jcPU1grl'],
  ['气泡云', 'qipao-yun', 'https://x1.qipaoyun.xyz/#/register?code=UtKCpyVa'],
  ['星岛梦', 'xingdaomeng', 'https://dddsljsf.xdmttt4.lol/#/?code=0YcwWgSw'],
  ['唯兔云', 'weitu-yun', 'https://auifd.v2saat.club/#/?code=nbBJVFQP'],
  ['光速云', 'guangsu-yun', 'https://hdeuje.guangsut.sbs/#/?code=5PLKd4WN'],
  ['U1S1', 'u1s1', 'https://uisefgr.u1sat.my/#/?code=YUCKdFlR'],
  ['极连云', 'jilian-yun', 'https://bhjsehj3u.jilianat.homes/#/?code=3d87WSjS'],
  ['全球云', 'quanqiu-yun', 'https://n9nwg.quanqiugttt1.sbs/#/?code=SHjBKSgm'],
  ['光年梯', 'guangnian-ti', 'https://vv3dbvb.guangnianertt1.homes/#/?code=hTN6UF4T'],
  ['一翻云', 'yifan-yun', 'https://czd4dcg.1fyohnzt.xyz/#/?code=0tH3Mmch'],
  ['二猫云', 'ermao-yun', 'https://connect.ermaotztz3.homes/#/?code=bvsFDmSt'],
  ['宇宙云', 'yuzhou-yun', 'https://qxzkpbrw.yuzhoutttt3.click/#/?code=IWowgER5'],
  ['EdgeNova', 'edgenova', 'https://zvbghs02.ztymforedge.lol/#/?code=k7VCKPvN'],
  ['可信云', 'kexin-yun', 'https://asfasf.kexintztz2.sbs/#/?code=k7T1sOyG'],
  ['速界', 'sujie', 'https://sa2dvqcfnd.tzztssuujj.xyz/#/?code=wZYGdnTC'],
  ['快狸', 'kuaili', 'https://iasfa.kuailitztz2.sbs/#/?code=azB6yNBW'],
  ['飞V', 'fei-v', 'https://asfweroasf.flyvttt.sbs/#/?code=XsiIuDgj'],
  ['梯子云', 'tizi-yun', 'https://asfawsf.ladderttt.sbs/#/?code=zUCoDtv6'],
  ['浪网', 'langwang', 'https://asfawsf.wavenetttt.homes/#/?code=9U2hOtDu'],
  ['灵动', 'lingdong', 'https://asfawsf.lingdongyunttt.homes/#/?code=HDiWuF7L'],
  ['隐形人', 'yinxingren', 'https://asfawsf.invisibleattt.sbs/#/?code=BtPRayAl'],
].map(([name, slug, affiliateUrl], index) => ({ name, slug, affiliateUrl, rank: index + 1, affiliateLinkStatus: 'unchecked' as const, affiliateLinkCheckedAt: null }));

export const getBrand = (slug: string) => brands.find((brand) => brand.slug === slug);
