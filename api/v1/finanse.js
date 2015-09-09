var Finanse = require('../../models').Finanse;

var getRMBExchangeRate = function (req, res, next) {
    if (req.user && req.user.username === 'admin')
        Finanse.findOne({}, 'aud2yuan', function (err, data) {
            if (err) {
                //TODO : handle err
            } else
                res.send({success: "success to get rate", data: {aud2yuan: data.aud2yuan}})
        })
    else {
        res.send(401);
    }
};

exports.getRMBExchangeRate = getRMBExchangeRate;

var putRMBExchangeRate = function (req, res, next) {
    if (req.user && req.user.username === 'admin')
        Finanse.findOne({}, function (err, data) {
            if (err) {
                //TODO : handle err
            } else {
                //TODO : change rate
                //res.send({success: "success to get rate", data: {aud2yuan: data.aud2yuan}})
            }
        })
    else {
        res.send(401);
    }
}
//var postGood = function (req, res, next) {
//  //TODO valid data
//  //TODO check if it's admin
//  var goodData = req.body;
//  var good = new Good(goodData);
//
//  good.save(function (err, data) {
//    //TODO : handle err
//    if (err) console.log(err);
//    else res.send({success: "success to post good."});
//  })
//};
//
//exports.postGood = postGood;
//
//var index = function (req, res, next) {
//  //TODO: change price by user vip level
//  Good.find({}, 'name tags images brief', function (err, datas) {
//    if (err) {
//      //TODO :handel err
//    } else {
//      res.send(datas);
//    }
//  });
//};
//
//exports.index = index;

