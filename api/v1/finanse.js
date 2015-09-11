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
        res.status(401).end();
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
        res.status(401).end();
    }
}
