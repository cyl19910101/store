var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RecordSchema = require('./record').RecordSchema;

var GoodSchema = new Schema({
  name: {type: String, required: true},
  basicPrice: {type: Number, default: 99999},
  salePrice: [Number],
  createdOn: {type: Date, default: Date.now},
  createdBy: {type: String},
  //TODO: would better change to long
  code: {type: String, unique: true},
  modified: [RecordSchema],
  //classifier, TODO: make it enumable
  goodType: {type: String},
  deliverType: {type: String},
  tags: [String],
  weight: {type: Number},
  volume: {type: Number},
  stock: {type: Number},
  brief: {type: String},
  description: {type: String},
  images: [String]
});

mongoose.model('Good', GoodSchema);
