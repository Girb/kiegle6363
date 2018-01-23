import Router from 'koa-router';

const router = new Router();
router.get('/', (ctx, next) => {
  ctx.body = 'here be dragons';
  return 'here be dragons';
});

export default { router };
