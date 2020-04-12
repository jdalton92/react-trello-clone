const mongoose = require("mongoose");

const listSchema = mongoose.Schema({
  listTitle: {
    type: String,
    required: true,
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
  },
  listIndex: {
    type: Number,
  },
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
    },
  ],
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
  },
});

const List = mongoose.model("List", listSchema);

module.exports = List;
