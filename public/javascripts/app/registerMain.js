define(function (require) {
    require('app/controller/sharedContentController');
    var registerController = require('app/controller/registerController');
    var $                 = require('jquery');
    $(function () {
        registerController.initUI();
    });
})