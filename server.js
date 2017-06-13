var express = require('express');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var path 	 		= require('path');
var mysql = require('mysql')

var configDB = require('./server/db');
var app = express();
var port = process.env.PORT || 8081;

// using mongo db
mongoose.connect(configDB.mongodb_url);

//using mysql
var connection = mysql.createConnection(configDB.mysql_config);
connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected to my sql') 
})

require('./server/auth/passport')(passport);
app.set('views', path.join(__dirname, 'server/views'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');

app.use(session({
  secret: 'helloworld', // session secret
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./server/auth-routes')(app, passport);

app.listen(port, function () {
  console.log('Server started!');
});