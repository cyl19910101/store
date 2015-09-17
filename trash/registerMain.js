define(function (require) {
    var _s                 = require('app/controller/sharedContentController');
    var registerController = require('app/controller/registerController');
    var $                  = require('jquery');


    $(function () {
        _s.init();
        registerController.initUI();
    });
})