module.exports = (req, res, next) => {
  if (req.user) {
    res.locals.userlogin = req.user?.login;
    res.locals.useremail = req.user?.email;
    res.locals.userid = req.user?.id;
  }
  next();
};
