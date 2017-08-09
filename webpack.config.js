/* jshint node: true */
var path = require('path');


module.exports = {
  context: path.join(__dirname),
  entry: './lib/index.js',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'umd',
    library: 'ReactFormWebpack'
  },

  externals: {
    //Comment before running tests
   'react': 'var React',
   'react/addons': 'var React',
   'react-redux': 'var ReactRedux',
   'payment': 'Payment',
   'lodash': 'lodash',
   'moment': 'moment',
   ///////////////////////////////////
   'cheerio': 'window',
   'react/addons': true,
   'react/lib/ExecutionEnvironment': true,
   'react/lib/ReactContext': true
  },

  module: {
    loaders: [
      {
        test: /\.scss$/,
        // Query parameters are passed to node-sass
        loader: 'style!css!sass?outputStyle=expanded&' +
          'includePaths[]=' + (path.resolve(__dirname, './bower_components')) + '&' +
          'includePaths[]=' + (path.resolve(__dirname, './node_modules'))
      },
      {
        test: /(\.js)|(\.jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          optional: ['runtime'],
          stage: 0
        }
      }
    ]
  }
};
