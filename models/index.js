var mongoose = require('mongoose');
var config   = require('../config');

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + config.dbURI);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});
mongoose.connect(config.dbURI, config.dbOptions, function (err) {
    if (err) {
        console.error('connect to %s error: ', config.dbURI, err.message);
        process.exit(1);
    }
});

require('./good');
require('./record');
require('./finanse');
require('./user');

exports.Good    = mongoose.model('Good');
exports.Record  = mongoose.model('Record');
exports.Finanse = mongoose.model('Finanse');
exports.User    = mongoose.model('User');
