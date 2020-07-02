const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3000;
const session = require('express-session');
const flash = require('connect-flash');
const app = express();


app.set('views', path.join(__dirname, 'template'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use('/', require(path.join(__dirname, 'routes')));
app.use(
  session({
    secret: 'loftschool',
    key: 'sessionkey',
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 60000
    },
    saveUninitialized: false,
    resave: false
  })
);


//404
app.use(function (req, res, next) {
  let err = new Error('Page not found');
  err.status = 404;
  next(err);
});
//error handler and render the error page
app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.render('error', { message: err.message, error: err });
});

const server = app.listen(process.env.PORT || PORT, function () {
  console.log('Server start on port: ' + server.address().port);
});