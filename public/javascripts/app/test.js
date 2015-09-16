define(function (require) {
    var _s = require('app/controller/sharedContentController');
    var $  = require('jquery');
    $('#getbtn').click(function () {
        $.ajax({
            url    : '/api/v1/ti',
            method : 'GET',
            success: function (res) {
                console.log(res);
            }
        })
    })
    $(function () {
        _s.init();
    });
});