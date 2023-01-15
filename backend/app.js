require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const cors = require("cors");
const session = require('express-session');
const passport = require('passport');

let mongoDB = process.env.DBURL

// Set up default mongoose connection
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var indexRouter = require('./routes/index');
var dataAPIRouter = require("./routes/dataAPI");
const userRouter = require('./routes/user');

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/*app.use(passport.initialize())
app.use(passport.session())*/
app.use(session({ 
    secret: process.env.SECRET, 
    resave: false, //required
    saveUninitialized: false //required 
}) );

app.use( (req, res, next) => {
    console.log('req.session', req.session);
    return next()
  } );


// Use routes 

app.use('/', indexRouter);
app.use("/dataAPI", dataAPIRouter);
app.use("/user", userRouter)


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