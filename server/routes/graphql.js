const Router      = require('koa-router')
const convert     = require('koa-convert')
const graphqlHTTP = require('koa-graphql')
const Schema      = require('../schema')

const router = new Router({
  prefix: '/api/graphql'
})

router.all('/', convert(graphqlHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true
})))

module.exports = router
