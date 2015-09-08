var Good = require('./models').Good;
Good.find({}, function (err, data) {
  if (!err)
    console.log(data);
})
//var good = new Good({name: "袋鼠精"});
//good.save({}, function (err, _good) {
//  if (err) console.log(err);
//  else
//    console.log(_good);
//})