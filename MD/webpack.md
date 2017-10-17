# 创建新页面的步骤

## index.js

1. 在`/Users/songxin/streaming-web-server/MeMeWeb/config/index.js`文件中添加本次创建的页面
2. 入口文件名对应html文件名；如：`xmasGift: path.resolve(__dirname, '../dist/activities/xmas_gift.html'),`



## webpack

1. 在`/Users/songxin/streaming-web-server/MeMeWeb/build/webpack.base.conf.js`文件中，修改base文件，此文件为webpack打包的配置文件
2. 增加入口文件，文件名对应其入口文件，文件名可自定义，一般用main？如：`xmasGift: './src/js/xmasGift/main.js'`,此处的src路径为`/Users/songxin/streaming-web-server/MeMeWeb/src`,src路径下文件普遍为静态资源



## webpack.dev

1. 在`/Users/songxin/streaming-web-server/MeMeWeb/build/webpack.dev.conf.js`文件中，创建模板文件，格式为：

2. ```javascript
   new HtmlWebpackPlugin({
         filename: 'activities/pcu_draw.html',
         template: 'activities/pcu_draw.html',
         inject: true,
         chunks: ['bounsPcu']
       }),
   ```



3. chunks的概念为：被entry所依赖的额外的代码块





## webpack.prod

1. 在`/Users/songxin/streaming-web-server/MeMeWeb/build/webpack.prod.conf.js`文件中，创建模板文件，格式为：