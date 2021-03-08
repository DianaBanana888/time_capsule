const express = require('express');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const { startDb, sessionStore } = require('./db/mongoDb')
const userMiddleware = require('./middleware/authMiddleware');
require('./config/passport.js');
const authRouter = require('./routes/auth');
const noteRouter = require('./routes/note');
const searcheRouter = require('./routes/search');
const app = express();
startDb
  .on('connected', () => {
    console.log('Mongoose default connection open to ' + process.env.DB_PATH);
  })
  .on('error', (err) => {
    console.log('Mongoose default connection error: ' + err);
  })
  .on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
  });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('./../front/uploads'))

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 365,
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload());
app.use(userMiddleware);
app.use('/auth', authRouter);
app.use('/note', noteRouter);
app.use('/search', searcheRouter);
module.exports = app;
