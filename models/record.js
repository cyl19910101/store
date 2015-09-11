var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecordSchema = new Schema({
  operaterName: {type: String},
  operateOn: {type: Date, default: Date.now},
  opreateContent: {type: String}
});

mongoose.model('Record', RecordSchema);
exports.RecordSchema = RecordSchema;
