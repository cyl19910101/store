/**
 * Created by cyl on 28/09/15.
 */
var redisClient = require( './redis_database' ).redisClient;
//TODO: refresh and maintain token
var TOKEN_EXPIRATION     = 60;
var TOKEN_EXPIRATION_SEC = TOKEN_EXPIRATION * 60;

var getToken = function ( headers ) {
    if ( headers && headers.authorization ) {
        var authorization = headers.authorization;
        var part          = authorization.split( ' ' );
        if ( part.length == 2 ) {
            var token = part[1];
            return part[1];
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
};

exports.insertToken = function ( token, callback ) {
    redisClient.setex( token, TOKEN_EXPIRATION_SEC, 1, function ( err, replies ) {
        if ( err ) return callback( err );
        console.log( 'debug : insert token & redis replies--' + replies );
        callback();
    } );
};

exports.expireToken = function ( headers, callback ) {
    var token = getToken( headers );
    if ( token != null ) {
        redisClient.del( token, function ( err, replies ) {
            if ( err ) return callback( err );
            console.log( 'debug : delete token & redis replies--' + replies );
            callback();
        } );
    }
};

// Middleware for token verification
exports.verifyToken = function ( req, res, next ) {
    var token = getToken( req.headers );
    redisClient.get( token, function ( err, reply ) {
        if ( err ) {
            console.log( err );
            return res.send( 500 );
        }
        if ( reply ) {
            res.send( 401 );
        }
        else {
            next();
        }
    } );
};

