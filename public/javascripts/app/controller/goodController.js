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
        if(!_va.isInt(good.stock)) {
           showUnvalidData('stock');
            return false;
        }

        //check code
        if(!_va.isNumeric(good.code)) {
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

    var getGood = function () {

    };

//exports api
    _g.prototype = {
        insertImage: insertImage,
        deleteImage: deleteImage,
        insertTag  : insertTag,
        deleteTag  : deleteTag,
        postGood   : postGood,
        getGood    : getGood
    };
    return new _g();
})
;
