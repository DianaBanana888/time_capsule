const app = require('../app.js');
const NoteModel = require('../models/note.model');
require('dotenv').config();

class searchController {
  async search(req, res) {
    console.log('Search письма');
    //адаптация к Машиному коду (дата и время раздельно)

    // const { nowDay, tomorrowDay, time } = req.body;
    // const tempNote = await NoteModel.find({
    //   sendDate: { $gt: nowDay }, sendDate: { $lt: tomorrowDay }
    // });
    // console.log('tempNote', tempNote)
    // const note = note.filter(el => el.time === time ? el : el != el)
    // console.log('note', note)
    // console.log('note', note.length)

    //адаптация к моему коду (дата и время вместе)

    let now = new Date();
    let nowDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes())
    console.log('nowDay', nowDay)
    const note = await NoteModel.find({
      dianaDeliveryDate: nowDay
    });
    console.log('note', note)

    //работает для обоих частей 

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
