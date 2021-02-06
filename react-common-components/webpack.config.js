
const path = require('path');
const nodeExternals = require('webpack-node-externals');
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './dist'),
    libraryTarget : 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js|\.jsx|\.ts|\.tsx$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test:/\.scss$/,
        use: ['style-loader','css-loader','sass-loader'],
      }
    ]
  },
  resolve : {
    extensions : ['.js', '.jsx', '.ts', '.tsx']
  },
  externals : [
    nodeExternals(),
  ]
};