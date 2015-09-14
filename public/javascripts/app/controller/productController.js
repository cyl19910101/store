define(function (require) {
    var $              = require('jquery');
    var goodController = require('app/controller/goodController');
    var _q             = require('app/util/queryURL');
    var _p             = function () {
    };

    // insert image to carousel
    var initImages = function (good) {
        if (good.images && good.images.length > 0) {
            var i = 0;
            good.images.forEach(function (image) {
                //li
                var _li = $('<li class="active" data-target="#carousel-example-generic" data-slide-to="' + i + '"></li>');

                //item
                var _item = $('<div class="item"></div>');
                if (!i) {
                    _item.addClass('active');
                }

                //img
                var _img = $('<img height="300px" src="/picture/' + image + '" alt="图片缺失">');

                //TODO:
                setTimeout(function () {
                    $('ol').append(_li);
                    _item.append(_img);
                    $('.carousel-inner').append(_item);
                }, 0);

                i++;
            })
        }
        else {
            var __li = $('<li class="active" data-target="#carousel-example-generic" data-slide-to="0"></li>');

            var __img = $('<img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" width="0" height="0" alt="图片缺失" />');

            var __item = $('<div class="active"></div>')
            setTimeout(function () {
                $('ol').append(__li);
                __item.append(__img);
                $('.carousel-inner').append(__item);
            }, 0);
        }
    }

    var initProducInfo = function (good) {
        //TODO: show help info if good's info is undefined
        if (good.name) {
            $('#productName').html('商品名： ' + good.name);
        }
        if (good.brief) {
            $('#productBrief').html(good.brief);
        }
        if (good.tags) {
            var _str = '描述标签：';
            good.tags.forEach(function (tag) {
                _str += tag + ' ';
            })
            $('#productTags').html(_str);
        }
        if (good.price) {
            //show price by level
            if (authorization.isAuthenticated()) {
                var _priceStr = 'VIP' + authorization.getTokenLevel() + ' 优惠价：' + good.price;
                $('#productPrice').html(_priceStr);
            }
            else {
                var _priceStr = '单价：' + good.price + ' (请登录以享受优惠价！)';
                $('#productPrice').html(_priceStr);
            }
        }
        if (good.stock) {
            $('#productTags').html('库存：' + good.stock);
        }
        if (good.description) {
            $('#productDescription').html(good.description);
        }
    };

    _p.prototype = {
        init: function () {
            var goodCode = _q.QueryString.item;
            var _url     = authorization.isAuthenticated() ? '/api/v1/vipGood/' : '/api/v1/good/';
            _url += goodCode;
            //TODO: vip  || normal
            $.ajax({

                url    : _url,
                method : "GET",
                success: function (res) {
                    if (res)
                        if (res.success) {
                            if (res.data) {
                                console.log(res.data)
                                initProducInfo(res.data);
                                initImages(res.data);
                            }
                        }
                        else {
                            console.log(res.error);
                        }
                    else {
                        //TODO:
                    }
                },
                error  : function () {
                    //TODO
                }
            });
            $('.carousel').carousel({
                interval: 5000 //changes the speed
            })
        }
    }

    return new _p();
});