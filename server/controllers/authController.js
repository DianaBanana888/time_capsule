const UserModel = require("../models/user.model");
const NoteModel = require("../models/note.model");
const bcrypt = require("bcrypt");
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
    const note = await NoteModel.find({ author: req.user.id })
    console.log("ЛОГИН:");
    return res.json({
      user: {
        id: user.id,
        login: user.login,
        email: user.email,
        note: note,
      },
    });
  }

  signout(req, res) {
    console.log("singOut");
    req.logout();
    return res.json({ session: false });
  }

  async essential(req, res) {
    const user = await UserModel.findOne({ _id: req.user.id });
    const note = await NoteModel.find({ author: req.user.id })
    console.log("essential step for upd state");
    return res.json({
      user: {
        id: user.id,
        login: user.login,
        email: user.email,
        note: note,
      },
    });
  }
}

module.exports = new authController();
