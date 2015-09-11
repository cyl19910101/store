define(function (require) {
    var $              = require('jquery');
    var goodController = require('app/controller/goodController');
    $(function () {
        goodController.getGoodIndex();
    });
});