var express        = require('express');
var path           = require('path');
var favicon        = require('serve-favicon');
var logger         = require('morgan');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var sassMiddleware = require('node-sass-middleware');

var routes      = require('./web_router');
var apiRouterV1 = require('./api_router_v1');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/picture', express.static(process.env['PICTURE_PATH']));

app.use('/css', [sassMiddleware({
    /* Options */
    src           : path.join(__dirname, 'public/sass'),
    dest          : path.join(__dirname, 'public/stylesheets'),
    debug         : true,
    outputStyle   : 'compressed',
    indentedSyntax: true
}), express.static(path.join(__dirname, 'public/stylesheets'))]);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', apiRouterV1);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err    = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error  : err
        });
    });
}

// production error handler
// no stacktraces leaked to user
// TODO: complete the error page
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error  : {}
    });
});


module.exports = app;
