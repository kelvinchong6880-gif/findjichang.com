# 第 7 步：结构化数据与技术 SEO

状态：已确认并锁定  
日期：2026-08-18

## 已实施

- 所有页面继续输出唯一标题、描述、canonical、语言、社交分享信息和 robots 指令。
- 首页输出 WebSite 与 Organization；栏目页输出 CollectionPage；可见面包屑同步输出 BreadcrumbList。
- 建立 Article、HowTo、ItemList 与 Dataset 的安全数据接口；只有正文真实存在时才调用。
- 不输出 Review、虚假评分、虚假作者、虚假社交账号或不可见信息。
- 建立 sitemap-index.xml 与 sitemap-pages.xml；后者只接受已发布、已编辑复核并通过 12 项 Bing 检查的文章。
- 开发阶段 `allowIndexing` 为 false，因此 Sitemap 暂无可提交内容。
- robots.txt 允许抓取并指向 Sitemap。
- 建立返回真实 404 状态的自定义页面。
- 建立 IndexNow 提交脚本与环境变量模板，但没有生成密钥或提交网址。

## Sitemap 规则

草稿、研究中、初稿中、事实核验中、待发布、更新中、薄内容和 noindex 页面均不进入 Sitemap。lastmod 使用真实的 updatedAt；没有更新日期时使用真实 publishedAt，不使用构建时间。

## 结构化数据规则

JSON-LD 必须与用户可见正文一致。Article 只在正式文章存在时启用；HowTo 只用于真实分步教程；ItemList 顺序必须与可见列表一致；Dataset 只有在来源、测试条件和数据说明完整时启用。

## IndexNow 规则

只提交实际新增、修改、删除或跳转的网址。密钥在正式上线阶段生成并托管于域名下；不得编造 Bing 验证代码，也不得每次构建重复提交所有网址。

## 上线前待办

- 完成首批合格文章及其独立图片和 Article 数据。
- 生成 IndexNow 密钥文件并配置部署环境变量。
- 在 Bing Webmaster Tools 验证域名并提交 Sitemap。
- 完成真实重定向表、失效内容处理和上线后的 URL Inspection。
- 最终验收后才将 allowIndexing 改为 true。
