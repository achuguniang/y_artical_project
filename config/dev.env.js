/*
 * @Description: 
 * @Version: 
 * @Author: WangYue
 * @Date: 2019-08-09 10:11:32
 * @LastEditors: 
 * @LastEditTime: 2019-11-11 13:55:07
 */
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')


// 公共版本
const appVersion = {
  NODE_ENV: '"development"',
  BASE_API: '"http://192.168.1.103:8083"',
  // 服务地址
  // BASE_API: '""',
  // 主题色
  BASE_COLOR: "{primary: '#ff7878'}",
  //打包走的打包项目路径
  BASE_PATH: "'path'"
}


module.exports = merge(prodEnv, appVersion)
