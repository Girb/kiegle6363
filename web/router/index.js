import Router from 'koa-router';
import api from './api';

const router = new Router();
console.log(api);
router.use('/competitions', api.competitions.router.routes());
// router.get('/', (ctx, next) => {
//     console.log('qwwwww');
// });

export default router;
