define(function (require) {
    require('app/controller/sharedContentController');
    var manageController = require('app/controller/manageController')
    var $                = require('jquery');
    // config page content

    //config fileinput
    $(function () {
        manageController.initUI();
    });
})