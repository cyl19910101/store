var express           = require( 'express' );
var router            = express.Router();
var expressJwt        = require( 'express-jwt' );
var tokenController   = require( './api/v1/token' );
var pictureController = require( './api/v1/picture' );
var goodController    = require( './api/v1/good' );
var finanseController = require( './api/v1/finanse' );
var userController    = require( './api/v1/user' );
var test              = require( './api/v1/test' );
var fs                = require( 'fs' );
var path              = require( 'path' );
var key               = require( './util/privateKey' );

var _ejwt = expressJwt( { secret : key } );

/**
 * check if client have token
 * if client have token, verify token
 * else skip token verify
 * @param req
 * @param res
 * @param next
 */
var isLogin    = function ( req, res, next ) {
    req.headers.authorization ? _ejwt( req, res, next ) : next();
};

//create token
router.post( '/accessToken', tokenController.createToken );
router.delete( '/accessToken', _ejwt, tokenController.destroyToken );

//picture operation
router.post( '/picture', _ejwt, pictureController.reqFileParser, pictureController.postPicture );

router.delete( '/picture', _ejwt, pictureController.deletePicture );

//END picture operation

//good operation
//TODO: admin merchant query good, use tha same uri
//TODO: also can use an array, if login use [_ejwt, otherhandler], else use [otherhandler]
router.get( '/good/index', isLogin, goodController.index );
//router.get('/good/vipIndex', _ejwt, goodController.vipIndex);
router.get( '/good/:code', isLogin, goodController.getGood );
//router.get('/vipGood/:code', _ejwt, goodController.vipGetGood);

router.post( '/good', _ejwt, goodController.postGood );

router.get( '/RMBExchangeRate', _ejwt, finanseController.getRMBExchangeRate );
// END good operation

/**
 * user operation
 */
//post user -- register
router.post( '/user', userController.postUser );
module.exports = router;
