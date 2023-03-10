
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: './demo/index.js',
  // devtool:'eval-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './/dist'),
  },
  module: {
    rules: [
      {
        test: /\.js|\.jsx|\.ts|\.tsx$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test:/\.scss$/,
        use: ['style-loader','css-loader','sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      }
    ]
  },
  resolve : {
    extensions : ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
  devServer: {
    contentBase: './dist',
    // port: 3000, // 修改 dev server 端口
  },
  plugins: [
    new htmlWebpackPlugin({
      title : '测试',
      template : './public/index.html'
    })
  ],
};

