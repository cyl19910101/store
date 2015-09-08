var express = require('express');
var router = express.Router();
var site = require('./controller/site');

//TODO : try to use regular expression
router.get('/', site.index);

//router.get('/index', site.index);
//
//router.get('/manage', site.manage);
//
//router.get('/account', site.account);
//
//router.get('/register', site.register);

router.get('/:page', function (req, res, next) {
  var page = req.params.page;
  try {
    res.render('' + page);
  } catch(ex) {
    res.end('this page is not exist.');
  }

});

module.exports = router;
