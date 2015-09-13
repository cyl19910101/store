define(function (require) {
    var _s               = require('app/controller/sharedContentController');
    var manageController = require('app/controller/manageController')
    var $                = require('jquery');


    $(function () {
        _s.init();
        manageController.initUI();
    });
})