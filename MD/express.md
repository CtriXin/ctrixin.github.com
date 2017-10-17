# express

[TOC]



## 安装

1. 创建需要的文件夹
2. 进入文件夹
3. 创建package.json文件（npm.init）
4. 入口文件改成自己需要的
5. 安装express到项目中
6. ` npm install express --save`



## 使用

### 基础命令 ’Hello world‘

```javascript
var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```

命令行运行`node 入口文件名.js`将开启

此项目将在3000端口上侦听链接，对应的响应URL为('/')



### 更改端口

```javascript
var server = app.listen(8081,function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('sss',host,port)
})
```



### 提供静态文件

如果有静态文件 要使用`express.static`内置中间件函数，如：

```javascript
app.use(express.static('public'))
```

创建了public的静态文件夹

同样也可以创建多个静态资源目录

```javascript
app.use(express.static('public'));
app.use(express.static('files'));
```

向 `express.static` 函数提供的路径相对于您在其中启动 `node` 进程的目录。如果从另一个目录运行 Express 应用程序，那么对于提供资源的目录使用绝对路径会更安全：

```javascript
app.use('/static', express.static(__dirname + '/public'));
```











## 生成器创建应用

### 安装

1. 全局安装express-generator
2. `npm install express-generator -g`
3. 想要查看命令选项的话 可以`express -h`
4. 创建应用
5. `express --view =ejs myapp`
6. 进入项目
7. 安装依赖`npm install`
8. 运行项目 `DEBUG=myapp:* npm start`



###  