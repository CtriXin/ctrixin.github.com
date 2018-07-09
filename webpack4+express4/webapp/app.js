// 加载依赖库
const express = require('express');
const fs = require('fs'); //加了文件操作的模块
const path = require('path'); //加了解析路径的模块
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
//多语言
var i18next = require('i18next');
var i18nFsBackend = require('i18next-node-fs-backend');
var i18nextMiddleware = require('i18next-express-middleware');
// 创建项目实例
var app = express();
// 初始化 i18next 多语言
i18next.use(i18nFsBackend).use(i18nextMiddleware.LanguageDetector).init({
  // lng: 'zh-CN', //设置当前翻译的语言(如果没有设置具体的lng,会查看querrustringparameter中是否有?setLng=zh-CN的设置、会检查cookie中是否有i18n曾设置的语言、或检查浏览器语言)
  backend: {
    loadPath: __dirname + '/locales/{{lng}}/translation.json'
  },
  fallbackLng: 'zh-CN', // 未偵測到時的後備語系
  preload: ['en', 'zh-CN'], //预加载某个语言包
});
app.use(i18nextMiddleware.handle(i18next));
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
    tokens['response-time'](req, res), 'ms',
    tokens.date(req, res),
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


//修改语言拦截器
var changeflag = false; //是否需要换语言
var currentlng = 'zh-CN'; //默认语言
app.use(function (req, res, next) {
  //拦截
  var url = req._parsedOriginalUrl.pathname;
  let changeLanguage = url.indexOf('/changelang');
  // console.log(changeLanguage);
  if (changeLanguage > -1) { //看看是否有change语言
    changeflag = true;
    currentlng = req.query['lng']; //获取change后的语言并存起来

  }
  if (changeflag) {
    req.i18n.changeLanguage(currentlng); //将拦截到的每个路由都使change后的语言
  }
  next()
})










console.log('node ENV is ' + app.get('env'));
//路由！！
// 加载路由控制
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testRouter = require('./routes/test');
var templateRouter = require('./routes/template');

// 匹配路径和路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test', testRouter);
app.use('/template', templateRouter);

app.get('/changelang', (req, res) => {
  res.send(''); //什么都不用做，给返回即可，拦截器会处理
})














// 404错误处理
if (app.get('env') === 'product') {
  app.use(function (req, res, next) {
    res.status(404).redirect('/');
  });
}
app.use(function (req, res, next) {
  // res.status(404).send("Sorry, we cannot find that!");
  var err = new Error('你猜咋地？我自己都找不到这个页面，你咋找到的？');
  err.status = 404;
  next(err);
});

// 生产环境，500错误处理 
if (app.get('env') === 'product') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('includes/error', {
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
    error: err,
    layout: false
  });
});


module.exports = app;