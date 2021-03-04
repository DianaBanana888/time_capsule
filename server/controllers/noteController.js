const NoteModel = require("../models/note.model");
require("dotenv").config();
class noteController {
  async save(req, res) {
    console.log("Сохранение письма");
    const { values, idUser } = req.body;

    const note = await new NoteModel({
      author: idUser,
      text: values.textAreaValue,
      private: true,
      sendDate: values.deliveryDate,
      time: values.time,
      receivers: values.targetEmail,
      photo: values.photo,
    });
    await note.save();
    return res.json({
      note: {
        author: idUser,
        text: values.textAreaValue,
        private: true,
        sendDate: values.deliveryDate,
        receivers: values.targetEmail,
        photo: values.photo,
      },
      message: "Письмо сохранено в базу",
    });
  }
}

module.exports = new noteController();
