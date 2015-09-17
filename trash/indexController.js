define(function (require) {
    var goodController = require('app/controller/goodController');
    var _i             = function () {
    };

    _i.prototype = {
        init: function () {
            goodController.showGoodIndex();
        }
    }

    return new _i();
});