'use strict';var _inherits = require('babel-runtime/helpers/inherits')['default'];var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];exports.__esModule = true;var _baseJs = require(

'./base.js');var _baseJs2 = _interopRequireDefault(_baseJs);var _default = (function (_Base) {_inherits(_default, _Base);function _default() {_classCallCheck(this, _default);_Base.apply(this, arguments);}


    /**
     * index action
     * @return {Promise} []
     */_default.prototype.
    indexAction = function indexAction() {return _regeneratorRuntime.async(function indexAction$(context$2$0) {while (1) switch (context$2$0.prev = context$2$0.next) {case 0:
                    this.assign({ 
                        nameinfo: '你好请输入姓名', 
                        text: "", 
                        Qmark: '', 
                        Qtext: '' });return context$2$0.abrupt('return', 

                    this.display());case 2:case 'end':return context$2$0.stop();}}, null, this);};_default.prototype.


    loginAction = function loginAction() {var 
        self, 
        name, 
        password, 
        model, 
        data;return _regeneratorRuntime.async(function loginAction$(context$2$0) {while (1) switch (context$2$0.prev = context$2$0.next) {case 0:self = this;name = this.post('name');password = this.post('pwd');model = this.model('think_user');context$2$0.next = 6;return _regeneratorRuntime.awrap(model.where({ name: name, pwd: password }).select());case 6:data = context$2$0.sent;
                    console.log('数据库中的同样数据的条数: ' + data.length, '用户名: ' + name, '密码: ' + password);if (!
                    think.isEmpty(data)) {context$2$0.next = 29;break;}
                    console.log('数据库有没有此数据: ' + '0');if (!(
                    name == "" && password == "")) {context$2$0.next = 15;break;}
                    this.assign({ 
                        nameinfo: '用户名密码不能为空', 
                        text: "", 
                        Qmark: '', 
                        Qtext: '' });return context$2$0.abrupt('return', 

                    this.display('index'));case 15:if (!(
                    name == '')) {context$2$0.next = 20;break;}
                    this.assign({ 
                        nameinfo: '用户名不能为空', 
                        text: "", 
                        Qmark: '请输入用户名', 
                        Qtext: '' });return context$2$0.abrupt('return', 

                    this.display('index'));case 20:if (!(
                    password == "")) {context$2$0.next = 25;break;}
                    this.assign({ 
                        nameinfo: '密码不能为空', 
                        text: "", 
                        Qmark: '', 
                        Qtext: '请输入密码' });return context$2$0.abrupt('return', 

                    this.display('index'));case 25:

                    this.assign({ 
                        nameinfo: '对不起,数据库中并没有你的数据', 
                        text: "请再次验证", 
                        Qmark: '', 
                        Qtext: '' });

                    //console.log('返回错误信息为: '+this.fail);
                    //return this.display('index')
                    return context$2$0.abrupt('return', this.fail(12, 'cuowu'));case 27:context$2$0.next = 33;break;case 29:



                    console.log('pass');
                    this.assign('nameID', name);
                    console.log(name);return context$2$0.abrupt('return', 
                    self.display('act'));case 33:case 'end':return context$2$0.stop();}}, null, this);};_default.prototype.




    signformAction = function signformAction() {var 
        name, 
        password, 
        model, 
        insertId;return _regeneratorRuntime.async(function signformAction$(context$2$0) {while (1) switch (context$2$0.prev = context$2$0.next) {case 0:name = this.post('name_sign');password = this.post('pwd_sign');model = this.model('think_user');context$2$0.next = 5;return _regeneratorRuntime.awrap(model.add({ name: name, pwd: password }));case 5:insertId = context$2$0.sent;
                    this.assign({ 
                        name: name, 
                        password: password });

                    console.log('success');context$2$0.next = 10;return _regeneratorRuntime.awrap(
                    this.session('getnames', name));case 10:return context$2$0.abrupt('return', 
                    this.redirect('index_sign'));case 11:case 'end':return context$2$0.stop();}}, null, this);};_default.prototype.


    indexSignAction = function indexSignAction() {var 
        getname;return _regeneratorRuntime.async(function indexSignAction$(context$2$0) {while (1) switch (context$2$0.prev = context$2$0.next) {case 0:context$2$0.next = 2;return _regeneratorRuntime.awrap(this.session('getnames'));case 2:getname = context$2$0.sent;
                    this.assign({ 
                        nameinfo: '恭喜, ' + getname + ' 注册成功', 
                        text: '请用您的用户名密码登录', 
                        Qmark: '', 
                        Qtext: '' });return context$2$0.abrupt('return', 

                    this.display('index'));case 5:case 'end':return context$2$0.stop();}}, null, this);};_default.prototype.


    signAction = function signAction() {
        return this.display();};_default.prototype.


    actAction = function actAction() {
        return this.display('');};return _default;})(_baseJs2['default']);exports['default'] = _default;module.exports = exports['default'];