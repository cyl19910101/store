/**
 * Created by cyl on 15/09/15.
 */
define(function (require) {
    "use strict";

    var $ = require('jquery');

    //TODO: add more search function
    var get = function (goodCode, callbackObj) {
        $.ajax({
            url    : '/api/v1/good/' + goodCode,
            method : 'GET',
            success: callbackObj.success,
            error  : callbackObj.error
        });
    };

    /**
     * post good to server
     * @param good
     * @param callbackObj
     */
    var post = function (good, callbackObj) {
        $.ajax({
            url        : '/api/v1/good',
            method     : 'POST',
            data       : JSON.stringify(good),
            contentType: 'application/json; charset=utf-8',
            dataType   : 'json',
            success    : callbackObj.success,
            error      : callbackObj.error
        });
    };

    /**
     * TODO: more url like adminIndex & merchantIndex
     * index good
     * @param callbackObj, should contain two function : success && error
     */
    var getIndex = function (callbackObj) {
        $.ajax({
            url     : '/api/v1/good/index',
            method  : 'GET',
            dataType: 'json',
            success : callbackObj.success,
            error   : callbackObj.error
        });
    };

    var _g = function () {

    };

//exports api
    _g.prototype = {
        get     : get,
        post    : post,
        getIndex: getIndex
    };
    return new _g();
})
;
