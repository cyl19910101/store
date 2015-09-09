/**
 * Created by cyl on 7/09/15.
 */
define(function (require) {
    var $      = require('jquery');
    var Sha256 = require('lib/sha256');
    var user   = require('app/model/user');
    var _a     = function () {
    };
    var login  = function () {
        var username = $('#inputUsername').val();
        var password = Sha256.hash($('#inputPassword').val());
        // TODO: check if it's a valid value

        $.ajax({
            url    : '/api/v1/accesstokens',
            method : 'POST',
            data   : {
                username: username,
                password: password
            },
            success: function (data) {
                localStorage.setItem('token', data.token);
                alert('登录成功，管理员。')
                window.location.href = '/';
            },
            // TODO: deal with error
            error  : function () {
            }
        });
    };

    var logout = function () {
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
        }
        window.location.href = '/';
    };

    /**
     * register:    1st get register data
     *              2nd check data validation
     *              3rd send to server
     *              4th handle error or deal with response
     */
    var register = function () {
    };

    var getUserDataFromInput = function () {
        //username : undefined,
        //    name     : undefined,
        //    pwd      : undefined,
        //    status   : undefined,
        //    email    : undefined,
        //    level    : undefined,
        //    //role     :undefined,
        //    phone    : undefined,
        //    //the three below is array
        //    addresses: undefined,
        //    cart     : undefined,
        //    orders   : undefined
        var username        = $('#inputUsername').val();
        var basicPrice  = $('#inputPassword').val();
        var stock       = $('#inputConfirmPassword').val();
        var brief       = $('#inputEmail').val();
        //
        //good.name        = name;
        //good.basicPrice  = basicPrice;
        //good.stock       = stock;
        //good.brief       = brief;
        //good.description = description;
        //good.code        = code || new Date().getTime();
        //good.images      = objectKey.getObjectKeys(imageList);
        //good.tags        = objectKey.getObjectKeys(goodTags);
        //input#inputUsername.form-control(type='text', placeholder='用户名', required autofocus)
        //label.sr-only(for='inputPassword')
        //    input#inputPassword.form-control(type='password', placeholder='密码', required)
        //label.sr-only(for='inputConfirmPassword')
        //    input#inputConfirmPassword.form-control(type='password', placeholder='confirm密码', required)
        //label.sr-only(for='inputEmail')
        //    input#inputEmail.form-control(type='email', placeholder='email, required & can not be changed', required)
    };

    var initUI = function () {

        $('#loginBtn').click(login);

        //bind register btn
        //unbind default submit event
        //post to server
        $('#registerBtn').on('submit', function (e) {
            e.preventDefault();
            register();
        });
    };

    _a.prototype = {
        login : login,
        logout: logout,
        initUI: initUI
    }
    return new _a();
});
