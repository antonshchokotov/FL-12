const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: './src/js/index.js'
  },
  output: {
    filename: './js/[name].js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    },
    {
      test: /\.scss$/,
      loader: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      exclude: '/node_modules/'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: './css/[name].css'
    })
  ],
  devServer: {
    overlay: true
  }
}