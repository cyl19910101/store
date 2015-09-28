define(function (require) {
    "use strict";

    var _s         = require('app/controller/sharedContentController');
    var controller = require('product/controller');
    var $          = require('jquery');

    $(function () {
        _s.init();
        controller.init();
    });
})
