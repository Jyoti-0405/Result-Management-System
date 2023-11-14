var createError = require('http-errors');
var express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
let authService = require('./services/auth.service');
// CLIENT ROUTES
let pagesRouter = require('./routes/client/clientPages.route');
let teacherViewRoutes = require('./routes/client/teacherView.route');
let studentViewRoutes = require('./routes/client/studentView.route');

// SERVER ROUTES
let authenticationRoute = require('./routes/server/auth.route');
let teacherRoute = require('./routes/server/teacher.route');
let studentRoute = require('./routes/server/student.route');

var corsOptions = {
    origin: [
      "http://localhost:3001"
    ],
    methods: ["GET", "PUT", "POST", "PATH", "DELETE"],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

var app = express();
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory))
//parsing URL encoded bodies(as sent by html forms)
app.use(express.urlencoded({ extended: false }));
//Parse JSON bodies(as sent by html forms)
app.use(express.json());
app.use(cors(corsOptions));
app.set('view engine', 'ejs');

/// Client route implementation
app.use('/', pagesRouter)
app.use('/auth', require('./routes/client/clientAuth.route'));
app.use('/useractions', teacherViewRoutes)
app.use('/studentaction', studentViewRoutes);

// Server route implementation
app.use('/api/user', authenticationRoute);
app.use('/api/teacher', authService.authenticateToken, teacherRoute);
app.use('/api/student', authService.authenticateToken, studentRoute);

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Authorization, Content-length, Connection"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use seminars)
  res.setHeader("Access-Control-Allow-Credentials", false);

  // Pass to next layer of middleware
  next();
});

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
  return res.status(err.status || 500).json({
    success: false,
    response: err
  });
//   res.render('error');
});


module.exports = app;
