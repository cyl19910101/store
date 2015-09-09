/**
 * Created by cyl on 9/09/15.
 */
var User = require('../../models').User;

exports.getUser = function (req, res, next) {

};

exports.postUser = function (req, res, next) {
    if (req.user) {
        if (req.user.username !== 'admin') {
            res.send(401);
        }
        else {
            //TODO: admin post a user, not really necessary
        }
    } else {
        //post user
        /**
         * 1st get data value
         * 2nd check if it's a valid value
         * 3rd try to post to database
         *      tell response if it's success
         *      if failed, tell res the reason
         */

        //debug
        var _user = req.body;
        console.log(_user);
        res.send({success: "success to post a user"});
    }
};
