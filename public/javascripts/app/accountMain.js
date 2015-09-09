define(function (require) {
    require('app/controller/sharedContentController');
    var accountController = require('app/controller/accountController');
    var $                 = require('jquery');
    $('#loginBtn').click(accountController.login);
})