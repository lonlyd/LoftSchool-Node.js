const lowdb = require('lowdb');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const FileSync = require('lowdb/adapters/FileSync');
const PORT = 3000;

const adapter = new FileSync(path.join(__dirname, 'db/db.json'));
const db = lowdb(adapter);
const app = express();

app.set('views', path.join(__dirname, 'template'));
console.log(path.join(__dirname, 'template'));

app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public'));
app.use('/', require(path.join(__dirname, 'routes')));
console.log(path.join(__dirname, 'routes'));


//404
app.use(function (req, res, next) {
  let err = new Error('Page not found');
  err.status = 404;
  next(err);
});
//error handler and render the error page
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', { message: err.message, error: err });
});

const server = app.listen(process.env.PORT || PORT, function () {
  console.log('Server start on port: ' + server.address().port);
});