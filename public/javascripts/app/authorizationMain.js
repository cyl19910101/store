define(function (require) {
    require('app/controller/sharedContentController');
    var authorizationController = require('app/controller/authorizationController');
    var $                 = require('jquery');
    $(function () {
        authorizationController.initUI();
    });
})