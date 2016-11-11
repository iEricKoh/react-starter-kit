const Router = require('koa-router')

const router = new Router()

router.get('/', async (ctx, next) => {
  ctx.body = 'root'
})

module.exports = router
