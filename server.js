var express = require('express');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var path = require('path');

var mysqlHelper = require('./server/db/mysql-helper');

var configDB = require('./server/db/config');
var app = express();
var port = process.env.PORT || 8081;

// using mongo db
// mongoose.connect(configDB.mongodb_url);

require('./server/auth/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'ejs');
console.log(__dirname + '/public')
app.use(express.static(__dirname + '/public'));

app.use(session({
  secret: 'helloworld', // session secret
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./server/auth-routes')(app, passport);

app.use('/', require('./server/admin')(express));
app.use('/api', require('./server/api')(express));

app.listen(port, function () {
  console.log('Server started!');
});