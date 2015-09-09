var mongoose      = require('mongoose');
var Schema        = mongoose.Schema;
var AddressSchema = require('./address').AddressSchema;
var OrderSchema   = require('./order').OrderSchema;
var CartSchema    = require('./cart').CartSchema;

var UserSchema = new Schema({
    username : {type: String, required: true, unique: true},
    name     : {type: String, unique: true},
    pwd      : {type: String, required: true},
    status   : {type: String, enum: ['deactivate', 'normal', 'freeze'], required: true},
    email    : {type: String, required: true, unique: true},
    level    : {type: Number, min: 1, max: 10, required: true},
    role     : {type: String, enum: ['admin', 'customer', 'merchant']},
    phone    : {type: String},
    birthday : {type: Date},
    addresses: [AddressSchema],
    cart     : [CartSchema],
    orders   : [OrderSchema]
});

mongoose.model('User', UserSchema);
