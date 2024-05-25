const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    transcript: {
      type: String,
      required: true,
    },
  },
  { collection: "Lecture" }
);

const LectureModel = mongoose.model("Lecture", schema);
module.exports = LectureModel;
