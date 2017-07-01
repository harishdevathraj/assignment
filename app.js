var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest2');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
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


//To get the access for the functions defined in index.js class
var routes = require('./routes/imagefile');
 
// connect to mongo,
//i have created mongo collection in mlab.com.. the below is my database access url..
//So make sure you give your connection details..
//mongoose.connect('mongodb://nodejsapi:nodejsapi@ds041516.mlab.com:41516/mynodejsapp');
 var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest2');
app.use('/', routes);
 
//URL : http://localhost:3000/images/
// To get all the images/files stored in MongoDB
app.get('/images', function(req, res) {
//calling the function from index.js class using routes object..
routes.getImages(function(err, genres) {
if (err) {
throw err;
 
}
res.json(genres);
 
});
});
 
// URL : http://localhost:3000/images/(give you collectionID)
// To get the single image/File using id from the MongoDB
app.get('/images/:id', function(req, res) {
 
//calling the function from index.js class using routes object..
routes.getImageById(req.params.id, function(err, genres) {
if (err) {
throw err;
}
//res.download(genres.path);
res.send(genres.path)
});
});
 
app.listen(3000);
 
console.log('Running on port 3000');

module.exports = app;
