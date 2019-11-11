/*
 * @Description: 
 * @Version: 
 * @Author: WangYue
 * @Date: 2019-11-06 14:41:12
 * @LastEditors: 
 * @LastEditTime: 2019-11-11 15:05:41
 */

const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.base.config.js')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzer = require('webpack-bundle-analyzer')

const env = process.env.NODE_ENV === 'production'
	? require('../config/prod.env')
	: require('../config/dev.env')

/**
* production模式下默认启用这些插件
* FlagDependencyUsagePlugin, // 应该是删除无用代码的，其他插件依赖
* FlagIncludedChunksPlugin, // 应该是删除无用代码的，其他插件依赖
* ModuleConcatenationPlugin,  // 作用域提升
* NoEmitOnErrorsPlugin,  // 遇到错误代码不跳出
* OccurrenceOrderPlugin, 
* SideEffectsFlagPlugin
* UglifyJsPlugin.  // js代码压缩
* process.env.NODE_ENV 的值设为 production
*/
const prodConfig = merge(commonConfig, {
	mode: 'production',
	module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,// production 下生成 sourceMap
      extract: true, // util 中 styleLoaders 方法内的 generateLoaders 函数
      usePostCSS: true
    })
  },
	devtool: config.build.productionSourceMap ? config.build.devtool : false,
	output: {
		path: config.build.assetsRoot,
		filename: utils.assetsPath('js/[name].[chunkhash:7].wy.js'),
		chunkFilename: utils.assetsPath('js/[id].[chunkhash:7].wy.js')
	},

	plugins: [
		new webpack.DefinePlugin({ 'process.env': env }),
		// 生成 html
		new HtmlWebpackPlugin({
			filename: process.env.NODE_ENV === 'production'
				? config.build.index
				: 'index.html',
			template: 'index.html',
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
			},
			chunksSortMode: 'dependency' // 按 dependency 的顺序引入
		}),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: "static/css/[name].[contenthash:7].css"
		}),
		/**
     * https://zhuanlan.zhihu.com/p/35093098
     * https://github.com/pigcan/blog/issues/9
     * vue-cli webpack中也有此配置
     * 正常来讲，引用node_modules不变的话，vender的hash应该是不变的，
     * 但是引用其他的模块，模块id变化会引起vender中模块id变化，引起hash变化，
     * 使用此插件对引入路径进行hash截取最后几位做模块标识可解决这个问题
     * 
     * 开发模式有另一个插件NamedModulesPlugin
     */
		new webpack.HashedModuleIdsPlugin(), //// 根据模块的相对路径生成一个四位数的 hash 作为模块 id
		new OptimizeCSSAssetsPlugin({}), // css 压缩
		//new BundleAnalyzer.BundleAnalyzerPlugin(), // bundle 分析

		// gzip 压缩一般由服务器直接提供
		// new CompressionWebpackPlugin({
		//   asset: '[path].gz[query]',
		//   algorithm: 'gzip',
		//   test: new RegExp(
		//     '\\.(' +
		//     config.build.productionGzipExtensions.join('|') +
		//     ')$'
		//   ),
		//   threshold: 10240,
		//   minRatio: 0.8
		// })

	],

	/**
   * 优化部分包括代码拆分
   * 且运行时（manifest）的代码拆分提取为了独立的 runtimeChunk 配置 
   */
	optimization: {
		splitChunks: {
			chunks: "all",
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "all"
				},
				commons: {
					// async 设置提取异步代码中的公用代码
					chunks: "async",
					name: 'commons-async',
          /**
           * minSize 默认为 30000
           * 想要使代码拆分真的按照我们的设置来
           * 需要减小 minSize
           */
					minSize: 0,
					// 至少为两个 chunks 的公用代码
					minChunks: 3
				}
			}
		},
    /**
     * 对应原来的c;s minchunks: Infinity
     * 提取 webpack 运行时代码
     * 直接置为 true 或设置 name
     */
		runtimeChunk: {
			name: 'manifest'
		}
	}



})

module.exports = prodConfig

