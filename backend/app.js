require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
var cors = require("cors");

let mongoDB = process.env.DBURL

// Set up default mongoose connection
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const personaggio = require("./models/personaggio");
const attacchi = require("./models/attacchi");
const bonus = require("./models/bonus");
const inventario = require("./models/inventario");
const magie = require("./models/magie");
const missioni = require("./models/missioni");
const abilita_innate = require("./models/abilita_innate");
const tattiche = require("./models/tattiche");

var indexRouter = require('./routes/index');
var dataAPIRouter = require("./routes/dataAPI");

var app = express();

/* app.set('views', path.join(__dirname, 'frontend/public'));
app.set('view engine', 'pug'); */
// Use APIs

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use routes 

app.use('/', indexRouter);
app.use("/dataAPI", dataAPIRouter);

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
      });
  });
  
  module.exports = app;