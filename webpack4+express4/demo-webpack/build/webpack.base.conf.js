const path = require('path');
const webpack = require("webpack");
const glob = require("glob");
// 分离css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'
//作用域提升
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
//消除冗余的css
const purifyCssWebpack = require("purifycss-webpack");
// html模板
const htmlWebpackPlugin = require("html-webpack-plugin");
//静态资源输出
const copyWebpackPlugin = require("copy-webpack-plugin");
const rules = require("./webpack.rules.conf.js");
// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function (name, chunks) {
	return {
		// template: `./src/pages/${name}/index.html`,
		template: resolve('src/pages/' + name + '.html'),
		// filename: `${name}.html`,
		filename: resolve('views/' + name + '.html'),
		inject: true,
		hash: true, //开启hash  ?[hash]
		chunks: chunks.concat(['vendor']),
		minify: process.env.NODE_ENV === "development" ? false : {
			removeComments: true, //移除HTML中的注释
			collapseWhitespace: true, //折叠空白区域 也就是压缩代码
			removeAttributeQuotes: true, //去除属性引用
		},
	};
};


module.exports = {
	entry: getEntries(),
	module: {
		rules: [...rules]
	},
	//将外部变量或者模块加载进来
	externals: {
		// 'jquery': 'window.jQuery'
	},
	resolve: {
		alias: {
			'vue': 'vue/dist/vue.js'
		}
	},
	plugins: [
		// 全局暴露统一入口
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			'window.jQuery': 'jquery',
		}),
		//静态资源输出  暂时不用
		// new copyWebpackPlugin([{
		// 	from: path.resolve(__dirname, "../src/base"),
		// 	to: './assets',
		// 	ignore: ['.*']
		// }]),
		// 消除冗余的css代码
		new purifyCssWebpack({
			paths: glob.sync(path.join(__dirname, "../src/pages/*.html"))
		}),
		new ModuleConcatenationPlugin(),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: devMode ? 'css/[name].[hash:5].css' : 'css/[name].[hash:7].css',
			chunkFilename: devMode ? '[id].[hash:5].css' : '[id].[hash:7].css',
		})

	],
	// webpack4里面移除了commonChunksPulgin插件，放在了config.optimization里面,提取js， vendor名字可改
	optimization: {
		splitChunks: {
			chunks: 'async',
			minSize: 30000,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			name: false,
			cacheGroups: {
				// vendor: {
				// 	// test: /\.js$/,
				// 	test: path.resolve(__dirname, '../node_modules'),
				// 	chunks: "initial", //表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
				// 	name: "vendor", //拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；
				// 	minChunks: 3,
				// 	reuseExistingChunk: true,
				// 	enforce: true
				// }
				vendor: {
					name: 'vendor',
					chunks: 'initial',
					priority: -10,
					reuseExistingChunk: false,
					test: /node_modules\/(.*)\.js/
				},
			}
		}

	},
}


//自动生成html模板
var htmlArray = [];
let arr = glob.sync(resolve('src/entry/**/*.js'));
arr.forEach(function (file) {
	let [filename, entry, module] = folderFile(file);
	let obj = {};
	obj._html = entry;
	obj.chunks = [];
	obj.chunks.push(entry)
	htmlArray.push(obj)
})
htmlArray.forEach((element) => {
	module.exports.plugins.push(new htmlWebpackPlugin(getHtmlConfig(element._html, element.chunks)));
})



//遍历入口
function getEntries() {
	let entries = {};
	let arr = glob.sync(resolve('src/entry/**/*.js'));
	arr.forEach(function (file) {
		let [filename, entry, module] = folderFile(file), //文件名，文件名（去后缀），入口
			path = file.substring(file.indexOf('src')); //路径
		entries[entry] = entries[entry] || [];
		entries[entry].push('./' + path);
	})
	return entries;
}




// 公共方法
function resolve() {
	const base = path.resolve(__dirname + '/../');
	if (arguments.length == 1)
		return base + (arguments[0].startsWith('/') ? '' : '/') + arguments[0];

	var paths = []
	for (var arg in arguments) paths.push(path.resolve(arg));
	return paths;
}
//获取目录名和文件名,返回[文件名(带后缀), 文件名(无后缀), 文件夹名]数组
function folderFile(file) {
	let parts = file.split('/'),
		filename = parts[parts.length - 1],
		entry = filename.split('.')[0],
		module = parts.length < 2 ? entry : parts[parts.length - 2];
	return [filename, entry, module]
}