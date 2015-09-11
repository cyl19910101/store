/**
 * Created by cyl on 7/09/15.
 */
define(function (require) {
    var $                 = require('jquery');
    var Sha256            = require('lib/sha256');
    var user              = require('app/model/user');
    var basicUIController = require('app/controller/basicUIController');
    var _va               = require('_va');
    var _a                = function () {
    };

    /**
     * login process
     *                  1st. check data validation
     *                  2nd. get login data
     *                  3rd. send to server
     *                  4th. handle error || deal with response
     */
    var login = function () {
        if (checkUsername() && checkPassword()) {
            var username = $('#inputUsername').val();
            var password = Sha256.hash($('#inputPassword').val());
            // TODO: check if it's a valid value

            $.ajax({
                url     : '/api/v1/accesstokens',
                method  : 'POST',
                data    : {
                    username: username,
                    password: password
                },
                dataType: 'json',
                success : function (res) {
                    if (res.success) {
                        localStorage.setItem('token', res.token);
                        window.location.href = '/';
                    }
                    else {
                        //TODO: tell user login fail
                        alert(res.error);
                    }
                },
                // TODO: deal with error
                error   : function (res) {
                    if (res)
                        alert('错误的用户名或密码！');
                    else alert('服务器处理异常，请联系管理员！');
                }
            });
        }
    };

    /**
     * check input validation
     */
        //check if it's a valid username TODO: check if it's exist username
    var checkUsername = function () {
        var username = $('#inputUsername').val();
        if (_va.isUsername(username)) {
            $('#inputUsername')[0].setCustomValidity('');
            return true;
        }
        $('#inputUsername')[0].setCustomValidity('合法的用户名只可以包含字母数字和下划线，以字母或下划线开头，长度在5～16个字符之间！');
        return false;
    };

    //check if it's a valid password
    var checkPassword = function () {
        var password = $('#inputPassword').val();
        if (_va.isPassword(password)) {
            $('#inputPassword')[0].setCustomValidity('');
            return true;
        }
        $('#inputPassword')[0].setCustomValidity('合法的密码只能包含字母数字和字符，长度在6～16个字符之间，注意区分大小写！');
        return false;
    };

    var checkAndSetInputState = function () {
        basicUIController.clearInputUIMessage($(this));
        if (basicUIController.getInputValidation($(this))) {
            basicUIController.setInputUISuccess($(this));
        } else {
            basicUIController.setInputUIError($(this));
        }
    };

    var initUI = function () {

        //bind login trigger
        $('#loginForm input').keyup(function (e) {
            if (e.keyCode === 13) {
                login();
            }
        });

        //bind check user username handler
        $('#inputUsername').keyup(checkUsername);

        //bind check password && confirm password handler
        $('#inputPassword').keyup(checkPassword);


        //set input class as success or error
        $('#loginForm input').keyup(checkAndSetInputState);
        $('#loginForm input').blur(checkAndSetInputState);

        //bind register btn
        //unbind default submit event
        //post to server
        $('#loginForm').on('submit', function (e) {
            e.preventDefault();
            login();
        });
    };

    _a.prototype = {
        login : login,
        initUI: initUI
    }
    return new _a();
});
