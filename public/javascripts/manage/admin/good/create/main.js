/**
 * Created by cyl on 15/09/15.
 */
define(function (require) {
    var _s               = require('app/controller/sharedContentController');
    var controller = require('manage/admin/good/create/controller');
    var $                = require('jquery');

    $(function () {
        _s.init();
        controller.initUI();
    });
})
