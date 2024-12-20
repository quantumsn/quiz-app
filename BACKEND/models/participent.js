const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const participentSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
});

const Participent = mongoose.model("Participent", participentSchema);

module.exports = Participent;
