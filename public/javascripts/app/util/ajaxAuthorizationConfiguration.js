/**
 * Created by cyl on 17/09/15.
 */
define(function (require) {
    "use strict";

    var $ = require('jquery');

    var initAjaxToken = function () {
        $.ajaxSetup({
            'beforeSend': function (xhr) {
                if (localStorage.getItem('token')) {
                    xhr.setRequestHeader('Authorization',
                        'Bearer ' + localStorage.getItem('token'));
                }
            }
        });
    };

    var _a = function () {
    };

    _a.prototype = {
        initAjaxToken: initAjaxToken
    };
    return new _a();
});
