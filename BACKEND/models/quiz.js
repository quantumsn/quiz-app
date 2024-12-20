const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      quesText: {
        type: String,
        required: true,
      },
      options: {
        type: [String],
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  participents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Participent",
    },
  ],
});

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;
