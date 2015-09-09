define(function (require) {
    var _m                  = function () {
    };
    var $                   = require('jquery');
    var good                = require('app/model/good');
    var goodController      = require('app/controller/goodController');
    var fileInputController = require('app/controller/fileInputController');

    var initUI = function () {
        /**
         * init file input ui
         */
        fileInputController.initFileInput();

        /**
         * init other ui
         */
            //insertTag
        $('#insertTagBtn').click(goodController.insertTag);

        //TODO: init post good ui etc
        $('#createGoodForm').on('submit', function (e) {
            e.preventDefault();
            goodController.postGood();
        });
    };

    _m.prototype = {initUI: initUI};
    return new _m();
});