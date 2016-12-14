'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  host: '127.0.0.1',
  port: '',
  name: 'think_demo',
  user: 'root',
  pwd: 'root',
  prefix: 'think_',
  encoding: 'utf8',
  nums_per_page: 10,
  log_sql: true,
  log_connect: true,
  //connectionLimit: 10,
  cache: {
    on: true,
    type: '',
    timeout: 3600
  }
};