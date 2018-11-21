const express = require('express');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const establishConn = async () => {
  await mongoose.connect(
    process.env.DATABASE_URL,
    { useNewUrlParser: true, replicaSet: 'rs' }
  );
};

const app = express();
require('dotenv').config();

establishConn();

app.use(logger('dev'));
app.use(express.json());
app.use(expressValidator());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.route('/').all((req, res) => {
  res.send('Welcome to Shopping Societies');
});

app.use('/', require('./src/router'));

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   next(createError(404));
// });

// error handler
app.use((error, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};

  // render the error page
  res.status(error.status || 500);
  res.json({ error });
});

module.exports = app;
