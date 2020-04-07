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
    required: true,
  },
  cards: [
    {
      cardText: {
        type: String,
      },
      cardIndex: {
        type: Number,
        required: true,
      },
    },
  ],
});

const List = mongoose.model("List", listSchema);

module.exports = List;
