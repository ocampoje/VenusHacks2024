const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    feedback: { type: [String], default: [] },
    lecture_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecture",
      required: true,
    },
  },
  { collection: "Note" }
);

const NoteModel = mongoose.model("Note", schema);
module.exports = NoteModel;
