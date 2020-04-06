const mongoose = require("mongoose");

const boardSchema = mongoose.Schema({
  boardName: {
    type: String,
    required: true,
  },
  boardDescription: {
    type: String,
    required: true,
  },
  lastModified: {
    type: String,
    default: Date.now,
    required: true,
  },
  lists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
