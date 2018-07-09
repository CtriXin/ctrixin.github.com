# webpack4 && vue2.x && express 4.x demo





## 安装依赖

```
yarn || npm install
```

推荐yarn安装 快速~

1.1 升级/安装yarn 

```
curl -o- -L https://yarnpkg.com/install.sh | bash
```

1.2 检查你的node版本

```
node -v
```

1.2.1 如果你的node版本低于9 推荐你执行下面的操作

1.2.1.1 安装nvm

```
nvm ls-remote
nvm install v9
# Set 6.1.0 (or another version) as default
nvm alias default 9.xx.xx
nvm ls

查看node version
node -v
如果还低于9 

sudo npm cache clean -f 
nvm use default 
nvm current  (应该显示你所选择的v9.xx)

```





## 运行&&编译

```
npm run dev
npm run watch  -- 监听修改
npm run devserver -- 将会开启127.0.0.1:8089
npm run server -- 自动开启 8888端口
npm run build  -- 生产环境


gulp start -- 将会默认启动监听并启动node

如果你用的是vsCode 且安装了debugForChrome 执行下面的命令
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=3000
启动 chrome
```





## 线上部署

安装`pm2`

执行命令

```
pm2 start pm2.json --env xxxx
e.g: pm2 start pm2.json --env production

如果默认development 
pm2 start pm2.json
```









## 静态资源

执行编译后，将会生成 `dist` 文件夹。

此文件夹内为所有的静态资源。



## 图片

由于引用和其他一些原因，现在图片的引用有两种方法，请取决于你自己的喜好来修改

** 此处已经修复了 可以使用默认引用



### 默认引用

在html里或者css里正常引用图片，url-loader将会处理图片到输出地址`dist/imgInCss/[name]-[hash:5].[ext]` 。

MiniCssExtractPlugin和htmlWebpackPlugin将会把图片地址输出到对应的css和html内容上。

这样做的好处是，在处理的时候，无需管图片的生成地址，只需正常引用即可。

坏处是打包时间可能相应增加，图片文件地址将会比较杂乱无序，但是由于无需管图片的输出地址，所以还好。



### css内background地址同上面默认引用，但是html为传输地址

默认引用同上。

html内为传输地址是这样操作：

1. 默认的`app.js`内设置中间件，设置默认的输出地址

```js
 if (app.get('env') === 'product') {
     res.locals.img_url = 'http://static.xxxx.com/static/img';
 } else {
     res.locals.img_url = '/dist/img';
 }
```

1. 在页面中通过ejs的include方法，引用地址

```ejs
<img src="<%= img_url %>/banner.jpg" alt="">
```



这样做可能需要的是每次添加图片的时候吧前缀改成引用的地址，在预览的时候，编辑器不会自动预览









## 项目结构

   |-- README
   |-- bin
   |   |-- 发布脚本和压缩脚本 
   |-- webapp   
   |   |-- bin
   |   |   |-- www -->启动脚本命令
   |   |-- build
   |   |   |-- webpack.base.conf.js
   |   |   |-- webpack.dev.conf.js
   |   |   |-- webpack.devserver.conf.js
   |   |   |-- webpack.prod.conf.js
   |   |   |-- webpack.rules.conf.js
   |   |-- dist 
   |   |-- webpack生成的打包后静态资源
   |   |-- routes 
   |   |-- 路由规则
   |   |-- src
   |   |   |-- css
   |   |   |-- entry
   |   |   |-- img
   |   |   |-- js
   |   |   |-- pages
   |   |   |-- vue
   |   |-- views
   |   |-- webpack生成的打包后html
   |   |-- app.js --> express规则
   |   |-- gulpfile.js --> gulp文件
   |-- demo-webpack —>纯webpack4的环境















## 已优化的项目

1. ParallelUglifyPlugin

   Webpack 默认提供的 UglifyJS 插件，由于采用单线程压缩，速度颇慢 ；推荐采用 webpack-parallel-uglify-plugin 插件，她可以并行运行 UglifyJS 插件，更加充分而合理的使用 CPU 资源，这可以大大减少的构建时间

2. 用 Happypack 来加速代码构建

3. 显示进度管理

4. 通过文件夹判定文件，文件判定entry，定义了统一的entry路径

5. 消除冗余css代码，treeShaking，页面中没用到的样式将不再显示

6. 公共资源提取

7. 图片自动处理并根据环境进行压缩

