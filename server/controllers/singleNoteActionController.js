const app = require('../app.js');
const NoteModel = require('../models/note.model');
require('dotenv').config();

class singleNoteActionController {
  async changeMind(req, res) {
    console.log('ChangeMind')
    const { id, wantSending } = req.body
    await NoteModel.updateOne({ _id: id }, { wantSending: !wantSending })
    res.end()
  }
  async delete(req, res) {
    console.log('Delete a note')
    const { id } = req.body
    await NoteModel.deleteOne({ _id: id })
    res.end()
  }
  async upd(req, res) {
    console.log('Upd note\'s text ')
    const { id, text } = req.body
    await NoteModel.updateOne({ _id: id }, { text: text })
    res.end()
  }
}

module.exports = new singleNoteActionController();
