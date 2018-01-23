import koa from 'koa';
import router from './router';

const app = new koa();
app.use(router.routes());

export default app;
