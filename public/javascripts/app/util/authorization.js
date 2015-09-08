/**
 * already have preprocess authorization, no need to use this one
 */
define(function (require) {
  var authorization = function () {
  };
  var isAuthenticated = function () {
    //TODO: complete this check
    return localStorage.getItem('token') !== null;
  };
  var url_base64_decode = function (str) {
    var output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw 'Illegal base64url string!';
    }
    return window.atob(output);
  }
  var getTokenUser = function () {
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(url_base64_decode(encodedProfile));
    return profile.username;
  }
  var decodeJWT = function (str) {
    return decodeURIComponent(escape(window.atob(str)));
  }

  var getPayload = function (token) {
    var parts = token.split('.');
    return decodeJWT(parts[1]);
  }

  var getExpTime = function (payload) {
    return JSON.parse(payload).exp;
  }

  var isTokenExp = function (token) {
    var payload = getPayload(token);
    var expTime = getExpTime(payload);
    var time = new Date().getTime();
    if (Math.floor(time / 1000) > expTime) return true;
    else return false;
  }

  var configToken = function () {
    var token = localStorage.getItem('token');
    //TODO valid data
    if (token) {
      if (isTokenExp(token)) {
        localStorage.removeItem('token');
      }
    }
  };
  authorization.prototype = {
    isAuthenticated: isAuthenticated,
    getTokenUser: getTokenUser,
    configToken: configToken
  };
  return new authorization();
});