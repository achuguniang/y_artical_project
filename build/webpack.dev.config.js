process.env.NODE_ENV = 'development'
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const utils = require('./utils');
const commonConfig = require('./webpack.base.config.js');

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devConfig = merge(commonConfig, {
    /**
     * development模式下默认启用这些插件
     * NamedChunksPlugin  // 使用entry名做标识
     * NamedModulesPlugin // 使用模块的相对路径非自增id做标识
     * 以上两个模块均为解决hash固化的问题
     */
    module: {
        rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
    },
    mode: 'development',
    devtool: config.dev.devtool,// 添加元信息(meta info)增强调试
    devServer: {
        clientLogLevel: 'warning',// console 控制台显示的消息，可能的值有 none, error, warning 或者 info
        historyApiFallback: { // History API 当遇到 404 响应时会被替代为 index.html
            rewrites: [
                { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
            ],
        },
        hot: true,// 模块热替换
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true, //压缩请求
        contentBase: false, // // since we use CopyWebpackPlugin.
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        open: config.dev.autoOpenBrowser,// 是否自动打开浏览器
        overlay: config.dev.errorOverlay // warning 和 error 都要显示
            ? { warnings: false, errors: true }
            : false,
        publicPath: config.dev.assetsPublicPath,
        quiet: true, // 控制台是否禁止打印警告和错误 若使用 FriendlyErrorsPlugin 此处为 true
        watchOptions: {
            poll: config.dev.poll, // 文件系统检测改动
        },
        // 开启本地服务内网穿透
        disableHostCheck: true
    },

    plugins: [
        new webpack.DefinePlugin({   //// 判断生产环境或开发环境
            'process.env': require('../config/dev.env')
        }),
        new webpack.HotModuleReplacementPlugin(), // 热加载

        // 热加载时直接返回更新的文件名，而不是id;development模式下默认启用这些插件
        //new webpack.NamedModulesPlugin(), 
        new webpack.NoEmitOnErrorsPlugin(), // 跳过编译时出错的代码并记录下来，主要作用是使编译后运行时的包不出错

        // 该插件可自动生成一个 html5 文件或使用模板文件将编译好的代码注入进去
        new HtmlWebpackPlugin({ 
            filename: 'index.html',
            template: 'index.html',
            inject: true // 可能的选项有 true, 'head', 'body', false
        }),
    ],
})


module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port; // 获取当前设定的端口
    portfinder.getPort((err, port) => {
        if (err) { reject(err) } else {
            process.env.PORT = port; // process 公布端口
            devConfig.devServer.port = port; // 设置 devServer 端口

            devConfig.plugins.push(new FriendlyErrorsPlugin({ // 错误提示插件
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${config.dev.host}:${port}`],
                },
                onErrors: config.dev.notifyOnErrors ? utils.createNotifierCallback() : undefined
            }))

            resolve(devConfig);
        }
    })
})