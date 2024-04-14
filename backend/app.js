var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');                     
const session =  require('express-session');
const MongoStore = require('connect-mongo');

const mongoose = require('mongoose');
require('dotenv').config();

const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const postRouter = require('./routes/post');

var app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//------MongoDB & Mongoose settings
//Ensures that only values set in the schema get saved to the db
mongoose.set('strictQuery', false)

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}

app.use(cors({origin: process.env.ORIGIN_URL, credentials: true}));
app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: true, 
  store: MongoStore.create({mongoUrl: process.env.MONGODB_URL}) //mongoUrl: Set the MongoDB connection string
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

//Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => 
    res.sendFile(path.resolve(__dirname, '../backend', 'frontend', 'dist', 'index.html')));
}
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

//Use the provided PORT or default to 3000
const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
