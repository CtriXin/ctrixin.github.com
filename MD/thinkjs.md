# thinkjs

[TOC]



## 创建thinkjs

1. 创建： thinkjs new 项目名 --es6;

2. 安装依赖：

   npm install --registry=https://registry.npm.taobao.org --verbose

3. 启动项目: npm start

## config

基本配置 config/config.js

```
export default {
  port: 8360, //服务监听的端口
  host: "", //服务监听的 host
  encoding: "utf-8", //项目编码
  pathname_prefix: "",  //pathname 去除的前缀，路由解析中使用
  pathname_suffix: ".html", //pathname 去除的后缀，路由解析中使用
  proxy_on: false, //是否使用 nginx 等 web server 进行代理
  hook_on: true,  //是否开启 hook
  cluster_on: false, //是否开启 cluster

  service_on: true, //Service available
  timeout: 120, //120 seconds
  auto_reload: false, //自动重新加载修改的文件，development 模式下使用

  resource_on: true, // 是否处理静态资源请求， porxy_on 开启下可以关闭该配置
  resource_reg: /^(static\/|[^\/]+\.(?!js|html)\w+$)/, //静态资源的正则

  route_on: true, //是否开启自定义路由

  log_pid: false, //是否记录服务的 pid
  log_request: false, //是否打印请求的日志

  create_server: undefined, //自定义启动服务
  output_content: undefined, //自定义输出内容处理方式，可以进行 gzip 处理等
  deny_module_list: [], //禁用的模块列表
  default_module: "home", //默认模块
  default_controller: "index",  //默认的控制器
  default_action: "index", //默认的 Action
  callback_name: "callback", //jsonp 请求的 callback 名称
  json_content_type: "application/json", //json 输出时设置的 Content-Type
  subdomain: {} //子域名部署配置
}



```



## 路径

**默认为index_index.html**

首先 在src中创建文件夹，此文件夹就是：127.0.0.1：8360/“`这里的名称`” 例如src--test_db`（模块）`,访问时就可以访问127.0.0.1：8360/test_db

而127.0.0.1：8360/test_db/`这里的路径（控制器）` 则由模块下controller文件夹中的XXX.js决定，与之对应的，就是**view**/**模块名**/**路径名\*_**方法***.html

例如：

- 在/src中创建test_db`（模块名）`；

- /src/test_db下controller文件夹创建test.js`（路径名）`,路径名又成为**控制器**；

- 在/src/test_db/controller/test.js中写下方法

  ```
  demoAction(){
  //auto render template file test_index.html
  return this.display();
  }
  ```

  则与之对应的则是，/view文件夹下的test_db`模块名对应`文件夹下的，test_demo.html




###  创建项目步骤

1. 在src中创建`**模块**`；
2. 在`**模块**`-->*controller*下创建`**控制器**`
3. 在view中创建名为`**模块**`的文件夹
4. 在文件夹中创建前缀为`**控制器**`_`**方法**`的html
5. 打开浏览器，输入127.0.0.1/8360/模块/控制器/方法

或者 `**在当前项目目录下，执行 thinkjs module xxx，即可创建名为 xxx 的模块。**`



##  路径名.js

此处示例为test.js

**方法Action**e.p：indexAction

```javascript
indexAction(){

 }
```

这里的*代表渲染页面时 将会编译ES6的语法 例如yield
es7语法为 async await分别替代 * 和 yield

一个方法对应一个html，当然如果不需要渲染出来，也可以没有html，但是如果调用方法，一定要有对应方法的**Action**



## 路径常量 

- think.ROOT_PATH

- - 项目的根目录。

- think.RESOURCE_PATH

- - 静态资源根目录，路径为think.ROOT_PATH /www/

- think.APP_PATH

- - APP 代码目录，路径为 think.ROOT_PATH + /app/

- think.THINK_PATH

- - ThinkJS 框架的根目录

- think.THINK_LIB_PATH

- - ThinkJS 框架 lib 目录

- think.getPath(module, type)

- - 查找 model，controller，view 等目录


## 获取表单数据

首先，页面中，也就是html中，必须有相对应的表单，以form为框架
例如：

```html
<form action="/test_db/test/dial" method="post" enctype="multipart/form-data" class="form-horizontal ">

   <div class="form-group">
        <label class="col-md-3 control-label" for="username">用户名</label>
            <div class="col-md-9">
                 <input type="text" id="username" name="username" class="form-control" placeholder="your name is">
                 <span class="help-block">pls insert your name</span>
            </div>
   </div>

   <div class="panel-footer">
        <button type="submit" class="btn btn-sm btn-success">Submit</button>
        <button type="reset" class="btn btn-sm btn-danger">Reset</button>
   </div>
</form>

```

###form

#### method

mothod可为**post**或者**get**

- Get是用来从服务器上获得数据，而Post是用来向服务器上传递数据。
- Get将表单中数据的按照variable=value的形式，添加到action所指向的URL后面，并且两者使用“?”连接，而各个变量之间使用“&”连接；Post是将表单中的数据放在form的数据体中，按照变量和值相对应的方式，传递到action所指向URL。
- - 例如，如果是get,http://127.0.0.1:8360/test_db/test/change/?id=1 此链接带上来id号，如果是用户名密码，所有人就都知道了，所以， **- get方法是不安全的**

##### 获取所有get或者post参数

- let allParams = this.get(); //获取所有 GET 参数
- let allParams = this.post(); //获取所有 POST 参数

#### action

action是你要提交的地址

需要以/**模块**/**路径**/**方法**的格式写

##### name

表单中 input属性或者 radio等属性 需要带上name=“xxx” 此name将会在thinkjs中方便thinkjs获取其数据

例如

```html
<input type="text" id="username" name="username" class="form-control" placeholder="your name is">

```



## 数据库创建

```
CREATE TABLE `table_2` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL DEFAULT '',
  `passwd` varchar(100) NOT NULL DEFAULT '',
  `eat` varchar(255) NOT NULL DEFAULT '',
  `radio` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;


```

提示端口正在使用：

```
lsof -i tcp:'端口号'
sudo kill -9 ‘PID号’


```

## db.js

**src-common-config-db.js**

```
export default {
  type: "mysql", //数据库类型
  host: "127.0.0.1", //数据库 host
  port: "", //端口
  name: "", //数据库名称
  user: "", //账号
  pwd: "", //密码
  prefix: "think_", //数据表前缀
  encoding: "utf8", //数据库编码
  nums_per_page: 10, //一页默认条数
  log_sql: true, //是否记录 sql 语句
  log_connect: true, // 是否记录连接数据库的信息
  cache: { // 查询数据缓存配置
    on: true,
   type: "",
    timeout: 3600
  }
};

```

## thinkjs中获取数据


```javascript
let name = this.post("username");     

let password = this.post('password');

let eat = this.post('text-input');

let radio = this.post('radios');
```
let = var 但是比var好用 **记住就行**



## 变量赋值

控制器中可以通过 **assign** 方法进行变量赋值。

- 赋值单个变量

```javascript
export default class extends think.controlle.base {
  indexAction(){
    this.assign("title", "ThinkJS 官网");
  }
}
```

- 赋值多个变量

```javascript
export default class extends think.controlle.base {
  indexAction(){
    this.assign({
      title: "ThinkJS 官网",
      author: "thinkjs"
    });
  }
}
```

- 获取赋值

```javascript
export default class extends think.controlle.base {
  indexAction(){
    this.assign("title", "ThinkJS 官网");
    let title = this.assign("title");
  }
}
```



## 数据库


```javascript
let model = this.model("username");  //对应的是数据库的表名

let data = await model.limit(2).select(); //查询数据库中的数据，并获取其中的前两条

let insertId = yield model.add({login_name: "xxx", login_password: "yyy"});
```


## session


```javascript
export default {
  type: "file",
  name: "thinkjs", //对应 cookie 的名称
  secret: "", //Session 对应的 cookie 是否需要加密
  timeout: 24 * 3600, //过期时间，默认为一天
  cookie: { // cookie options
  length: 32
  },
  adapter: {
    file: {
      path: think.getPath("common", "runtime") + "/session"
    }
  }
};
```


## 前置操作__before

ThinkJS 支持前置操作，方法名为 __before

- 首先，这个__before只能执行一次，
- 第二，这个__before无论在任何地方，都将会在全部操作执行前运行

**同理__after**



### action

调用 controller 下的 action，返回一个 Promise。自动调用 **before 和** **after** 魔术方法。


```javascript
//调用当前模块下controller里的action
export default class extends think.controller.base {
  * indexAction(){
  //调用user controller下的detail方法
  	let value = yield this.action("user", "detail");
  }
}
```
```javascript
//跨模块调用controller里的action
export default class extends think.controller.base {
  * indexAction(){
  //调用admin模块user controller下的detail方法
  	let value = yield this.action("admin/user", "detail");
  }
}
```



## 输出为json格式

- this.success（‘展现的信息’）
- this.fail（‘展现的信息’）



## 获取上传文件

可以通过 file 方法获取上传的文件


```javascript
export default class extends think.controller.base {
  indexAction(){
    let file = this.file("image");
    let allFiles = this.file(); //获取所有上传的文件
  }
}

```


## 备注

1. 如果需要取一个值，而这个值是在后面的页面中出现的，比如像注册名，注册成功后在登录页面显示的，这样的可以在重定向时，带上设置的参数，

   > return this.redirect('index/?name='+参数名);

2. 修改目录结构 `src/common/config/view.js`

   > export default { file_depr: "/", //将控制器和操作之间的连接符修改为 / }

3. 开启多进程 `src/common/config/config.js` 里 `timeout` 配置

   > export default { timeout: 30, //将超时时间修改为 30s }



