define(function (require) {
    var $       = require('jquery');
    var good    = require('app/model/good');
    var goodAPI = require('app/api/good');
    var _i      = function () {
    };

    var goodPreviewThumbnailHTML = '<div class="thumbnail"></div>';
    var goodPreviewFrameHTML     = '<div class="col-sm-6 col-md-4"></div>';

    var getGoodPreviewImageFrameHTML = function (src, code) {
        if (src)
            return '<a target="_blank" href="/product?item=' + code + '"><img src="/picture/' + src + '" class="img-responsive"></a>';
        else return '<img alt="图片缺失" class="img-responsive">'
    };

    var getGoodPreviewInfoHTML = function (name, brief, price, stock, code) {
        //TODO: align center
        var _div   = $('<div class="caption"></div>');
        var _title = $('<a target="_blank" href="/product?item=' + code + '"><h3>' + name + '</h3></a>');
        var _brief = $('<p>' + brief + '</p>');
        var _price = $('<p>¥:' + price + '</p>');
        var _stock = $('<p>库存:' + stock + '</p>');
        _div.append(_title);
        _div.append(_brief);
        _div.append(_price);
        _div.append(_stock);
        return _div;
    };

    var displayGoodPreview = function (good) {
        //TODO: use immediate instead of setTimeout
        var name  = good.name || "未添加";
        var price = good.salePrice || "未添加";
        var stock = good.stock || "未添加";
        var brief = good.brief || "未添加";
        var image = good.images ? good.images[0] : undefined;
        var code  = good.code || "未添加";

        setTimeout(function () {
            var frame     = $(goodPreviewFrameHTML);
            var thumbnail = $(goodPreviewThumbnailHTML);
            //image ui
            //TODO: change html if image doesn't exist
            thumbnail.append(getGoodPreviewImageFrameHTML(image, code));

            //info ui
            thumbnail.append(getGoodPreviewInfoHTML(name, brief, price, stock, code));

            frame.append(thumbnail);
            $('#goods').append(frame);
        }, 0);
    };

    /**
     * TODO: show good index contains user role : admin merchant vip nologin
     */
    var showGoodIndex = function () {
        var callbackObj = {
            success : function (res) {
                if (res.success) {
                    if (res.goods) {
                        res.goods.forEach(function (good) {
                            displayGoodPreview(good);
                        });
                    }
                } else {
                    console.log('query good vip index fail');
                }
            }, error: function () {
                console.log('query good vip index error');
            }
        };
        goodAPI.getIndex(callbackObj);
    };

    _i.prototype = {
        init: function () {
            showGoodIndex();
        }
    };

    return new _i();
});