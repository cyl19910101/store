var express = require('express');
var router = express.Router();
var expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt

var tokenController = require('./api/v1/token');
var pictureController = require('./api/v1/picture');
var goodController = require('./api/v1/good');
var finanseController = require('./api/v1/finanse');
var secret = tokenController.secretKey;
var _ejwt = expressJwt({secret: secret});

//create token
router.post('/accesstokens', tokenController.createToken);

//picture operation
router.post('/picture', _ejwt, pictureController.reqFileParser, pictureController.postPicture);

router.delete('/picture', _ejwt, pictureController.deletePicture);

//END picture operation

//good operation
router.get('/goods', goodController.index);

router.post('/good', _ejwt, goodController.postGood);

router.get('/RMBExchangeRate', _ejwt, finanseController.getRMBExchangeRate);
// END good operation
module.exports = router;