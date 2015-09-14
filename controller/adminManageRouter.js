var express = require('express');
var router  = express.Router();

router.get('/', function (req, res, next) {
    res.render('manage/admin/good/insert');
});

router.get('/good/:page', function (req, res, next) {
    var page = req.params.page;
    try {
        res.render('manage/admin/good/' + page);
    } catch (ex) {
        res.end('this page is not exist.');
    }
});

module.exports = router;
