var jwt = require('jsonwebtoken');  //https://npmjs.org/package/node-jsonwebtoken

var secret = 'bloody hell';
// debug:
var password = '1ed7a08cd468fef3e84e0a9b9584e43d081878e2386a3cac3454dbe168e5b1ce';

var profile = {
  username: 'admin'
}


var createToken = function (req, res, next) {
  if (req.body.username === 'admin' && req.body.password === password) {
    var token = jwt.sign(profile, secret, {expiresInMinutes: 30})
    res.json({token: token});
  }
  else {
    res.status(401).send('Wrong username or password');
  }
}

exports.createToken = createToken;
exports.secretKey = secret;