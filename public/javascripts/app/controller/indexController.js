define(function (require) {
    var goodController = require('app/controller/goodController');
    var _i             = function () {
    };

    _i.prototype = {
        init: function () {
            goodController.getGoodIndex();
        }
    }

    return new _i();
});