var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');                     
const session =  require('express-session');

const mongoose = require('mongoose');
require('dotenv').config();

const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const postRouter = require('./routes/post');
const commentRouter = require('./routes/comments');

var app = express();
app.use(cors({origin: 'http://localhost:5173',credentials: true}));
app.use(session({ secret: process.env.EXPRESS_SESSION_SECRET, resave: false, saveUninitialized: true}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  //Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //Send error message & status
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
      status: err.status || 500,
    }
  })
});

//------MongoDB & Mongoose settings

//Ensures that only values set in the schema get saved to the db
mongoose.set('strictQuery', false)

//Set the MongoDB connection string based on the environment
const mongoDB = (process.env.NODE_ENV === 'production') ? process.env.MONGODB_URL_PROD : process.env.MONGODB_URL_DEV;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

//Use the provided PORT or default to 3000
const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
