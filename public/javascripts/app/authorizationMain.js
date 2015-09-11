define(function (require) {
    var _s                      = require('app/controller/sharedContentController');
    var authorizationController = require('app/controller/authorizationController');
    var $                       = require('jquery');
    _s.initAjaxToken();
    $(function () {
        authorizationController.initUI();
    });
})