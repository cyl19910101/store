define(function (require) {
    var $         = require('jquery');
    var good      = require('app/model/good');
    var goodAPI   = require('app/api/good');
    var objectKey = require('app/util/objectKey');
    var _va       = require('_va');
    var _a        = require('app/controller/ajaxTokenController');
    _a.initAjaxToken();
    var _g        = function () {
    };

    //images
    var imageList = {};

    var insertImage = function (key) {
        imageList[key] = 1;
    };

    var deleteImage = function (key) {
        delete imageList[key];
    };

    //tags
    var goodTags  = {};
    var insertTag = function () {
        //TODO: fix bug -- mobile browser can't delete tag by click
        var name = $('#tagInput').val();
        if (!name || goodTags[name]) return;
        var tag        = $('<button class="btn btn-default btn-tag">' + name + '</button>');
        $('#currentLabel').append(tag);
        tag.click(function () {
            deleteTag(tag, name);
        });
        $('#tagInput').val('');
        goodTags[name] = 1;
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

    //postGood
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
            var callbackObj = {
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
            };
            goodAPI.post(good, callbackObj);
        }
    };

    var goodPreviewThumbnailHTML = '<div class="thumbnail"></div>';

    var goodPreviewFrameHTML = '<div class="col-sm-6 col-md-4"></div>';

    var buyBtnHTML       = '<button class="btn btn-success btn-block">立即购买</button>';
    var addToCartBtnHTML = '<button class="btn btn-default btn-block">加入购物车 <span class="glyphicon glyphicon-shopping-cart"></span></button>';

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

            //button ui
            //TODO: bind process
            //thumbnail.append(buyBtnHTML);
            //thumbnail.append(addToCartBtnHTML);

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
    }

    var initUI = function () {
        //insertTag
        $('#insertTagBtn').click(insertTag);

        $('#createGoodForm').on('submit', function (e) {
            e.preventDefault();
            postGood();
        });

        //disable default submit event in tag input element
        $('#tagInput').keyup(function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                insertTag();
            }
        });

        $('#tagInput').keydown(function (e) {
            if (e.keyCode === 13)
                e.preventDefault();
        });
        $('#tagInput').keypress(function (e) {
            if (e.keyCode === 13)
                e.preventDefault();
        });
    };

//exports api
    _g.prototype = {
        insertImage  : insertImage,
        deleteImage  : deleteImage,
        insertTag    : insertTag,
        deleteTag    : deleteTag,
        postGood     : postGood,
        showGoodIndex: showGoodIndex,
        //getGoodIndex: getGoodIndex,
        initUI       : initUI
    };
    return new _g();
})
;
