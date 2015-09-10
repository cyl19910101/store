var jwt = require('jsonwebtoken');  //https://npmjs.org/package/node-jsonwebtoken
var User = require('../../models').User;

var secret = 'bloody hell';
// debug:
var password = '1ed7a08cd468fef3e84e0a9b9584e43d081878e2386a3cac3454dbe168e5b1ce';

var profile = {
    username: 'admin'
}


var createToken = function (req, res, next) {
    //TODO: check if it's a valid username
    var username = req.body.username;
    if (req.body.username === 'admin' && req.body.password === password) {
        var token = jwt.sign(profile, secret, {expiresInMinutes: 30})
        res.json({success: 1, token: token});
    }
    else if (req.body.username !== '' && req.body.password !== '') {
        //check if password is correct
        //1st. get UserData form data base
        //2nd. compare the password
        //TODO: maybe give more information like cart orders etc.
        User.findOne({username: username}, '-_id password level status role', function (err, data) {
            if (err) {
                //TODO: handle error
                res.status(401).json({error: 'get token fail'});
            }
            else if (data.password === req.body.password) {
                //delete data['password'];
                //console.log(data.password);
                //debug
                //TODO: can't delete data['password'] property, thus copy a new object
                var __data = {
                    username: username,
                    level   : data.level,
                    status  : data.status,
                    role    : data.role
                };
                res.json({success: 1, token: jwt.sign(__data, secret, {expiresInMinutes: 120})});
            }
            else
                res.status(401).json({error: 'Wrong username or password'});
        });
    }
    else {
        res.status(401).json({error: 'Wrong username or password'});
    }
}

exports.createToken = createToken;
exports.secretKey   = secret;