const path = require('path')
const common = require('./webpack.common')
const { merge } = require('webpack-merge')
const Dotenv = require('dotenv-webpack')

module.exports = merge(common, {
    mode: "development",
    devtool: false,
    plugins: [
        new Dotenv({
      path: './.env.development'
    })
    ],
    devServer: {
    host: '0.0.0.0',
    allowedHosts: 'all',
    historyApiFallback: {
        rewrites: [
            { from: /^\/admin/, to: '/admin.html' },
            { from: /^\/album/, to: '/album.html' },
            { from: /^\/welcome/, to: '/welcome.html' },
            { from: /./, to: '/index.html' } // fallback for everything else, including root
        ]
    }
},
})
