const { Schema, model } = require("mongoose");
const addDays = 3;
const date = new Date();
const NoteModelSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "UserModel" },
  text: { type: String },
  photo: { type: String },
  video: { type: String },
  private: { type: Boolean, default: true },
  receivers: { type: String },
  // deliveryDate: { type: Date },
  sendDate: { type: Date, default: date.setDate(date.getDate() + addDays) },
  time: { type: String },
});

module.exports = model("NoteModel", NoteModelSchema);
