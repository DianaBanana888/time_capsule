const { Schema, model } = require('mongoose')

const MediaModelSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'UserModel' },
  note: { type: Schema.Types.ObjectId, ref: 'NoteModel' },
  media: { type: String },
})

module.exports = model("MediaModel", MediaModelSchema)
