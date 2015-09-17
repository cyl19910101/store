define(function (require) {

    var goodAPI             = require('app/api/good');
    var good                = require('app/model/good');
    var fileInputController = require('app/controller/fileInputController');
    var objectKey           = require('app/util/objectKey');
    var _va                 = require('_va');

    //tags
    var goodTags  = {};
    var insertTag = function () {
        //TODO: fix bug -- mobile browser can't delete tag by click
        var name = $('#tagInput').val();
        if (!name || goodTags[name]) return;
        var tag        = $('<button type="button" class="btn btn-default btn-tag">' + name + '</button>');
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
        good.images      = objectKey.getObjectKeys(fileInputController.imageList);
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

    var initUI = function () {
        /**
         * init file input ui
         */
        fileInputController.initFileInput();

        /**
         * init other ui
         */
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

    var _c       = function () {
    };
    _c.prototype = {initUI: initUI};
    return new _c();
});