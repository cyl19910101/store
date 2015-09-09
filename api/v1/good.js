var Good      = require('../../models').Good;
var User = require('../../models').User;
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

exports.postGood = function (req, res, next) {
    if (req.user && req.user.username === 'admin') {
        var goodData    = req.body;
        var invalidInfo = {};
        //TODO valid data
        if (isAValidGoodData(goodData, invalidInfo)) {
            var good = new Good(goodData);

            good.save(function (err) {
                //TODO : handle err and tell client what's wrong
                if (err) {
                    console.log(err);
                    res.send({error: err})
                }
                else res.send({success: "success to post good."});
            })
        } else {
            res.send({error: invalidInfo});
        }
    }
    else {
        res.send(401);
    }
};

exports.getGood = function (req, res, next) {
    //if (req.user && req.user.username === 'admin')
    if (req.user) {
        var username = user.username;
        //1st. get user's level
        User.findOne({username:username}, function(err, data) {
            //debug
           console.log(data);
        })

        //2nd. get good data from database

        //3rd. choose good data value by user's level maybe should do this before 2nd
    }
    else {
        res.send({error: 'did not login'})
    }
}

exports.index = function (req, res, next) {
    //TODO: change price by user vip level
    Good.find({}, 'name tags images brief', function (err, datas) {
        if (err) {
            //TODO :handel err
        } else {
            res.send(datas);
        }
    });
};


