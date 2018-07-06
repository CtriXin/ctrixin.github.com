// 加载依赖库
const express = require('express');
const fs = require('fs');//加了文件操作的模块
const path = require('path'); //加了解析路径的模块
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
// 创建项目实例
var app = express();
//设置模板引擎
//注册模板文件的后缀名为html，默认为ejs
app.engine('.html', require('ejs').__express);
// 定义EJS模板引擎和模板文件位置
app.set('views', path.join(__dirname, 'views'));
//设置模板文件的后缀名为html，避免了res.render('home.html',...)的繁琐
app.set('view engine', 'html'); // app.set('view engine', 'ejs');
//设置模板文件文件夹,__dirname为全局变量,表示网站根目录
app.set('views', __dirname + '/views');
// 定义数据解析器
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
// 定义cookie解析器
app.use(cookieParser());
// 定义icon图标
// app.use(favicon(__dirname + '/public/favicon.ico'));
// 定义静态文件目录
app.use(express.static(path.join(__dirname)));
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res), '- takes',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}));





//中间件
// var middleware = {
//   globalLocals: function (req, res, next) {
//     if (app.get('env') === 'product') {
//       res.locals.img_url = 'http://static.xxxx.com/static/img';
//     } else {
//       res.locals.img_url = '/dist/img';
//     }
//     next();
//   },
// };
// app.use(middleware.globalLocals);

console.log('node ENV is ' + app.get('env'));










//路由！！
// 加载路由控制
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// 匹配路径和路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
















// 404错误处理
if (app.get('env') === 'product') {
  app.use(function (req, res, next) {
    res.status(404).redirect('/');
  });

}
app.use(function (req, res, next) {
  res.status(404).send("Sorry, we cannot find that!");
});




// 生产环境，500错误处理 
if (app.get('env') === 'product') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
}

// 开发环境，500错误处理和错误堆栈跟踪
app.use(function (err, req, res, next) {
  console.log('errrorrr');
  res.status(err.status || 500);
  res.render('includes/error', {
    message: err.message,
    error: err
  });
});


module.exports = app;