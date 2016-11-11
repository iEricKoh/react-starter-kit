const { resolve }       = require('path')
const webpack           = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path              = require('path')
const autoprefixer      = require('autoprefixer')
const precss            = require('precss')
const smartImport       = require("postcss-smart-import")
const ExtractTextPlugin = require('extract-text-webpack-plugin')
var BrowserSyncPlugin   = require('browser-sync-webpack-plugin')
const pkg               = require('./package.json')

const PATHS = {
  app   : path.join(__dirname, 'src'),
  style : [
    path.join(__dirname, 'assets', 'styles', 'styles.css')
  ],
  build : path.join(__dirname, 'dist'),
  //hotEntry: ['react-hot-loader/patch', 'webpack-dev-server/client?http://localhost:8080', 'webpack/hot/only-dev-server']
  hotEntry: ['react-hot-loader/patch', 'webpack-hot-middleware/client']
}

module.exports = options => {

  const PROD = options && options.production

  return {
    context: resolve(__dirname, 'src'),

    entry: {
      // App entry
      app: [].concat(PROD ? PATHS.app : [...PATHS.hotEntry, PATHS.app]),

      // Loading dependencies to a vendor Bundle Automatically
      vendor: Object.keys(pkg.dependencies),

      // Style entry 
      style: PATHS.style
    },

    output: {
      path       : PATHS.build,
      publicPath : '/',
      filename   : '[name].js'
    },

    devtool: PROD ? "source-map" : "eval-source-map",

    resolve: {
      modules    : [PATHS.app, "node_modules"],
      extensions : ['.js', '.jsx']
    },

    module: {
      rules: [
        {
          test : /\.jsx?$/,
          use  : [{
            loader: 'babel-loader',
            query: {
              cacheDirectory: PROD ? false : true,
            }
          }],
          include: PATHS.app
        }
      ].concat(PROD ? [extractStyle()] : [inlineStyle()])
    },

    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          postcss: () => [smartImport, autoprefixer, precss]
        },
        debug    : PROD ? false: true,
        minimize : PROD ? true : false
      }),

      new HtmlWebpackPlugin({
        template: 'index.html',
      }),

      new webpack.optimize.CommonsChunkPlugin({
        name: ['app', 'vendor', 'style'],
        minChunks: Infinity
      }),

      new webpack.NamedModulesPlugin(),

    ].concat(PROD ? 
      // Production
      [
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          },
          output: {
            comments: false
          },
          sourceMap: true
        }),
        new webpack.DefinePlugin({
          "process.env": { 
             NODE_ENV: JSON.stringify('production') 
           }
        }),
        new ExtractTextPlugin({
          disable   : false,
          allChunks : true,
          filename  : '[name].[chunkhash].css'
        })
      ] 
      : 
      // Development
      [
        new BrowserSyncPlugin(
          {
            host: 'localhost',
            port: 4000,
            proxy: 'http://localhost:8080/'
          },
          {
            reload: false
          }
        ),
        new webpack.HotModuleReplacementPlugin()
      ]
    )
  }
}

const extractStyle = () => {
  return {
    test: /\.css$/, 
    loader: ExtractTextPlugin.extract({
      fallbackLoader : "style-loader",
      loader         : ["css-loader?modules", "postcss-loader?parser=postcss-scss"]
    }),
    include: [PATHS.app, PATHS.style]
  }
}

const inlineStyle = () => {
  return {
    test: /\.css$/,
    use: [
      'style-loader',
      {
        loader : 'css-loader',
        query  : { modules: true }
      },
      {
        loader: 'postcss-loader',
        query: { parser: 'postcss-scss' }
      }
    ],
    include: [PATHS.app, PATHS.style]
  }
}
