/**
 * Created by cyl on 9/09/15.
 */
var User = require('../../models').User;

exports.getUser = function (req, res, next) {

};

exports.postUser = function (req, res, next) {
    if (req.user) {
        if (req.user.username !== 'admin') {
            res.status(401).end();
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

        var _user = req.body;

        // init user data
        _user.status = 'deactivate';
        _user.level  = 1;
        _user.role   = 'customer';

        var user = new User(_user);
        user.save(function (err) {
            //TODO : handle err and tell client what's wrong
            if (err) {
                console.log(err);
                res.send({error: err})
            }
            else res.send({success: "success to post a user"});
        })

    }
};
