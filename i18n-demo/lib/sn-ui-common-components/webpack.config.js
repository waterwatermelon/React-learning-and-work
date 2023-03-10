
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './dist'),
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js|\.jsx|\.ts|\.tsx$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'],
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  externals: [
    nodeExternals(),
  ]
};