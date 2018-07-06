const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackConfigBase = require('./webpack.base.conf');


const webpackConfigDev = {
	mode: 'development', // 通过 mode 声明开发环境
	output: {
		path: path.resolve(__dirname, '../dist/'),
		// 打包多出口文件
		filename: './js/[name].[hash:3].js',
		publicPath: '/dist',

	},

	devServer: {
		contentBase: path.join(__dirname, "../"),
		publicPath: '/',
		host: "127.0.0.1",
		port: "8089",
		inline: true,//自用刷新
		overlay: true, // 浏览器页面上显示错误
		hot: false // 开启热更新
	},
	plugins: [
		//热更新
		// new webpack.HotModuleReplacementPlugin(),
	],
	// devtool: "source-map",  // 开启调试模式
	module: {
		rules: []
	},
}
module.exports = merge(webpackConfigBase, webpackConfigDev);