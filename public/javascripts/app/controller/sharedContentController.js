/**
 * Created by cyl on 7/09/15.
 * preprocess the page to show login btn or logout btn
 */
define(function (require) {
    //var authorization = require('app/util/authorization');
    //authorization.configToken();
    var $                 = require('jquery');
    var accountController = require('app/controller/accountController');
    require('_BS');
    $.ajaxSetup({
        'beforeSend': function (xhr) {
            if (localStorage.getItem('token')) {
                xhr.setRequestHeader('Authorization',
                    'Bearer ' + localStorage.getItem('token'));
            }
        }
    });

    //config user area, show login btn or logout btn etc
    if (authorization.isAuthenticated() && authorization.getTokenUser() === 'admin') {
        $('#accountArea').html('<a href="/manage" class="config-navbar-brand"><span class="glyphicon glyphicon-cog"></span></a><a id="logoutBtn" class="config-navbar-brand"><span class="glyphicon glyphicon-log-out"></span></a>');
        $('#logoutBtn').click(accountController.logout);
    }
    else {
        $('#accountArea').html('<a href="/account" class="config-navbar-brand"><span class="glyphicon glyphicon-user"></span></a><a href="/cart" class="config-navbar-brand"><span class="glyphicon glyphicon-shopping-cart"></span></a>');
    }
});
