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
exports.getGood = function (req, res, next) {
    var code = req.params.code;
    if (code) {
        var query = '';
        console.log(req.user);
        if (req.user && req.user.role === 'admin') {
            queryStr = '-_id';
        }
        else queryStr = '-_id name salePrice stock images tags brief code description'
        Good.findOne({code: code}, queryStr, function (err, data) {
            if (!err) {
                if (data) {
                    //TODO: thin way
                    data = data.toObject();
                    console.log(data);

                    //filter property
                    //show different price for different people
                    if (data.salePrice) {
                        if (req.user) {
                            if (req.user.role === 'customer') {
                                var level      = req.user.level || 1;
                                data.salePrice = data.salePrice[level - 1];
                            } else if (req.user.role === 'admin') {
                                //admin
                            } else {
                                //TODO: merchant
                            }
                        } else {
                            data.salePrice = data.salePrice[0];
                        }
                    }
                    res.json({success: 'success to query good', data: data});
                }
                else {
                    res.status(404).json({error: 'no such good'});
                }
            }
            else {
                res.status(500).end();
                next(err);
            }
        })
    }
    else
        res.status(400).end();

}

exports.index = function (req, res, next) {
    //TODO:paginate
    //get value by role && level
    Good.find({}, '-_id name salePrice stock images brief code', function (err, datas) {
        if (err) {
            //TODO :handel err
            res.status(500).end();
        } else {
            var _datas = [];
            datas.forEach(function (data) {
                //TODO: use a thin way to do this
                data = data.toObject();

                //filter property
                //show different price for different people
                if (data.salePrice) {
                    if (req.user) {
                        if (req.user.role === 'customer') {
                            var level      = req.user.level || 1;
                            data.salePrice = data.salePrice[level - 1];
                        } else if (req.user.role === 'admin') {
                            data.salePrice = data.salePrice[9];
                        } else {
                            //TODO: merchant
                        }
                    } else {
                        data.salePrice = data.salePrice[0];
                    }
                }

                _datas.push(data);
            });
            res.json({success: 'success to index good', goods: _datas});
        }
    });
};
