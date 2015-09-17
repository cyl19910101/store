define(function (require) {
    var _s = require('app/controller/sharedContentController');
    var _i = require('app/controller/indexController');
    var $  = require('jquery');
    $(function () {
        _s.init();
        _i.init();
    });
})
