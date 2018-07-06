const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
const os = require('os');

//4.x之后用以压缩
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
//炫酷吊炸天的检查代码大小
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpackConfigBase = require('./webpack.base.conf');
const webpackConfigProd = {
	mode: 'production', // 通过 mode 声明生产环境
	output: {
		path: path.resolve(__dirname, '../dist'),
		// 打包多出口文件
		// 生成 a.bundle.[hash].js  b.bundle.[hash].js
		filename: 'js/[name].[hash].js',
		publicPath: 'http://static.xxxx.com/static/', //'http://static.xxxx.com/'
	},
	devtool: 'cheap-source-map',
	plugins: [
		//压缩css
		new OptimizeCSSAssetsPlugin({
			assetNameRegExp: /\.css\.*(?!.*map)/g, //注意不要写成 /\.css$/g
			cssProcessor: require('cssnano'),
			cssProcessorOptions: {
				discardComments: {
					removeAll: true
				},
				// 避免 cssnano 重新计算 z-index
				safe: true,
				// cssnano 集成了autoprefixer的功能
				// 会使用到autoprefixer进行无关前缀的清理
				// 关闭autoprefixer功能
				// 使用postcss的autoprefixer功能
				autoprefixer: false
			},
			canPrint: true
		}),
		//上线压缩 去除console等信息
		new ParallelUglifyPlugin({
			workerCount: os.cpus().length - 1, //开启几个子进程去并发的执行压缩。默认是当前运行电脑的 CPU 核数减去1
			uglifyJS: {
				output: {
					beautify: false, //不需要格式化
					comments: true, //不保留注释
				},
				compress: {
					warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
					drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
					collapse_vars: true, // 内嵌定义了但是只用到一次的变量
					reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
				}
			}
		}),
		// new BundleAnalyzerPlugin(),
	],
	module: {
		rules: []
	},

}
module.exports = merge(webpackConfigBase, webpackConfigProd);