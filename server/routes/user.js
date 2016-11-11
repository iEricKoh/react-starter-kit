const Router = require('koa-router')

const router = new Router({ prefix: '/api/user' })

router.get('/', async (ctx, next) => {
  ctx.body = {name: 'eric'}
})

module.exports = router
