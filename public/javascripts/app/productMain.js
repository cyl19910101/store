define(function (require) {
    var _s = require('app/controller/sharedContentController');
    var _p = require('app/controller/productController');
    var $  = require('jquery');
    $(function () {
        _s.init();
        _p.init();
    });
})
