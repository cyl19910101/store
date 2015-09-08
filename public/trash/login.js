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