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
    ]
})