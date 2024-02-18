const Koa = require("koa");
const Router = require("koa-router");
const mockList = require("./mock/index");

const app = new Koa();
const router = new Router();

// 测试延迟服务
async function getRes(fn, ctx) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = fn(ctx);
      resolve(res);
    }, 500);
  });
}

// 创建 mock 路由
mockList.forEach((item) => {
  const { url, method, response } = item;
  router[method](url, async (ctx) => {
    const res = await getRes(response, ctx); // 模拟网络请求的延迟状态
    ctx.body = res;
  });
});

app.use(router.routes());
app.listen(3001);
