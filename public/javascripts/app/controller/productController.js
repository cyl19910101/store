define(function (require) {
    var $              = require('jquery');
    var goodController = require('app/controller/goodController');
    var _q             = require('app/util/queryURL');
    var _p             = function () {
    };

    _p.prototype = {
        init: function () {
            var goodCode = _q.QueryString.item;
            //debug
            $.ajax({
                url    : '/api/v1/good/' + goodCode,
                method : "GET",
                success: function (res) {
                    if (res.success) {
                        console.log(res.data);
                    }
                    else {
                        console.log(res.error);
                    }
                },
                error  : function () {
                    //TODO
                }
            });
        }
    }

    return new _p();
});