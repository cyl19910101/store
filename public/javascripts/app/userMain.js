define(function (require) {
    require('app/controller/sharedContentController');
    var userController = require('app/controller/userController');
    var $                 = require('jquery');
    $(function () {
        userController.initUI();
    });
})