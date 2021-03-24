const app = require('../app.js');
const NoteModel = require('../models/note.model');
require('dotenv').config();
const fs = require('fs')
class noteController {
  async save(req, res) {
    console.log('Сохранение письма');
    const { values, idUser } = req.body;
    const note = await new NoteModel({
      author: idUser,
      text: values.textAreaValue,
      deliveryDate: values.deliveryDate,
      receivers: values.targetEmail,
      photo: values.photo,
    });
    await note.save();
    const returnNote = await NoteModel.findById({ _id: note._id })
    return res.json({
      note: returnNote,
      message: 'Письмо сохранено в базу',
    });
  }

  async upload(req, res) {
    console.log('Загрузка фото');
    if (req.files === null) {
      return res.status(400).json({ message: 'Файл не загружен' });
    }
    const file = req.files.file;
    const timer = new Date().getTime()
    
    const uploadDir = `${__dirname}/../../front/uploads/`
    fs.mkdirSync(uploadDir, {recursive: true})

    file.mv(`${uploadDir}/${timer + '-' + file.name}`, err => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      }

      res.json({ filePath: `/uploads/${timer + '-' + file.name}` });
    });
  }

  async downdate(req, res) {
    console.log('Удаление фото');
    const { filePath } = req.body
    fs.unlink(`${__dirname}/../../front${filePath}`, (err) => {
      if (err) {
        console.error(err)
        return
      }
    })
    res.end()
  }
}

module.exports = new noteController();

