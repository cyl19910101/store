/**
 * Created by cyl on 8/09/15.
 */
"use strict";

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
