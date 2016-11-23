const Router = require('koa-router')

const router = new Router({
  prefix: '/api/users'
})

router.get('/', async(ctx, next) => {
  ctx.body = {user: 'get eric'}
})

router.post('/', async(ctx, next) => {
  ctx.body = {users: 'post eric'}
})

module.exports = router
