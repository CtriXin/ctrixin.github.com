'use strict';var _inherits = require('babel-runtime/helpers/inherits')['default'];var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];exports.__esModule = true;var _baseJs = require(

'./base.js');var _baseJs2 = _interopRequireDefault(_baseJs);var _default = (function (_think$controller$base) {_inherits(_default, _think$controller$base);function _default() {_classCallCheck(this, _default);_think$controller$base.apply(this, arguments);}


    /**
     * index action
     * @return {Promise} []
     */_default.prototype.
    indexAction = function indexAction() {return _regeneratorRuntime.async(function indexAction$(context$2$0) {while (1) switch (context$2$0.prev = context$2$0.next) {case 0:return context$2$0.abrupt('return', 

                    this.display());case 1:case 'end':return context$2$0.stop();}}, null, this);};_default.prototype.


    listAction = _regeneratorRuntime.mark(function listAction() {var 
        name, 
        allFiles;return _regeneratorRuntime.wrap(function listAction$(context$2$0) {while (1) switch (context$2$0.prev = context$2$0.next) {case 0:name = this.post('name');context$2$0.next = 3;return this.file('aa');case 3:allFiles = context$2$0.sent;
                    console.log(allFiles);case 5:case 'end':return context$2$0.stop();}}, listAction, this);});return _default;})(think.controller.base);exports['default'] = _default;module.exports = exports['default']; //auto render template file index_index.html