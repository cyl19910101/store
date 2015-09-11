define(function (require) {
    var _s               = require('app/controller/sharedContentController');
    var manageController = require('app/controller/manageController')
    var $                = require('jquery');

    _s.initAjaxToken();

    $(function () {
        manageController.initUI();
    });
})