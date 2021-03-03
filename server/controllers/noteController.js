const UserModel = require("../models/note.model");
require("dotenv").config();

class noteController {
  async save(req, res) {
    console.log("Сохранение письма");
    const { textAreaValue, targetEmail, deliveryDate, idUser } = req.body;
    const note = await new NoteModel({});
    return res.json({
      note: {
        author: idUser,
        text: textAreaValue,
        private: true,
        sendDate: deliveryDate,
        receivers: targetEmail,
      },
      message: "Письмо сохранено в базу",
    });
  }
}

module.exports = new noteController();
