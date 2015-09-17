/**
 * Created by cyl on 7/09/15.
 */
define(function (require) {
    var _a = function () {
    };

    var logout = function () {
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
        }
        window.location.href = '/';
    };

    _a.prototype = {
        logout: logout
    }
    return new _a();
});
