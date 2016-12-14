'use strict';
/**
 * db config
 * @type {Object}
 */exports.__esModule = true;exports["default"] = 
{ 
  type: "mysql", //数据库类型
  host: "127.0.0.1", //数据库 host
  port: "", //端口
  name: "demo1", //数据库名称
  user: "root", //账号
  pwd: "123456", //密码
  prefix: "", //数据表前缀
  encoding: "utf8", //数据库编码
  nums_per_page: 10, //一页默认条数
  log_sql: true, //是否记录 sql 语句
  log_connect: true, // 是否记录连接数据库的信息
  cache: { // 查询数据缓存配置
    on: true, 
    type: "", 
    timeout: 3600 } };module.exports = exports["default"];