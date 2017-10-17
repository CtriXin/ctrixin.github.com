# Thinkjs + vue.js + webpack + gulp 项目

此项目为第一次测试版本，指为前后分离而开发。


感谢*libertyalone*




[TOC]





## 项目结构

### src

源代码目录，使用 `ES6` 模式创建项目才有该目录。项目启动时会自动将 `src` 目录下的文件编译到 `app` 目录下。

如果没有使用 ES6 特性创建项目，则直接有 `app/` 目录。

_注：如果是生产环境下，运行production.js，thinkjs将不会自动编译，请自行编译_

#### src/common/config

配置文件，这里放一些通用的配置。

其中：路由配置、hook 配置、本地化配置等必须放在这里。

#### src/common/config/env

此目录下为项目的环境变量，比如现在自定义了api_url（接口的访问路径）,静态资源路径



### components

 该目录下文件为编译前文件，压缩编译前代码在此项目中编辑，并最终通过webpack/gulp压缩打包

编译生成的静态资源文件均在/www/static/ 对应目录下

#### css

此文件夹为项目的css，所有项目均在此文件夹内，请尽量书写scss文件，并尽量精简

此文件夹下有个vue文件夹，此文件夹为组件化vue文件的对应css

#### entry

项目的入口文件，命名规则为` 项目名文件夹 --> 入口文件.js`，请尽量驼峰法命名

#### js

此项目为对应的js文件，而utils为工具类js

#### sprite

雪碧图文件，此项目现在在开发阶段，图片需要每次存在此文件夹下，执行命令，压缩后的雪碧图和css文件在`www/static/sprite/output`文件夹下，而源图片也会存在此文件夹下命名为时间的文件夹，所以如果需要再次压缩的话，需要自己把图片考回到component/static文件夹下再次压缩

#### vue

此文件夹为vue的组件，规则再另一个文档里





### img

此文件夹为图片文件夹，执行命令后生成的压缩后文件均在/www/static/img 对应目录下





## gulp命令

### 图片压缩

`gulp imgMini` 执行此命令将执行如下操作

1. 从源文件压缩图片到 `www/static/img` 
2. 删除源文件，以便下一步操作
3. 从`www/static/img`文件夹中把图片 复制到源图片文件夹

此命令需要多次执行，以便达到最好的效果



### sass转译

此命令将会吧css文件夹编译后转存到`www/static/css`

但是此命令可以由 `sass --watch css` 此命令替换

#### sass watch

需要到component文件夹中 执行 `sass --watch css`命令



###  精灵图

`gulp sprite`

此命令有如下操作：

1. 制作精灵图,并将压缩后的精灵图和css输出到 `www/static/sprite/output` 并以sprite时间为命名
2. 移动精灵图，将原精灵图复制到`www/static/sprite/`文件夹下以时间命名
3. 压缩精灵图
4. 打开精灵图文件夹
5. 压缩一遍

`gulp sprite:clean`

此命令将会清空`components/sprite`文件夹下的图片



这个命令不知为什么会出现冲突，所以现在把命令集成到了npm中，最终执行代码为：

```
npm run sprite
```

npm 命令后面会讲



### webpack压缩

`gulp webpack:build`

此命令将会基于webpack.config.js从而混淆压缩代码



### 上传cdn

`gulp publish`

将`www/static/components`文件夹上传到亚马逊cdn服务器



### dev

`gulp dev`

此命令将会执行压缩图片和sass文件转译



### 清空components文件夹内内容

因为dev打包时webpack并不是混淆压缩，所以components文件夹里的内容并不是最终版，上传之前为了安全起见删除一下



#### probuild

`gulp proBuild`

此命令将会执行

1. 清空components文件夹
2. 混淆压缩打包文件
3. 清理img文件夹，以便以后的新项目压缩图片时候不用再次压缩过去的图片



### proUpload

`gulp proUpload`

上传前的命令，压缩后上传cdn





## 重要命令

## 安装依赖

```
npm install
```



### start server

```
npm start
```

此命令将会启动dev的js文件 访问端口号请自行查看config.js



### 编译

```
npm run watch-compile
```

production环境下不会自动编译，所以需要执行以下



### webpack打包并监听

```
npm run dev
```

此命令将会压缩components文件夹内的文件，并监听随时的变化

同时压缩图片，编译sass



### 精灵图制作并删除

```
npm run sprite
```





### webpack自己命令的混淆压缩

```
npm run devmini
```



### 发布前的deploy

```
npm run deploy
```

此命令将会执行压缩前的静态资源清理，混淆打包webpack，清理图片



### 发布前压缩并上传cdn

```
npm run buildPro
```

此命令将会同上压缩，并上传到cdn







## 项目执行命令

1. 如果不是使用idea运行node.js 则 执行 `npm start`
2. 监听scss文件 `sass --watch css`(进入components/css文件夹)
3. 如果有精灵图需要压缩制作，执行`npm run sprite`
4. 本地监听文件压缩 `npm run dev`
5. 上线前清理并使用 `npm run deploy`
6. 上线使用并上传cdn `npm run buildPro`





## 注意事项

### 接口访问方法

现在的接口访问的方法是入口文件的js发送请求到/proxyroad路径 并由其发送请求到后台服务器