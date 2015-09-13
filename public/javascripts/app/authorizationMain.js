define(function (require) {
    var _s                      = require('app/controller/sharedContentController');
    var authorizationController = require('app/controller/authorizationController');
    var $                       = require('jquery');
    $(function () {
        _s.init();
        authorizationController.initUI();
    });
})