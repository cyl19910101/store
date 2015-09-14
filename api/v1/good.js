var Good      = require('../../models').Good;
var User      = require('../../models').User;
var Finanse   = require('../../models').Finanse;
var Record    = require('../../models').Record;
var validator = require('validator');

var isAValidGoodData = function (good, invalidInfo) {
    //TODO: give more useful information
    var invalidInfoArray = [];
    //TODO: extend validator to support chinese
    //check name

    //check basicPrice
    if (!(validator.isInt(good.basicPrice) || validator.isDecimal(good.basicPrice))) {
        invalidInfoArray.push('price');
        return false;
    }

    //check stock
    if (!validator.isInt(good.stock)) {
        invalidInfoArray.push('price');
        return false;
    }

    //check code
    if (!validator.isNumeric(good.code)) {
        invalidInfoArray.push('price');
        return false;
    }

    //check tags
    //TODO:

    invalidInfo.message = invalidInfoArray;
    return true;
};

var initGoodPrice = function (req, res, good, next) {
    var basicPrice = good.basicPrice;
    Finanse.findOne({}, 'aud2yuan', function (err, data) {
        if (err) {
            //TODO : handle err
            next(err);
        } else {
            var normalPrice = basicPrice * data.aud2yuan * 2.5;
            var priceList   = [];
            for (var i = 0; i < 10; i++) {
                priceList.push((normalPrice * (1 - i * 0.06)).toFixed(2));
            }
            good.salePrice = priceList;
            next(null, good);
        }
    })
};


var initGoodData = function (req, res, goodData, next) {
    goodData.createdBy = req.user.username;
    var good           = new Good(goodData);
    initGoodPrice(req, res, good, next);
};

/**
 *
 * @param req
 * @param res
 * @param goodData
 * @param next
 *              1st. set good init info to goodData
 *              2nd. save good
 *              3rd. res
 */
var saveGood = function (req, res, goodData, next) {
    initGoodData(req, res, goodData, function (err, good) {
        //save initted good
        if (!err) {
            good.save(function (_err) {
                //TODO : handle err and tell client what's wrong
                if (_err) {
                    console.log(_err);
                    res.json({error: _err})
                }
                else res.json({success: "success to post good."});
            })
        }
        else res.json({error: err});
    });
};

exports.postGood = function (req, res, next) {
    if (req.user && req.user.username === 'admin') {
        var goodData    = req.body;
        var invalidInfo = {};
        //TODO valid data
        if (isAValidGoodData(goodData, invalidInfo)) {
            saveGood(req, res, goodData);
        } else {
            res.json({error: invalidInfo});
        }
    }
    else {
        res.status(401).end();
    }
};

/**
 *              get good api for guest user
 *                  1st. get good's code
 *                  2nd. query database
 *                  3rd. send to server
 * @param req
 * @param res
 * @param next
 */
//debug
exports.getGood = function (req, res, next) {
    var code = req.params.code;
    if (code) {
        Good.findOne({code: code}, 'name salePrice stock images tags brief code description', function (err, data) {
            if (!err) {
                if (data) {
                    var _data = {};
                    //TODO: handle undefined query error
                    if (data.name)
                        _data.name = data.name;
                    if (data.salePrice)
                        _data.price = data.salePrice[0];
                    if (data.stock)
                        _data.stock = data.stock;
                    //TODO: choose which picture to preview
                    if (data.images)
                        _data.images = data.images;
                    if (data.brief)
                        _data.brief = data.brief;
                    if (data.tags)
                        _data.tags = data.tags;
                    if (data.description)
                        _data.description = data.description;
                    _data.code = data.code;
                    res.json({success: 'success to query good', data: _data});
                }
                else {
                    res.json({error: 'no such good'});
                }
            }
            else {
                res.status(500).end();
            }
        })
    }
    else
        res.status(400).end();

}

exports.vipGetGood = function (req, res, next) {
    console.log(req.user)
    var code = req.params.code;
    if (req.user && req.user.level) {
        if (code) {
            Good.findOne({code: code}, 'name salePrice stock images tags brief code description', function (err, data) {
                if (!err) {
                    if (data) {
                        var _data = {};
                        //TODO: handle undefined query error
                        if (data.name)
                            _data.name = data.name;
                        if (data.salePrice)
                            _data.price = data.salePrice[req.user.level - 1];
                        if (data.stock)
                            _data.stock = data.stock;
                        //TODO: choose which picture to preview
                        if (data.images)
                            _data.images = data.images;
                        if (data.brief)
                            _data.brief = data.brief;
                        if (data.tags)
                            _data.tags = data.tags;
                        if (data.description)
                            _data.description = data.description;
                        _data.code = data.code;
                        res.json({success: 'success to query good', data: _data});
                    }
                    else {
                        res.json({error: 'no such good'});
                    }
                }
                else {
                    res.status(500).end();
                }
            })
        }
        else
            res.status(400).end();
    } else {
        res.status(401).end();
    }

}

exports.index = function (req, res, next) {
    //TODO:paginate
    Good.find({}, 'name salePrice stock images brief code', function (err, datas) {
        if (err) {
            //TODO :handel err
            res.status(500).end();
        } else {
            var _datas = [];
            datas.forEach(function (data) {
                var _data = {};
                //TODO: handle undefined query error
                if (data.name)
                    _data.name = data.name;
                if (data.salePrice)
                    _data.price = data.salePrice[0];
                if (data.stock)
                    _data.stock = data.stock;
                //TODO: choose which picture to preview
                if (data.images)
                    _data.image = data.images[0];
                if (data.brief)
                    _data.brief = data.brief;
                _data.code = data.code;
                _datas.push(_data);
            });
            res.json({success: 'success to get vip index ', goods: _datas});
        }
    });
};


exports.vipIndex = function (req, res, next) {
    //TODO:paginate
    //TODO: get user's token
    console.log(req.user)
    if (req.user && req.user.level) {
        Good.find({}, 'name salePrice stock images brief code', function (err, datas) {
            if (err) {
                //TODO :handel err
                res.status(500).end();
            } else {
                var _datas = [];
                datas.forEach(function (data) {
                    var _data = {};
                    //TODO: handle undefined query error
                    if (data.name)
                        _data.name = data.name;
                    if (data.salePrice)
                        _data.price = data.salePrice[req.user.level - 1];
                    if (data.stock)
                        _data.stock = data.stock;
                    //TODO: choose which picture to preview
                    if (data.images)
                        _data.image = data.images[0];
                    if (data.brief)
                        _data.brief = data.brief;
                    _data.code = data.code;
                    _datas.push(_data);
                });
                res.json({success: 'success to get vip index ', goods: _datas});
            }
        });
    }
    else {
        res.status(401).end();
    }
};
