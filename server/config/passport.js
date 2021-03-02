/* eslint-disable consistent-return */
const passport = require('passport');
const passportLocal = require('passport-local');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user.model');
const LocalStrategy = passportLocal.Strategy;
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err, user) => {
    done(err, { login: user.login, email: user.email, id: user.id });
  });
});
const authenticateuser = async (req, l, p, done) => {
  console.log('login, email, password', req.body)
  const { login, email, password } = req.body
  try {
    if (/login/.test(req.path)) {
      console.log('login, email, password', login, email, password)
      const user = await UserModel.findOne({ email: email }).exec();
      console.log('user', user)
      if (!user) {
        console.log('not okay')
        return done(null, false);

      }
      if (await bcrypt.compare(password, user.password)) {
        console.log('okay');
        return done(null, user)
      }
      // else 
      return done(null, false);
    }
    if (/registration/.test(req.path) && login && email && password) {
      console.log('req', req.body)
      try {
        const hashPass = await bcrypt.hash(password, 3);
        console.log('hashPass', hashPass)
        const newUser = new UserModel({
          login: login,
          email: email,
          password: hashPass,
        });
        console.log('newUser', newUser)
        await newUser.save();
        done(null, newUser);
      } catch (e) {
        return done(null, false);
      }
    }
  } catch (error) {
    done(error);
  }
};
passport.use(
  new LocalStrategy(
    {
      usernameField: 'login',
      passwordField: 'password',
      // самая крутая вещь - не надо заходить заново(данные в локальном хранилище)
      passReqToCallback: true,
    },
    authenticateuser,
  ),
);
