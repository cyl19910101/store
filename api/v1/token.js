var jwt = require( 'jsonwebtoken' );  //https://npmjs.org/package/node-jsonwebtoken
var User         = require( '../../models' ).User;
var _va          = require( '../../lib/validatorExtension' );
var key          = require( '../../util/privateKey' );
var tokenManager = require( '../../redis/tokenManager' );

// debug:
var password = '1ed7a08cd468fef3e84e0a9b9584e43d081878e2386a3cac3454dbe168e5b1ce';

var adminProfile = {
    username : 'admin',
    role     : 'admin',
    level    : 10
};


var createToken = function ( req, res, next ) {
    //TODO handle undefined error like req.body is undefined etc.
    var username = req.body.username;
    var password = req.body.password;
    if ( _va.isUsername( username ) && password ) {
        //debug
        if ( req.body.username === 'admin' ) {
            if ( req.body.password === password ) {
                var token = jwt.sign( adminProfile, key, { expiresInMinutes : 60 } )
                //insert token to redis
                tokenManager.insertToken( token, function ( err ) {
                    if ( !err )
                        res.json( { success : 1, token : token } );
                    else res.status( 500 ).send( 'system error' );
                } );
            }
            else
                res.status( 401 ).send( '错误的用户名或密码！' );
        }
        else {
            //check if password is correct
            //1st. get UserData form data base
            //2nd. compare the password
            //TODO: maybe give more information like cart orders etc.
            User.findOne( { username : username }, '-_id password level status role', function ( err, data ) {
                if ( err ) {
                    //TODO: handle error
                    res.status( 401 ).send( '错误的用户名或密码！' );
                }
                else if ( data && data.password === req.body.password ) {
                    //delete data['password'];
                    //console.log(data.password);
                    //debug
                    //TODO: can't delete data['password'] property, thus copy a new object
                    var __data = {
                        username : username,
                        level    : data.level,
                        status   : data.status,
                        role     : data.role
                    };
                    var token  = jwt.sign( __data, key, { expiresInMinutes : 60 } );
                    tokenManager.insertToken( token, function ( err ) {
                        if ( !err )
                            res.json( { success : 1, token : token } );
                        else res.status( 500 ).send( 'system error' );
                    } );
                }
                else
                    res.status( 401 ).send( '错误的用户名或密码！' );
            } );
        }
    } else {
        //invalid username
        res.status( 401 ).send( '错误的用户名或密码！' );
    }
};

exports.createToken = createToken;

//TODO: send next fn to deal ti
exports.destroyToken = function ( req, res ) {
    if ( req.user ) {
        tokenManager.expireToken( req.headers, function ( err ) {
            if ( !err )
                return res.send( 200 );
            //TODO:
            return res.send( 500 );
        } );
    }
    else {
        return res.send( 401 );
    }
};
