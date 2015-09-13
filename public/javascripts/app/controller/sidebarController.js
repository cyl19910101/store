define(['jquery', '_MENU'], function ($, _MENU) {

    var initSidebarToggle = function () {
        $('#b_t').click(function (e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
        });
        $('#menu').metisMenu();
    };

    //TODO: scrollspy collapse
    var _s = function () {
    };

    _s.prototype = {
        initSidebarToggle: initSidebarToggle
    };
    return new _s();
});
