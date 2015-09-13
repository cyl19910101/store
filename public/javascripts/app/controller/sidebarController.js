define(function (require) {
    var $ = require('jquery');

    var initSidebarToggle = function () {
        //debug
        $('#b_t').click(function (e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
        });
    };

    var _s = function () {
    };

    _s.prototype = {
        initSidebarToggle: initSidebarToggle
    };
    return new _s();
});
