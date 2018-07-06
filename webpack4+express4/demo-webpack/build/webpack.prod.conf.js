const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
// 清除目录等
const cleanWebpackPlugin = require("clean-webpack-plugin");
//4.x之后用以压缩
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpackConfigBase = require('./webpack.base.conf');
const webpackConfigProd = {
	mode: 'production', // 通过 mode 声明生产环境
	output: {
		path: path.resolve(__dirname, '../dist'),
		// 打包多出口文件
		// 生成 a.bundle.[hash].js  b.bundle.[hash].js
		filename: './js/[name].[hash].js',
		publicPath: '../dist/', //'http://static.xxxx.com/'
	},
	devtool: 'cheap-source-map',
	plugins: [
		//删除dist目录
		new cleanWebpackPlugin(['dist'], {
			root: path.resolve(__dirname, '../'), //根目录
			// verbose Write logs to console.
			verbose: true, //开启在控制台输出信息
			// dry Use boolean "true" to test/emulate delete. (will not remove files).
			// Default: false - remove files
			dry: false,
		}),
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
		//上线压缩 去除console等信息webpack4.x之后去除了webpack.optimize.UglifyJsPlugin
		//https://github.com/mishoo/UglifyJS2/tree/harmony#compress-options
		new UglifyJSPlugin({
			uglifyOptions: {
				compress: {
					warnings: false,
					drop_debugger: false,
					drop_console: true
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