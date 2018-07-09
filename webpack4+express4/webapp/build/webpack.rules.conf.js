const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';
const rules = [{
		test: /\.(sa|sc|c)ss$/,
		use: [
			MiniCssExtractPlugin.loader,
			'css-loader',
			'postcss-loader',
			'sass-loader',
		],
	},
	// {
	// 	test: /\.js$/,
	// 	use: ["babel-loader?cacheDirectory"],
	// 	// 不检查node_modules下的js文件
	// 	exclude: "/node_modules/"
	// },
	{
		test: /\.js/,
		use: 'happypack/loader?id=happy-babel-js', // 增加新的HappyPack构建loader
		include: path.resolve('./src'),
		exclude: /node_modules/
	},
	{
		test: /\.vue$/,
		use: 'vue-loader'
	},
	{
		test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
		use: process.env.NODE_ENV === 'testing' ? [{
			loader: "url-loader",
			options: {
				limit: 5 * 1024, //小于这个时将会已base64位图片打包处理
				// 图片文件输出的文件夹
				// name: devMode ? '/images/[name].[ext]' : '/images/[name]-[hash:5].[ext]',
				// '../imgInCss/[name]-[hash:5].[ext]'
				name: filename => path.relative(__dirname, filename).replace('../src/img', "/images")
			}
		}, { //压缩图片要在file-loader之后使用
			loader: 'image-webpack-loader',
			options: {
				bypassOnDebug: true
			}
		}] : [{
				loader: "url-loader",
				options: {
					limit: 5 * 1024, //小于这个时将会已base64位图片打包处理
					// 图片文件输出的文件夹
					name: devMode ? filename => path.relative(__dirname, filename).replace('../src/img', "/images") : filename => path.relative(__dirname, filename).replace('../src/img', "images")
				}
			}

		]
	},
	{
		test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
		loader: 'url-loader',
		options: {
			limit: 10000,
		}
	},
	{
		test: /\.html$/,
		// html中的img标签
		use: ["html-withimg-loader"]
	}
];
module.exports = rules;