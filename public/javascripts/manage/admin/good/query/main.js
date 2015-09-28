/**
 * Created by cyl on 15/09/15.
 */
define(function (require) {
    "use strict";

    var _s         = require('app/controller/sharedContentController');
    var $          = require('jquery');
    var controller = require('manage/admin/good/query/controller');
    $(function () {
        _s.init();
        controller.initUI();
    });
})
