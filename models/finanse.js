var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FinanseSchema = new Schema({
  aud2yuan: {type: Number}
});

mongoose.model('Finanse', FinanseSchema)
exports.FinanseSchema = FinanseSchema;
