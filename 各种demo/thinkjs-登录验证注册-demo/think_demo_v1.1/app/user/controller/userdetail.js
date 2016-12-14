'use strict';var _inherits = require('babel-runtime/helpers/inherits')['default'];var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];exports.__esModule = true;var _baseJs = require(

'./base.js');var _baseJs2 = _interopRequireDefault(_baseJs);var _default = (function (_Base) {_inherits(_default, _Base);function _default() {_classCallCheck(this, _default);_Base.apply(this, arguments);}


    /**
     * index action
     * @return {Promise} []
     */_default.prototype.

    indexAction = function indexAction() {var 

        model, 
        insertID;return _regeneratorRuntime.async(function indexAction$(context$2$0) {while (1) switch (context$2$0.prev = context$2$0.next) {case 0:model = this.model('user_data');context$2$0.next = 3;return _regeneratorRuntime.awrap(model.addMany([
                    { username: 'abc', passwd: '1234', email: 'admin@tataufo.com' }, { 
                        username: 'abcd', 
                        passwd: '1234', 
                        email: 'admin@tataufo.com' }, 
                    { username: 'abcde', passwd: '1234', email: 'admin@tataufo.com' }]));case 3:insertID = context$2$0.sent;return context$2$0.abrupt('return', 

                    this.display());case 5:case 'end':return context$2$0.stop();}}, null, this);};_default.prototype.


    logicAction = function logicAction() {
        return this.display();
        console.log('dd');};return _default;})(_baseJs2['default']);exports['default'] = _default;module.exports = exports['default']; //auto render template file userdetail_index.html