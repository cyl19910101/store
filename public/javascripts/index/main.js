define(function (require) {
    "use strict";

    var _s         = require('app/controller/sharedContentController');
    var controller = require('index/controller');
    var $          = require('jquery');

    $(function () {
        _s.init();
        controller.init();
    });
})
