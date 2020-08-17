const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/main.js'),
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: ''
    },
    devServer: {
        hot: true,
        port: 3000,
        progress: true,
        contentBase: './dist',
        compress: true
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: false
        }),
        new MiniCssExtractPlugin({
            filename: './main.css'
        }),
        // new OptimizeCss({
        //     cssProcessor: require('cssnano'), // 引入cssnano配置压缩选项
        //     cssProcessorOptions: { 
        //         discardComments: { removeAll: true } 
        //     },
        //     canPrint: true // 是否将插件信息打印到控制台
        // }),    
        // new webpack.ProvidePlugin({
        //     '$': jquery
        // }),
        // new CleanWebpackPlugin()
    ],
    optimization: {
        minimizer: [
            new OptimizeCssAssetsWebpackPlugin(),
            new UglifyjsWebpackPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            })
        ]
    },
    devtool: "source-map",
    // resolve: {
    //     modules: [path.resolve('modules')],
    //     alias: {
    //         bootstrap: 'bootstrap/dist/css/bootstrap.css'
    //     }
    // },
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [ '@babel/preset-env' ]
                }
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },
            {
                test: /\.less$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    "less-loader"
                ]
            },
            // {
            //     test: /\.js$/i,
            //     use: {
            //         loader: 'eslint-loader',
            //         options: {
            //             enforce: 'pre'
            //         }
            //     }
            // },
            // {
            //     test: /\.html$/i,
            //     use: 'html-withimg-loader'
            // },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 20 * 1024,
                        outputPath: '/img/'
                    }
                }
            },
            {
                test: /\.html$/i,
                use: 'html-loader'
            }
        ]
    }
};