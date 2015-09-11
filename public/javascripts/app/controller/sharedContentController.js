/**
 * Created by cyl on 7/09/15.
 * preprocess the page to show login btn or logout btn
 */
define(function (require) {
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

    var logoutBtnHTML = '<a id="logoutBtn" class="config-navbar-brand"><span class="glyphicon glyphicon-log-out"></span></a>';
    var manageBtnHTML = '<a href="/manage" class="config-navbar-brand"><span class="glyphicon glyphicon-cog"></span></a>';
    var userBtnHTML   = '<a href="/user" class="config-navbar-brand"><span class="glyphicon glyphicon-user"></span></a>';
    var cartBtnHTML   = '<a href="/cart" class="config-navbar-brand"><span class="glyphicon glyphicon-shopping-cart"></span></a>';
    //config user area, show logout btn etc
    if (authorization.isAuthenticated()) {
        if (authorization.getTokenRole() === 'admin') {
            $('#accountArea').html(manageBtnHTML + logoutBtnHTML);
            $('#logoutBtn').click(accountController.logout);
        }
        else if (authorization.getTokenRole() === 'customer') {
            $('#accountArea').html(userBtnHTML + cartBtnHTML + logoutBtnHTML);
            $('#logoutBtn').click(accountController.logout);

        } else if (authorization.getTokenRole() === 'merchant') {
            //TODO:
        } else {
            //TODO:error
        }
    }
    else {
        $('#accountArea').html(userBtnHTML + cartBtnHTML);
    }
});
