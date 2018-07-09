const path = require('path');
const webpack = require("webpack");
const glob = require("glob");
// 分离css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production';
//作用域提升
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
//消除冗余的css
const purifyCssWebpack = require("purifycss-webpack");
//happy
const HappyPack = require('happypack');
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({
	size: os.cpus().length
})
// html模板
const htmlWebpackPlugin = require("html-webpack-plugin");
// 清除目录等
const cleanWebpackPlugin = require("clean-webpack-plugin");
//静态资源输出
const copyWebpackPlugin = require("copy-webpack-plugin");
const rules = require("./webpack.rules.conf.js");
//限时进度
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// vue
const { VueLoaderPlugin } = require('vue-loader');
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
		},
		mainFields: ['jsnext:main', 'browser', 'main']
	},
	plugins: [
		// 全局暴露统一入口
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			'window.jQuery': 'jquery',
		}),
		//静态资源输出 
		new copyWebpackPlugin([
			// {
			// 	from: path.resolve(__dirname, "../src/img"),
			// 	to: './img',
			// 	ignore: ['.*']
			// },
			{
				from: path.resolve(__dirname, "../src/pages/includes"),
				to: '../views/includes',
				ignore: ['.*']
			}
		]),
		//happy
		new HappyPack({
			id: 'happy-babel-js',
			loaders: ['babel-loader?cacheDirectory=true'],
			threadPool: happyThreadPool
		}),
		// 消除冗余的css代码,如果页面中没用到此样式则不输出
		new purifyCssWebpack({
			paths: glob.sync(path.join(__dirname, "../src/pages/*.html"))
		}),
		new ModuleConcatenationPlugin(),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: devMode ? 'css/[name].[hash:5].css' : 'css/[name].[hash:7].css',
			chunkFilename: devMode ? '[id].[hash:5].css' : '[id].[hash:7].css',
		}),
		//删除dist目录
		new cleanWebpackPlugin(['dist'], {
			root: path.resolve(__dirname, '../'), //根目录
			// verbose Write logs to console.
			verbose: true, //开启在控制台输出信息
			// dry Use boolean "true" to test/emulate delete. (will not remove files).
			// Default: false - remove files
			dry: false,
		}),
		new ProgressBarPlugin({
			format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
		}),
		new VueLoaderPlugin()

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
	// optimization: {
	// 	// runtimeChunk: {
	// 	//     name: "manifest"
	// 	// },
	// 	splitChunks: {
	// 		cacheGroups: {
	// 			commons: {
	// 				chunks: 'initial',
	// 				minChunks: 2,
	// 				maxInitialRequests: 5,
	// 				minSize: 0
	// 			},
	// 			vendor: { // 将第三方模块提取出来
	// 				test: /node_modules\/(.*)\.js/,
	// 				chunks: 'initial',
	// 				name: 'vendor',
	// 				priority: 10, // 优先
	// 				enforce: true
	// 			}
	// 		}
	// 	}
	// }
}


//自动生成html模板
var htmlArray = [];
let arr = glob.sync(resolve('src/entry/**/*.js'));
arr.forEach(function (file) {
	let [filename, entry, module] = folderFile(file);
	// console.log(filename,entry,module);
	let obj = {};
	if (module == 'entry') {
		obj._html = entry;
		obj.chunks = [];
		obj.chunks.push(entry)
	} else {
		obj._html = module + '/' + entry;
		obj.chunks = [];
		obj.chunks.push(module + '_' + entry)
	}
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

		// console.log(path, entry, filename, module);
		if (module == 'entry') {
			entries[entry] = entries[entry] || [];
			entries[entry].push('./' + path);

		} else {
			entries[module + '_' + entry] = entries[module + '_' + entry] || [];
			entries[module + '_' + entry].push('./' + path);

		}
	})
	// console.log(entries);
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