/**
 * Created by cyl on 15/09/15.
 */
define(function (require) {
    "use strict";

    var goodAPI = require('app/api/good');
    var _c      = function () {
    };


    var initUI = function () {
        var callbackObj = {
            success : function (res) {
                console.log(res);
            }, error: function () {
                console.log('error');
            }
        };
        goodAPI.getIndex(callbackObj);
    };

    _c.prototype = {initUI: initUI};
    return new _c();
});
