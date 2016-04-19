/**
 * Created by danielklein on 4/17/16.
 */
// *** main dependencies *** //
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require ('mongoose');
//*** config ** //
var config=require('../_config');



// *** routes *** //
var routes = require('./routes/index.js');
var discussionRoutes = require('./routes/discussions.js');
var userRoutes = require('./routes/users.js');


// *** express instance *** //
var app = express();

// *** mongo connection *** //
var environment = process.env.NODE_ENV || 'development';


var mongoURI = config.mongoURI[environment];

mongoose.connect(mongoURI, function(err, res) {
    if (err) {
        console.log('Error connecting to the database. ' + err);
    }
    else {
        console.log('Connected to Database: ' + config.mongoURI[environment]);
    }
});


// *** view engine *** //



// *** static directory *** //
app.set('views', path.join(__dirname, 'views'));


// *** config middleware *** //
if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));


// *** main routes *** //
app.use('/', routes);
app.use('/discussion', discussionRoutes);
app.use('/auth', userRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// *** error handlers *** //

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
