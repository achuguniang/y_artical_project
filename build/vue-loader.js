/*
 * @Description: 
 * @Version: 
 * @Author: WangYue
 * @Date: 2019-11-07 13:02:56
 * @LastEditors: 
 * @LastEditTime: 2019-11-07 13:03:04
 */
const utils = require('./utils')

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: true,
    extract: process.env.NODE_ENV === 'production' ? true : false
  }),
  cssSourceMap: true,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}