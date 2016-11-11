const Koa         = require('koa')
const path        = require('path')
const bodyParser  = require('koa-bodyparser')
const send        = require('koa-send')
const serve       = require('koa-static')
const staticCache = require('koa-static-cache')
const routes      = require('./server/routes')

// Constants
const PORT = process.env.EXPOSE_PORT || 8080

// Env
const PROD = process.env.NODE_ENV === 'production'

const app = new Koa()

app.use(bodyParser())

// Production
if (PROD) {
  // Serve static assets
  app.use(staticCache(path.join(__dirname, 'assets'), {
    prefix: "/assets/"
  })) 

  // Serve dist folder
  app.use(serve(path.join(__dirname, 'dist')))

  // History fall back
  app.use(async function (ctx, next) {
    return send(ctx, '/index.html', { 
      root: path.join(__dirname, 'dist')
    })
    .then(() => next()) 
  }) 
} else {
// Development
  const webpack          = require('webpack')
  const WebpackDevServer = require("webpack-dev-server")
  const config           = require('./webpack.config')()
  const compiler         = webpack(config)
  const middleware       = require('koa-webpack')
  
  app.use(middleware({
    compiler: compiler,
    dev: {
      publicPath: '/',
      stats: 'errors-only',
      historyApiFallback: true
    }
  }))

  //var server = new WebpackDevServer(compiler, {
  //  publicPath         : '/',
  //  hot                : true,
  //  stats              : 'errors-only',
  //  historyApiFallback : true,

  //  // Combining with an existing Koa server
  //  proxy: {
  //    '/api': {
  //      target: `http://localhost:${PORT}`,
  //      secure: false
  //    }
  //  }
  //}) 
  //// Webpack dev server
  //server.listen(8080)
}

// Routes
app.use(routes)

// Koa server
app.listen(PORT)

module.exports = app
