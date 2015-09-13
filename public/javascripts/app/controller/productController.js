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
                    if (res)
                        if (res.success) {
                            console.log(res.good);
                        }
                        else {
                            console.log(res.error);
                        }
                    else {
                        //TODO:
                    }
                },
                error  : function () {
                    //TODO
                }
            });
            $('.carousel').carousel({
                interval: 5000 //changes the speed
            })
        }
    }

    return new _p();
});