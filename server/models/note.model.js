const { Schema, model } = require('mongoose');

const NoteModelSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'UserModel' },
  text: { type: String },
  photo: { type: String },
  video: { type: String },
  private: { type: Boolean, default: true },
  receivers: { type: String },
  deliveryDate: { type: Date },
});

module.exports = model('NoteModel', NoteModelSchema);
