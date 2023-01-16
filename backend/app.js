require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const mongoose = require("mongoose");
const cors = require("cors");
const session = require('express-session');
const passport = require('passport'); 
const MongoStore = require('connect-mongo');


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
const lvlupRouter = require('./routes/lvlup')

const app = express();
app.use(cors({origin: true, credentials: true}));
app.use(logger('dev'));
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())
app.use(express.json());
/*app.use(cookieParser());*/
app.use(session({ 
  secret: process.env.SECRET, 
  resave: false, //required
  store: MongoStore.create({ mongoUrl: mongoDB }),
  saveUninitialized: false, //required
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: false,
    secure: false
}
}) );
app.use ((req, res, next) => {
  console.log(req.session);
  next()
})
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')));


// Use routes 

app.use('/', indexRouter);
app.use("/dataAPI", dataAPIRouter);
app.use("/user", userRouter)
app.use("/lvlup", lvlupRouter)


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