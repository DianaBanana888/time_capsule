const express = require("express");
const fileUpload = require("express-fileupload");
const session = require("express-session");
const path = require('path');
const passport = require("passport");
const cors = require("cors");
const { startDb, sessionStore } = require("./db/mongoDb");
const userMiddleware = require("./middleware/authMiddleware");
require("./config/passport.js");
const authRouter = require("./routes/auth");
const noteRouter = require("./routes/note");
const searcheRouter = require("./routes/search");
const singleNoteRouter = require("./routes/singleNoteAction");
const app = express();
startDb
  .on("connected", () => {
    console.log("Mongoose default connection open to " + process.env.DB_PATH);
  })
  .on("error", (err) => {
    console.log("Mongoose default connection error: " + err);
  })
  .on("disconnected", () => {
    console.log("Mongoose default connection disconnected");
  });

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(dirname, 'client', 'build'))); // middlewares
app.use("/uploads", express.static("./../front/uploads"));

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 365,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload());
app.use(userMiddleware);
app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);
app.use("/api/search", searcheRouter);
app.use("/api/singleNoteAction", singleNoteRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(dirname, 'client', 'build', 'index.html'));
});

module.exports = app;
