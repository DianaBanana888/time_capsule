const app = require('../app.js');
const NoteModel = require('../models/note.model');
require('dotenv').config();

class testamController {
  async search(req, res) {
    let now = new Date();
    let nowDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      now.getMinutes()
    );
    if (nowDay === createdDate + testamInt)
      const testamLetterToSend = await NoteModel.find({
        deliveryDate: nowDay,
      });
  }
}

module.exports = new testamController();
