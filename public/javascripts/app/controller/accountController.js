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

    var checkPasswordMatch = function () {
        var password        = $('#inputPassword').val();
        var confirmPassword = $('#inputConfirmPassword').val();
        if(password !== confirmPassword) {
            $('#inputConfirmPassword')[0].setCustomValidity('输入的密码不匹配');
            return false;
        }
        $('#inputConfirmPassword')[0].setCustomValidity('');
        return true;
    };

    var getUserDataFromInput = function () {
        var username = $('#inputUsername').val();
        var name     = $('#inputConfirmPassword').val();
        var password = $('#inputPassword').val();
        var email    = $('#inputEmail').val();
    };

    var initUI = function () {

        $('#loginBtn').click(login);

        //bind confirm password handler
        $('#inputUsername').change(checkPasswordMatch);
        $('#inputConfirmPassword').change(checkPasswordMatch);

        //bind register btn
        //unbind default submit event
        //post to server
        $('#registerForm').on('submit', function (e) {
            e.preventDefault();
        });
    };

    _a.prototype = {
        login : login,
        logout: logout,
        initUI: initUI
    }
    return new _a();
});
