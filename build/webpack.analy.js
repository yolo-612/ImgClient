const prodConfig = require('./webpack.prod.js') // 引入打包配置
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin'); // 引入webpack打包速度分析插件
const smp = new SpeedMeasurePlugin(); // 实例化分析插件
const { merge } = require('webpack-merge') // 引入合并webpack配置方法
// 使用speed-measure-webpack-plugin的时候出现了一些问题。会和mini-css-extract-plugin以及vue-loader不兼容出现的报错。
const { VueLoaderPlugin } = require('vue-loader')

// 使用smp.wrap方法,把生产环境配置传进去,由于后面可能会加分析配置,所以先留出合并空位
const configWithTimeMeasures = smp.wrap(merge(prodConfig, {

}))
configWithTimeMeasures.plugins.push(new VueLoaderPlugin());
module.exports = configWithTimeMeasures
