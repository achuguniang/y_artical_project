/*
 * @Description: 
 * @Version: 
 * @Author: WangYue
 * @Date: 2019-11-06 16:29:39
 * @LastEditors: 
 * @LastEditTime: 2019-11-11 10:34:28
 */
'use strict'

const path = require('path');
const config = require('../config');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const packageConfig = require('../package.json');

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV == 'production' ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory;

  return path.posix.join(assetsSubDirectory, _path)
}

/**
 * @description: cssLoaders为vue-loader内样式文件相关配置,因为vue-loader内已经内置postcss做相关处理, 所以传入options不需要postcss
 * @param {type} 
 * @return: 
 */
exports.cssLoaders = function (options) {
  options = options || {};
  const postLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  };
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  };
  // 生成针对某种css预处理器的loaders配置组
  const generateLoaders = (type, loaderOptions) => {
    const loaders = options.usePostCSS ? [cssLoader, postLoader] : [cssLoader]
    loaderOptions = loaderOptions || {}
    if (type) {
      loaders.push({
        loader: `${type}-loader`,
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    if (options.extract) {
      return [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          /*
          * 复写css文件中资源路径
          * webpack3.x配置在extract-text-webpack-plugin插件中
          * 因为css文件中的外链是相对与css的，
          * 我们抽离的css文件在可能会单独放在css文件夹内
          * 引用其他如img/a.png会寻址错误
          * 这种情况下所以单独需要配置../../，复写其中资源的路径
          */
          publicPath: '../../'
        }
      }].concat(loaders)

    } else {
      /**
       * 以返回 ['vue-style-loader', 'css-loader', 'postcss-loader', 'less-loader']
       * @import url(demo.less)为例子
       * less-loader先处理less语法
       * postcss-loader进行前缀添加等其他处理
       * css-loader处理@import将内容引入@import所在的css文件内
       * vue-style-loader将生成style标签插入head
       */
      return ['vue-style-loader'].concat(loaders)
    }
  };

  return { // 返回各种 loaders 对象
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    // 示例：[
    // { loader: 'css-loader', options: { sourceMap: true/false } },
    // { loader: 'postcss-loader', options: { sourceMap: true/false } },
    // { loader: 'less-loader', options: { sourceMap: true/false } },
    // ]
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

/**
 * @description: 通过使用 node.js 跨平台地发送通知信息
 * @param {type} 
 * @return: 
 */
exports.createNotifierCallback = function () {
  const notifier = require('node-notifier')
  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

/**
 * @description: 路径拼接
 * @param {type} 
 * @return: 
 */
exports.resolve = function (dir) {
  return path.join(__dirname, '..', dir)
}
exports.styleLoaders = function (options) {
  const output = [];
  const loaders = exports.cssLoaders(options);
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
    // 示例：
    // {
    //   test: new RegExp(\\.less$),
    //   use: {
    //     loader: 'less-loader', options: { sourceMap: true/false }
    //   }
    // }
  }
  return output
}