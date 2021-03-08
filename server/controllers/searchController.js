const app = require('../app.js');
const NoteModel = require('../models/note.model');
require('dotenv').config();

class searchController {
  async search(req, res) {
    let now = new Date();
    let nowDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes())
    const note = await NoteModel.find({
      deliveryDate: nowDay
    });

    if (note.length > 0) {
      return res.json({
        note: note,
        message: 'Есть запись для отправки',
      })
    } else return res.json({
      message: 'Нет записей для отправки',
    });
  }
}


module.exports = new searchController();
