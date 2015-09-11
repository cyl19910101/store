/**
 * Created by cyl on 7/09/15.
 */
define(function (require) {
    var $                 = require('jquery');
    var Sha256            = require('lib/sha256');
    var user              = require('app/model/user');
    var basicUIController = require('app/controller/basicUIController');
    var _va               = require('_va');
    var _r                = function () {
    };

    /**
     * register:
     *              1st check data validation
     *              2nd get register data
     *              3rd send to server
     *              //TODO:
     *              4th handle error or deal with response
     */
    var register = function () {
        if (checkUsername() && checkPassword() && checkPasswordMatch() && checkName() && checkEmail()) {
            getUserDataFromInput();
            $.ajax({
                url        : '/api/v1/user',
                method     : 'POST',
                data       : JSON.stringify(user),
                contentType: 'application/json; charset=utf-8',
                dataType   : 'json',
                success    : function (res) {
                    if (res.success) {
                        alert('注册成功，感谢您的支持！');
                        window.location.href = '/';
                    } else {
                        //TODO: give more detail
                        alert('注册有错误产生，很抱歉注册失败');
                        console.log(res.error);
                    }
                },
                error      : function () {
                    //TODO: give more detail
                    alert('注册有错误产生，很抱歉注册失败');
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

    var checkPasswordMatch = function () {
        var password        = $('#inputPassword').val();
        var confirmPassword = $('#inputConfirmPassword').val();
        if (password !== confirmPassword) {
            $('#inputConfirmPassword')[0].setCustomValidity('输入的密码不匹配!');
            return false;
        }
        $('#inputConfirmPassword')[0].setCustomValidity('');
        return true;
    };

    //check if it's a valid name
    var checkName = function () {
        var name = $('#inputName').val();
        if (name === '' || _va.isName(name)) {
            $('#inputName')[0].setCustomValidity('');
            return true;
        }
        $('#inputName')[0].setCustomValidity('姓名必须在2到7个字之间！');
        return false;
    };

    //check if it's a valid email
    var checkEmail = function () {
        var email = $('#inputEmail').val();
        return _va.isEmail(email);
    };

    //end check input validation

    var checkAndSetInputState = function () {
        basicUIController.clearInputUIMessage($(this));
        if (basicUIController.getInputValidation($(this))) {
            basicUIController.setInputUISuccess($(this));
        } else {
            basicUIController.setInputUIError($(this));
        }
    };

    var getUserDataFromInput = function () {
        var username = $('#inputUsername').val();
        var name     = $('#inputName').val();
        var password = $('#inputPassword').val();
        var email    = $('#inputEmail').val();

        user.username = username;
        user.name     = name;
        user.password = Sha256.hash(password);
        user.email    = email;

        //delete undefined property before send to server
        for (var p in user) {
            if (user[p] === undefined) {
                delete user[p];
            }
        }
    };

    var initUI = function () {

        //bind login trigger
        $('#registerForm input').keyup(function (e) {
            if (e.keyCode === 13) {
                register();
            }
        });

        //bind check user username handler
        $('#inputUsername').keyup(checkUsername);

        //bind check password && confirm password handler
        $('#inputPassword').keyup(checkPassword);
        $('#inputConfirmPassword').keyup(checkPasswordMatch);

        //bind check name handler
        $('#inputName').keyup(checkName);

        //set input class as success or error
        $('#registerForm input').keyup(checkAndSetInputState);
        $('#registerForm input').blur(checkAndSetInputState);

        //bind register btn
        //unbind default submit event
        //post to server
        $('#registerForm').on('submit', function (e) {
            e.preventDefault();
            register();
        });
    };

    _r.prototype = {
        initUI: initUI
    }
    return new _r();
});
