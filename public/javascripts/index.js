require(['./common'], function (common) {
  require(['app/indexMain']);
});
//$(function () {
//  $.ajax({
//    url: '/api/v1/goods',
//    method: 'GET',
//    dataType: 'json',
//    success: function (goods) {
//      goods.forEach(function (good) {
//        var _goodFrame = createGoodHtml(good);
//        $('#goods').append(_goodFrame);
//      })
//    }
//  });
//});
//
//var createGoodHtml = function (good) {
//  console.log(good);
//  var name = good.name;
//  var brief = good.brief;
//  //var description = good.description;
//  var image = good.images[0];
//
//  var _frame = $('<div class="col-sm-6 col-md-4"></div>');
//
//  var _thumbnailFrame = $('<div class="thumbnail"></div>');
//  _frame.append(_thumbnailFrame);
//
//  if (image) {
//    var _imageFrame = $('<img src="/picture/' + image + '" class="img-responsive">');
//    _thumbnailFrame.append(_imageFrame);
//  }
//
//  var _captionFrame = $('<div class="caption"></div>');
//  _thumbnailFrame.append(_captionFrame);
//
//  var _nameTitle = $('<h3>' + name + '</h3>');
//  _captionFrame.append(_nameTitle);
//
//  var _pBrief = $('<p>' + brief + '</p>');
//  _captionFrame.append(_pBrief);
//
//  var _pBtn1 = $('<p></p>');
//
//  var _a_buy = $('<a href="#" role="button" class="btn btn-success btn-block">立即购买</a>');
//  _pBtn1.append(_a_buy);
//
//  var _pBtn2 = $('<p></p>');
//
//  var _a_cart = $('<a href="#" role="button" class="btn btn-default btn-block">加入购物车' +
//  '<span class="glyphicon glyphicon-shopping-cart"></span>' +
//  '</a>');
//  _pBtn2.append(_a_cart);
//
//  _captionFrame.append(_pBtn1);
//  _captionFrame.append(_pBtn2);
//
//  return _frame;
//};
//<div class="col-sm-6 col-md-4">
//  <div class="thumbnail">
//  <img src="/images/aptamilProfutura3.jpg" class="img-responsive">
//  <div class="caption">
//  <h3>贝拉美白金III</h3>
//  <p>巨好喝！！！！！</p>
//<p>
//<a href="#" role="button" class="btn btn-success btn-block">立即购买</a>
//  </p>
//  <p>
//  <a href="#" role="button" class="btn btn-default btn-block">加入购物车
//  <span class="glyphicon glyphicon-shopping-cart"></span>
//  </a>
//  </p>
//  </div>
//  </div>
//  </div>
