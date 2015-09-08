var isAuthenticated = function () {
  //TODO: complete this check
  return localStorage.getItem('token') !== null;
};

function url_base64_decode(str) {
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

var getNormalUserHtml = function () {
  return '<a href="/account" class="config-navbar-brand"><span class="glyphicon glyphicon-user"></span></a><a href="/cart" class="config-navbar-brand"><span class="glyphicon glyphicon-shopping-cart"></span></a>';
};

var getAdminHtml = function () {
  return '<a href="/manage" class="config-navbar-brand"><span class="glyphicon glyphicon-cog"></span></a><a onclick="logout()" class="config-navbar-brand"><span class="glyphicon glyphicon-log-out"></span></a>';
};

var configAccountArea = function () {
  if (isAuthenticated() && getTokenUser() === 'admin') {
    $('#accountArea').html(getAdminHtml());
  }
  else {
    $('#accountArea').html(getNormalUserHtml());
  }
};

$(function () {
  configToken();
  $.ajaxSetup({
    'beforeSend': function (xhr) {
      if (localStorage.getItem('token')) {
        xhr.setRequestHeader('Authorization',
          'Bearer ' + localStorage.getItem('token'));
      }
    }
  });
  configAccountArea();
});

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
