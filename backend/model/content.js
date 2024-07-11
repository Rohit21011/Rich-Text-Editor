const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

const Content = mongoose.model("Content", contentSchema);

module.exports = Content;
