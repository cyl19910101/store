/**
 * Created by cyl on 10/09/15.
 */
define(function (require) {
    var _va = require('validator');

    //is name : length >= 2 <= 7
    //TODO: make it more useful
    _va.extend('isName', function (str) {
        return str.length >= 2 && str.length <= 7;
    })

    //is username : contains only letters and numbers and '_',
    // only start with letters or '_',
    // length must between 5~16
    _va.extend('isUsername', function (str) {
        var _valid = /^[A-Z_][0-9A-Z_]{4,15}$/i;
        return _valid.test(str);
    });

    // is password : contains only ascii characters
    // length must between 6~16
    _va.extend('isPassword', function (str) {
        if (str.length >= 6 && str.length <= 16) {
            return _va.isAscii(str);
        }
        return false;
    });

    return _va;
});
