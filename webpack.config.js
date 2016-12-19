var webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  resolve: {
    modulesDirectories: ['node_modules', 'src/js'],
    extensions: ['', '.js', '.scss'],
  },
  entry: ['./src/js/main.js', './src/scss/main.scss'],
  output: {
    filename: './dist/browser-bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader?sourceMap!sass-loader?sourceMap=true&sourceMapContents=true')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("./dist/main.css")
  ]
};
