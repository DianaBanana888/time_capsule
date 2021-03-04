const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')
require('dotenv').config()
class authController {

  async registration(req, res) {
    console.log("Регистрация:");
    const user = await UserModel.findOne({ id: req.user.id })
    return res.json({ message: "Пользователь зарегистрирован" })
  }

  async login(req, res) {
    const user = await UserModel.findOne({ _id: req.user.id })
    console.log("ЛОГИН:");
    return res.json({
      user: {
        id: user.id,
        login: user.login,
        email: user.email
      }
    })
  }

  signout(req, res) {
    console.log("singOut");
    req.logout()
    return res.json({ session: false });
  }
}

module.exports = new authController()
