const { Schema, model } = require("mongoose");
const addDays = 3;
const date = new Date();
const NoteModelSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "UserModel" },
  text: { type: String },
  photo: [{
    originalFileName: { type: String },
    filePath: { type: String }
  }],
  video: { type: String },
  wantSending: { type: Boolean, default: true },
  receivers: { type: String },
  deliveryDate: { type: Date },
  creationDate: { type: Date, default: new Date() }
});

module.exports = model("NoteModel", NoteModelSchema);
