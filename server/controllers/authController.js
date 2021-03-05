const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class authController {
  async registration(req, res) {
    console.log("Регистрация:", req.user);
    const user = await UserModel.findOne({ _id: req.user._id });
    return res.json({
      user: {
        id: user.id,
        login: user.login,
        email: user.email,
      },
    });
  }

  async login(req, res) {
    const user = await UserModel.findOne({ _id: req.user.id });
    console.log("ЛОГИН:");
    return res.json({
      user: {
        id: user.id,
        login: user.login,
        email: user.email,
      },
    });
  }

  signout(req, res) {
    console.log("singOut");
    req.logout();
    return res.json({ session: false });
  }
}

module.exports = new authController();
