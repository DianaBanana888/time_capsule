const { Schema, model } = require('mongoose');

// https://code.tutsplus.com/articles/an-introduction-to-mongoose-for-mongodb-and-nodejs--cms-29527
// по ссылке говорится, что можно использовать баффер для бинарных данных как фото или пдф
// изучить Грифс https://docs.mongodb.com/manual/core/gridfs/
const addDays = 3;
const date = new Date();

const NoteModelSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'UserModel' },
  text: { type: String },
  photo: { type: String },
  video: { type: String },
  private: { type: Boolean, default: true },
  receivers: { type: String },
  sendDate: { type: Date, default: date.setDate(date.getDate() + addDays) },
  time: { type: String },
});

module.exports = model('NoteModel', NoteModelSchema);
