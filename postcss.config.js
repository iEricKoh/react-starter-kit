const webpack = require('webpack')

module.exports = {
  plugins: [
    require('postcss-import')({ addDependencyTo: webpack }),
    require('precss')(),
    require('postcss-cssnext')({
      browsers: ['last 2 versions', '> 5%'],
      compress: true
    }),
  ]
}
