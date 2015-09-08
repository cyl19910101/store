/**
 * Created by cyl on 7/09/15.
 */
define(function (require) {
  var $ = require('jquery');
  var Sha256 = require('lib/sha256');
  var _a = function () {
  };
  var login = function () {
    var username = $('#inputUsername').val();
    var password = Sha256.hash($('#inputPassword').val());
    // TODO: check if it's a valid value

    $.ajax({
      url: '/api/v1/accesstokens',
      method: 'POST',
      data: {
        username: username,
        password: password
      },
      success: function (data) {
        localStorage.setItem('token', data.token);
        alert('登录成功，管理员。')
        window.location.href = '/';
      },
      // TODO: deal with error
      error: function () {
      }
    });
  };

  var logout = function () {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      window.location.href = '/';
    } else {
      alert('wrong invoke')
      //TODO err
    }
  };
  _a.prototype = {
    login: login,
    logout: logout
  }
  return new _a();
});
