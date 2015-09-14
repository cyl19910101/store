var express = require('express');
var router = express.Router();
var adminManageRouter = require('./adminManageRouter');

router.use('/admin/', adminManageRouter);
module.exports = router;
