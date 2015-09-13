/**
 * Created by cyl on 8/09/15.
 */
define({
    getObjectKeys: function (obj) {
        var res  = [];
        var keys = Object.keys(obj);
        keys.forEach(function (key) {
            res.push(key);
        });
        return res;
    }
})
