define(function (require) {
    var goodController = require('app/controller/goodController');
    var _q             = require('app/util/queryURL');
    var _p             = function () {
    };

    _p.prototype = {
        init: function () {
            var goodCode = _q.QueryString.item;
        }
    }

    return new _p();
});