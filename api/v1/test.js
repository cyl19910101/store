/**
 * Created by cyl on 16/09/15.
 */
var fn = function (req, res, next) {
    if (req.user) {
        res.end('logined');
    } else {
        res.end('unlogined');
    }
}

exports.fn = fn;
