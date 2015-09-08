var Good = require('../../models').Good;

var postGood = function (req, res, next) {
  //TODO valid data
  //TODO check if it's admin
  var goodData = req.body;
  var good = new Good(goodData);

  good.save(function (err, data) {
    //TODO : handle err
    if (err) console.log(err);
    else res.send({success: "success to post good."});
  })
};

exports.postGood = postGood;

var index = function (req, res, next) {
  //TODO: change price by user vip level
  Good.find({},'name tags images brief', function (err, datas) {
    if (err) {
      //TODO :handel err
    } else {
      res.send(datas);
    }
  });
};

exports.index = index;

