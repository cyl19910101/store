define(function (require) {
    var _m                  = function () {
    };
    var $                   = require('jquery');
    var good                = require('app/model/good');
    var goodController      = require('app/controller/goodController');
    var fileInputController = require('app/controller/fileInputController');

    var initUI = function () {
        /**
         * init file input ui
         */
        fileInputController.initFileInput();

        /**
         * init other ui
         */
        goodController.initUI();
    };

    _m.prototype = {initUI: initUI};
    return new _m();
});