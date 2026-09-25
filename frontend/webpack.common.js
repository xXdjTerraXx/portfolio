const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devtool: false,
    // entry: './src/index.js',
    entry: {
        main: './src/index.js',
        admin: './src/admin.js',
        welcome: './src/js/welcome/main.js',
        album: './src/js/album/main.js'
    },
    output:{
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: 'assets/img/[name][hash][ext]',
        clean: true
    },
    devServer: {
        host: '0.0.0.0',
        // disableHostCheck: true, // Disables host header checking
        allowedHosts: 'all', 
      },
    
    module:{
        rules:[
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(svg|png|jpe?g|gif)$/i,
                type: "asset/resource"
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(webm|mp4)$/i,
                type: "asset/resource"
            },
            {
                test: /\.glb$/i,
                type: "asset/resource"
            },
            {
                test: /\.(mp3|wav|ogg)$/, // Match audio files
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash].[ext]', 
                            outputPath: 'audio/', 
                            publicPath: 'audio/' 
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        //for outputting main index.html
        new HtmlWebpackPlugin({
        template: './src/template.html',
        chunks: ['main']
      }),
        //for outputting admin/cms html file
        new HtmlWebpackPlugin({
        template: './src/admin.html',
        filename: 'admin.html',
        chunks: ['admin']
    }),
        //for outputting album html file
        new HtmlWebpackPlugin({
        template: './src/album.html',
        filename: 'album.html',
        chunks: ['album']
    }),
       //for outputting welcome html file
        new HtmlWebpackPlugin({
        template: './src/welcome.html',
        filename: 'welcome.html',
        chunks: ['welcome']
    })
    ]
}