define(function (require) {
    var _s         = require('app/controller/sharedContentController');
    var controller = require('user/controller');
    var $          = require('jquery');

    $(function () {
        _s.init();
        controller.init();
    });
})