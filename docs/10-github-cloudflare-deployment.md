# 第 10 步：GitHub 与 Cloudflare 上线准备

状态：实施完成，等待确认锁定  
日期：2026-08-18

## 实施结果

- GitHub 私有仓库：`kelvinchong6880-gif/findjichang.com`。
- 默认分支：`main`，本地分支已跟踪 `origin/main`。
- Cloudflare Pages 项目：`findjichang-com`。
- 预发布地址：`https://findjichang-com.pages.dev`。
- Cloudflare 已连接 GitHub，后续推送会自动触发构建和部署。
- Analytics Engine 已启用，`CLICK_EVENTS` 绑定随 `wrangler.toml` 成功发布。
- 正式域名尚未绑定，Bing、IndexNow 和公开收录尚未启用。

## 真实环境验收结果

- Cloudflare 使用 Node 24.13.1 与 pnpm 11.19.0 成功构建。
- Astro 检查为 0 错误、0 警告、0 提示；87 个页面成功生成。
- 92 个部署文件上传成功，Pages Function 编译和发布成功。
- Cloudflare 成功解析 6 条响应头规则。
- 预发布首页返回 HTTP 200，并包含 CSP、Permissions Policy、Referrer Policy、MIME 保护和防嵌入响应头。
- 首页保持 `noindex, follow`，`sitemap-pages.xml` 的 `<loc>` 数量为 0。
- `/go/weifeng/?from=/&placement=hero` 返回 HTTP 302，并跳转到锁定的微风推广地址。
- `/go/not-a-brand/` 返回 HTTP 404。

## 当前边界

- 本阶段只部署到 Cloudflare 提供的 `pages.dev` 预发布地址。
- `src/config/site.ts` 中的 `allowIndexing` 必须保持 `false`。
- 不绑定正式域名，不提交 Sitemap，不执行 IndexNow。
- 不把 `.env`、访问令牌、账号密码或其他真实密钥提交到 GitHub。

## GitHub 设置

1. 新建私有仓库，建议名称为 `findjichang.com`。
2. 默认分支使用 `main`。
3. 将本地代码首次提交并推送到该仓库。
4. 不启用 GitHub Pages；实际托管平台为 Cloudflare Pages。
5. 后续修改通过 GitHub 推送触发 Cloudflare 预览或生产构建。

## Cloudflare Pages 设置

1. 在 Cloudflare 控制台进入 Workers & Pages，选择创建 Pages 项目并连接 GitHub。
2. 选择 `findjichang.com` 仓库，生产分支填写 `main`。
3. 构建命令填写 `pnpm build`，输出目录填写 `dist`，项目根目录留空。
4. 首次部署完成后，只访问 Cloudflare 提供的 `pages.dev` 地址进行验收。
5. 在 Pages 项目的 Bindings 中确认 Analytics Engine 绑定名为 `CLICK_EVENTS`，数据集为 `findjichang_click_events`；修改绑定后重新部署。
6. Web Analytics Token 可在预发布环境配置；Bing 和 IndexNow 变量继续留空。

项目已提供 `wrangler.toml`，记录 Pages 输出目录和 Analytics Engine 绑定。若 Cloudflare 控制台提示采用该配置，以仓库文件中的同名值为准。

## 预发布验收

- 构建成功且没有 Astro 错误。
- 首页、测评页、测速页、隐私政策和自定义 404 正常。
- 页面仍输出 `noindex, follow`。
- `sitemap-pages.xml` 不含可收录内容网址。
- `/go/weifeng/?from=/&placement=hero` 返回 302 并跳到锁定推广地址。
- `/go/not-a-brand/` 返回 404。
- `CLICK_EVENTS` 能收到只包含品牌、来源、位置、日期和次数的匿名记录。
- 响应包含安全头；静态指纹资源使用长期缓存。
- GitHub 仓库中没有 `.env`、Cloudflare API Token 或其他秘密。
- 检查 Cloudflare 历史部署能够回滚。

## 正式域名阶段（本步骤暂不执行）

1. 首批内容、推广链接和人工键盘检查全部通过后，才从 Pages 的 Custom domains 添加 `findjichang.com`。
2. HTTPS 正常后再配置 `www.findjichang.com` 到主域名的 301 跳转。
3. 正式站验收完成后，才配置 Bing 验证、IndexNow 密钥和 Sitemap 提交。
4. `allowIndexing` 的开启必须作为单独变更审核，不能在部署准备阶段顺手修改。

## 尚需用户账号授权的事项

- 创建或选择 GitHub 私有仓库。
- 登录 Cloudflare 并授权其读取该 GitHub 仓库。
- 创建 Pages 项目和 Analytics Engine 数据集。
- 提供首次 `pages.dev` 部署地址，用于真实环境验收。

这些事项会改变外部账号状态，必须由账号持有人确认或在已登录界面中完成。
