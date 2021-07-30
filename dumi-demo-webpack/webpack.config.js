module.exports = {
    entry: './src/index.js',
    output: {
        libraryTarget: 'umd',
    },
    module: {
        rules: [{
            test: /\.js|\.jsx$/,
            use: 'babel-loader',
            exclude: /node_modules/,
        }]
    }
}