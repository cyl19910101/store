var express           = require('express');
var router            = express.Router();
var adminManageRouter = require('./adminManageRouter');

router.get('/', function (req, res, next) {
    var err    = new Error('Not Found');
    err.status = 404;
    next(err);
})

router.use('/admin/', adminManageRouter);
module.exports        = router;
