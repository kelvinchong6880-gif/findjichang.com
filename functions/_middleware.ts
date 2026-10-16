// 不带 www 的访问统一 301 跳转到 www，避免 Bing 把 findjichang.com 和 www.findjichang.com 当成两套重复页面收录。
interface Context { request: Request; next: () => Promise<Response> }

export async function onRequest(context: Context): Promise<Response> {
  const url = new URL(context.request.url);
  if (url.hostname === 'findjichang.com') {
    url.hostname = 'www.findjichang.com';
    url.protocol = 'https:';
    return Response.redirect(url.toString(), 301);
  }
  return context.next();
}
