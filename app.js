var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var livereload = require('livereload');
var connectLiveReload = require('connect-livereload');
var sassMiddleware = require('node-sass-middleware');
var router = require('./routes/index');
var hbs = require('hbs');
var helpers = require('./helpers');

// live reload setup
var liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials', function (err) {});
hbs.registerHelper('isEqual', helpers.isEqual);

app.use(connectLiveReload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  sassMiddleware({
    src: path.join(__dirname, 'scss'),
    dest: path.join(__dirname, 'public/stylesheets'),
    prefix: '/stylesheets',
    indentedSyntax: false, // true = .sass and false = .scss
    outputStyle: 'compressed',
  }),
);
app.use(express.static(path.join(__dirname, 'public')));

// router
app.use('/', router);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log('server is running');

module.exports = app;
