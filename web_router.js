var express      = require('express');
var router       = express.Router();
var site         = require('./controller/site');
var manageRouter = require('./controller/manageRouter');

//TODO : try to use regular expression
router.get('/', site.index);

router.get('/product', site.product);

router.use('/manage/', manageRouter);

router.get('/:page', function (req, res, next) {
    var page = req.params.page;
    try {
        res.render('' + page);
    } catch (ex) {
        res.end('this page is not exist.');
    }

});

module.exports = router;
