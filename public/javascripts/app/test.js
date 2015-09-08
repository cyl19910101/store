define(function (require) {
  //require('bower/jquery/dist/jquery.min');
  //_boot = require('bower/bootstrap/dist/js/bootstrap.min');
  //var sha256 = require('sha256');
  //console.log(sha256);

  var $ = require('jquery');
  var sha256 = require('sha256');
  require('_BS');
  //test $
  $(function () {
    $('body').html('<h1>done</h1>');
  });
  console.log(sha256);
});