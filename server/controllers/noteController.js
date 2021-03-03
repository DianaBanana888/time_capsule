const NoteModel = require('../models/note.model');
require('dotenv').config();

class noteController {
  async save(req, res) {
    console.log('Сохранение письма');
    const { values, idUser } = req.body;
    const note = await new NoteModel({
      author: idUser,
      text: values.textAreaValue,
      private: true,
      sendDate: values.deliveryDate,
      receivers: values.targetEmail,
    });
    await note.save();
    return res.json({
      note: {
        author: idUser,
        text: values.textAreaValue,
        private: true,
        sendDate: values.deliveryDate,
        receivers: values.targetEmail,
      },
      message: 'Письмо сохранено в базу',
    });
  }
}

module.exports = new noteController();
