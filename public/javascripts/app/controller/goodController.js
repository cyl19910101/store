define(function (require) {
    var $         = require('jquery');
    var good      = require('app/model/good');
    var objectKey = require('app/util/objectKey');
    var _va       = require('_va');
    var _g        = function () {
    };

    //images
    var imageList = {};

    var insertImage = function (key) {
        imageList[key] = 0;
    };

    var deleteImage = function (key) {
        delete imageList[key];
    };

    //tags
    var goodTags  = {};
    var insertTag = function () {
        var name = $('#tagInput').val();
        //TODO: bind deleteTag
        //var tag = '<span onclick="deleteTag(this);" name="' + name + '" class="label label-info">' + name + '</span>';
        var tag        = $('<span class="label label-default label-tag">' + name + '</span>');
        tag.click(function () {
            deleteTag(tag, name);
        });
        $('#currentLabel').append(tag);
        $('#tagInput').val('');
        goodTags[name] = 0;
    }

    var deleteTag = function (ele, name) {
        delete goodTags[name];
        $(ele).remove();
    };

    /**
     * good curd request api
     */
        //get good property from input
    var getGoodDataFromInput = function () {
        var name        = $('#goodNameInput').val();
        var basicPrice  = $('#goodBasicPriceInput').val();
        var stock       = $('#goodStockInput').val();
        var brief       = $('#goodBriefInput').val();
        var description = $('#goodDescriptionTextarea').val();
        var code        = $('#goodCodeInput').val();

        good.name        = name;
        good.basicPrice  = basicPrice;
        good.stock       = stock;
        good.brief       = brief;
        good.description = description;
        good.code        = code || new Date().getTime();
        good.images      = objectKey.getObjectKeys(imageList);
        good.tags        = objectKey.getObjectKeys(goodTags);
    };

    var showUnvalidData = function (key) {
        //TODO: complete this tip, tell people which input's value is not valid
        alert(key + 'is invalid');
    };

    /**
     * check if the input value is a valid good data
     * return true if all of the values is valid
     * otherwise tell user to change them
     */
    var isAValidGoodData = function () {
        //TODO: extend validator to support chinese
        //check name

        //check basicPrice
        if (!(_va.isInt(good.basicPrice) || _va.isDecimal(good.basicPrice))) {
            showUnvalidData('price');
            return false;
        }

        //check stock
        if (!_va.isInt(good.stock)) {
            showUnvalidData('stock');
            return false;
        }

        //check code
        if (!_va.isNumeric(good.code)) {
            showUnvalidData('code');
            return false;
        }

        //check tags
        //TODO:
        return true;
    };

    var postGoodData = function (o) {
        $.ajax({
            url        : '/api/v1/good',
            method     : 'POST',
            data       : JSON.stringify(good),
            contentType: 'application/json; charset=utf-8',
            dataType   : 'json',
            success    : o.success,
            error      : o.error
        });
    };

    //postGood
    //TODO:
    //1st. get good data value
    //2nd. check if the data is valid
    //3rd. if valid then send to server,
    // otherwise let user know data isn't valid
    //4th. (only when 3rd valid is true)
    // if server accept this data, reload page
    // otherwise let user know post failed and tell them the reason
    var postGood = function () {
        getGoodDataFromInput();

        if (isAValidGoodData()) {
            //send to server
            postGoodData({
                success : function (res) {
                    //server accept this data
                    if (res.success) {
                        alert('成功添加商品');
                        location.reload();
                    } else {
                        //server don't accept this data
                        //TODO:
                        alert(res.error);
                    }
                }, error: function () {
                    //unhandle error
                    //TODO:
                }
            });
        }
    };

    var goodPreviewThumbnailHTML = '<div class="thumbnail"></div>';

    var goodPreviewFrameHTML = '<div class="col-sm-6 col-md-4"></div>';

    var buyBtnHTML       = '<button class="btn btn-success btn-block">立即购买</button>';
    var addToCartBtnHTML = '<button class="btn btn-default btn-block">加入购物车 <span class="glyphicon glyphicon-shopping-cart"></span></button>';

    var getGoodPreviewImageFrameHTML = function (src) {
        if (src)
            return '<img src="/picture/' + src + '" class="img-responsive">';
        else return '<img alt="图片缺失" class="img-responsive">'
    };

    var getGoodPreviewInfoHTML = function (name, brief, price, stock) {
        //TODO: align center
        var _div   = $('<div class="caption"></div>');
        var _title = $('<h3>' + name + '</h3>');
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
        var price = good.price || "未添加";
        var stock = good.stock || "未添加";
        var brief = good.brief || "未添加";
        var image = good.image;
        var code  = good.code || "未添加";

        setTimeout(function () {
            var frame     = $(goodPreviewFrameHTML);
            var thumbnail = $(goodPreviewThumbnailHTML);
            //image ui
            //TODO: change html if image doesn't exist
            thumbnail.append(getGoodPreviewImageFrameHTML(image));

            //info ui
            thumbnail.append(getGoodPreviewInfoHTML(name, brief, price, stock));

            //button ui
            //TODO: bind process
            thumbnail.append(buyBtnHTML);
            thumbnail.append(addToCartBtnHTML);

            frame.append(thumbnail);
            $('#goods').append(frame);
        }, 0);
    };

    var queryGoodIndex = function (isVIP) {
        $.ajax({
            url     : isVIP ? '/api/v1/good/vipIndex' : '/api/v1/good/index',
            method  : 'GET',
            dataType: 'json',
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
        });
    };

    var getGoodIndex = function () {
        if (authorization.isAuthenticated()) {
            queryGoodIndex(1);
        } else {
            queryGoodIndex(0);
        }

    };

//exports api
    _g.prototype = {
        insertImage : insertImage,
        deleteImage : deleteImage,
        insertTag   : insertTag,
        deleteTag   : deleteTag,
        postGood    : postGood,
        getGoodIndex: getGoodIndex
    };
    return new _g();
})
;
