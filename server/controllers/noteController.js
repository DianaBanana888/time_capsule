const app = require('../app.js');
const NoteModel = require('../models/note.model');
require('dotenv').config();

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

  async upload(req, res) {
    console.log('Загрузка фото');
    console.log('req.files', req.body)
    if (req.files === null) {
      return res.status(400).json({ message: 'Файл не загружен' });
    }
    const file = req.files.file;
    console.log('${__dirname} фото', `${__dirname}`);
    const timer = new Date().getTime()
    file.mv(`${__dirname}/../../front/uploads/${timer + '-' + file.name}`, err => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      }

      res.json({ fileName: file.name, filePath: `/uploads/${timer + '-' + file.name}` });
    });
  }
}

module.exports = new noteController();
