const mongoose = require("mongoose");

const boardSchema = mongoose.Schema({
  //TO DO
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
