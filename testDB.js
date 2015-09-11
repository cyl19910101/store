var Finanse = require('./models').Finanse;
var f       = new Finanse({aud2yuan: 4.8});
f.save(function (err, data) {
    if (err) console.log(err);
    else console.log(data);
});
