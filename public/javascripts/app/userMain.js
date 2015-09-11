define(function (require) {
    var _s             = require('app/controller/sharedContentController');
    var userController = require('app/controller/userController');
    var $              = require('jquery');

    _s.initAjaxToken();

    $(function () {
        userController.initUI();
    });
})