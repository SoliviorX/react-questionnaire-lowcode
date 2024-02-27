/**
 * 基于fetch封装get、post请求方法
 */

const HOST = "http://localhost:3001";

export async function get(url: string) {
  const res = await fetch(`${HOST}${url}`);
  // 将JSON对象转换成JSON字符串；还会自动设置适当的Content-Type头，表明返回的是JSON数据。
  const data = res.json();
  return data;
}

export async function post(url: string, body: any) {
  const res = await fetch(`${HOST}${url}`, {
    method: "post",
    body: JSON.stringify(body),
  });
  const data = res.json();
  return data;
}
