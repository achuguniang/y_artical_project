/*
 * @Description: 
 * @Version: 
 * @Author: WangYue
 * @Date: 2019-11-06 14:40:43
 * @LastEditors: 
 * @LastEditTime: 2019-11-12 10:52:46
 */
const path = require('path');
const config = require('../config')
const vueLoaderConfig = require('./vue-loader')
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const utils = require('./utils');


// const HtmlWebpackPlugin = require('html-webpack-plugin');


const { VueLoaderPlugin } = require("vue-loader");


// function resolve (dir) {
//   return path.join(__dirname, '..', dir)
// }


module.exports = {
	/**
   * 1. __dirname 为node全局对象，是当前文件所在目录
   * 2. context为 查找entry和部分插件的前置路径
   */
	context: path.resolve(__dirname, '../'),

	entry: {
		/**
     * 入口，chunkname: 路径
     * 多入口可配置多个
     */
		app: ["babel-polyfill", "./src/main.js"]
	},

	output: {
		// 资源文件输出时写入的路径
		path: config.build.assetsRoot,
		filename: '[name].js',
		publicPath: process.env.NODE_ENV === 'production'
			? config.build.assetsPublicPath
			: config.dev.assetsPublicPath
	},

	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': utils.resolve('src'),
			'Static': path.resolve(__dirname, '../static/')
		}
	},
	plugins: [
		// new HtmlWebpackPlugin({
		// 	filename: 'index.html',
		// 	template: 'index.html',
		// 	inject: true
		// }),

		// 请确保引入这个插件！
		new VueLoaderPlugin(),

		// new CopyWebpackPlugin([{
		// 	from: utils.resolve('static/img'),
		// 	to: utils.resolve('dist/static/img'),
		// 	toType: 'dir'
		// }])

		// new CopyWebpackPlugin([
		// 	{
		// 		from: path.resolve(__dirname, '../static'),
		// 		to: 'static',
		// 		ignore: ['.*']
		// 	}
		// ])
	],



	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: vueLoaderConfig
			},
			{
				test: /\.js$/,
				loader: 'babel-loader?cacheDirectory=true',
				exclude: /node_modules/,
				// include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]

			}, {
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10240,
						name: utils.assetsPath('img/[name].[hash:7].[ext]')
					}
				}
			}, {
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10000,
						name: utils.assetsPath('media/[name].[hash:7].[ext]')
					}
				}
			}, {
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10000,
						name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
					}
				}
			}]
	},
	//webpack 的官方脚手架里面的node选项可以防止node包，还有 setImmediate 的 profill注入到代码中
	node: {
		// prevent webpack from injecting useless setImmediate polyfill because Vue
		// source contains it (although only uses it if it's native).
		setImmediate: false,
		// prevent webpack from injecting mocks to Node native modules
		// that does not make sense for the client
		dgram: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		child_process: 'empty'
	},

	optimization: {
		usedExports: true,//TreeShaking
		splitChunks: {
			chunks: 'all'
		}
	},


}