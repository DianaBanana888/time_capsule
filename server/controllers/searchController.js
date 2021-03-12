const app = require('../app.js');
const NoteModel = require('../models/note.model');
const UserModel = require('../models/user.model');
require('dotenv').config();

class searchController {
  async search(req, res) {
    let now = new Date();
    let nowDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes())
    const basicNote = await NoteModel.find({
      deliveryDate: nowDay, wantSending: true
    }).lean();

    let note = basicNote.map(async (el) => {
      const user = await UserModel.findOne({ _id: el.author });
      el.sender = user.email
      return el
    })
    const noteSend = await Promise.all(note)

    if (noteSend.length > 0) {
      return res.json({
        note: noteSend,
        message: 'Есть запись для отправки',
      })
    } else return res.json({
      message: 'Нет записей для отправки',
    });
  }
}


module.exports = new searchController();
