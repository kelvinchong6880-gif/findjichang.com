# 找机场

`findjichang.com` 是一个使用 Astro 构建的简体中文评测、测速、对比和教程网站。

## 新手启动方法

先打开项目目录，然后安装依赖：

```powershell
pnpm install
```

启动本地网站：

```powershell
pnpm dev
```

终端显示本地地址后，在浏览器中打开该地址。通常是 `http://localhost:4321`。

停止运行时，在终端按 `Ctrl + C`。

## 上线前检查

```powershell
pnpm deploy:check
```

构建成功后，生成的网站文件位于 `dist` 目录。

## Cloudflare 预发布设置

- GitHub 仓库：建议设为私有，生产分支使用 `main`。
- Cloudflare Pages 构建命令：`pnpm build`。
- 构建输出目录：`dist`。
- Pages Functions 的 Analytics Engine 绑定：`CLICK_EVENTS`。
- 首次只使用 Cloudflare 提供的 `pages.dev` 测试地址。
- 在正式文章、推广链接和域名验收完成前，不要开启搜索引擎收录。

详细操作与验收清单见 `docs/10-github-cloudflare-deployment.md`。

## 常用目录

- `src/pages`：网站页面
- `src/layouts`：页面公共骨架
- `src/styles`：全站样式
- `public`：无需处理的公开静态文件
- `docs`：项目决策和执行记录

## 当前阶段

项目正在按锁定路线逐步搭建。请勿提前批量添加内容，以免与后续关键词和网站结构冲突。
