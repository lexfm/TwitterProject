var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var session = require('express-session');
var port = process.env.PORT || 3000;

//var configDB = require('./config/database.js');

var app = express();
var admin=express();

// configuration ===============================================================
var connection = mongoose.connection;

connection.on('error', console.error);
connection.once('open', function() {
	console.info('connected to database');
  // Create your schemas and models here.
});

// admin.addListener('mount', function(parent){
// 	console.log('App mounted');
// 	console.log(parent);
// });
// admin.get('/', function (req, res) {
//   res.send('Admin Homepage');
// });

// app.use('/admin', admin);

mongoose.connect('mongodb://localhost/twitterdb'); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(express.static('public'));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, '../TwitterApp')));
// app.use(favicon(path.join(__dirname,'../TwitterApp','Images','favicon.ico')));

// app.get('/', function(req, res) {
//   res.sendFile(__dirname, 'index.html');
// });

// app.get('/logging.html', function(req, res) {
//   res.sendFile(__dirname, 'logging.html');
// });
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// app.set('port', port);

// var server = app.listen(app.get('port'), function() {
//   console.log('Express server listening on port ' + server.address().port);
// });