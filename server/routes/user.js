const Router = require('koa-router')
//const models = require('../models')

const router = new Router({ prefix: '/api/user' })

router.get('/', async (ctx, next) => {
  ctx.body = {name: 'eric'}
  //ctx.body = {users: await models.user.findAll()}
})

module.exports = router
