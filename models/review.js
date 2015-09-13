var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
});

mongoose.model('Review', ReviewSchema);
exports.ReviewSchema = ReviewSchema;
