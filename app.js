var createError     = require('http-errors');
var express         = require('express');
var path            = require('path');
var cookieParser    = require('cookie-parser');
var logger          = require('morgan');
var session         = require('express-session');
var MySQLStore      = require('express-mysql-session')(session);
var indexRouter     = require('./routes/index');
var userRouter      = require('./routes/user');
var chatEditRouter  = require('./routes/chatEdit');
var chatRunRouter   = require('./routes/chatRun');

var dbConfig        = require('./config/db_config');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    key: 'session_cookie_name',
    secret: 'makechat_secret',
    resave: false,
    saveUninitialized: false,
		store: new MySQLStore({
			host: dbConfig.host,
			port: 3306,
			user: dbConfig.user,
			password: dbConfig.password,
			database: dbConfig.database
		})
				
}));

app.use('/'        , indexRouter    );
app.use('/user'    , userRouter     );
app.use('/chatEdit', chatEditRouter );
app.use('/chatRun' , chatRunRouter  );


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(function(err,req,res,next){
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

module.exports = app;
