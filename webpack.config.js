const webpack = require('webpack')

module.exports = {
    entry: [
        './public/scripts/app.js'],
    output: {
        path: __dirname + '/public/build',
        publicPath: '/',
        filename: 'app.js'
    },

    devServer: {
        contentBase: './build',
        hot: true
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/
        }],
    }
}