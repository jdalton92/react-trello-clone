const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
  cardText: {
    type: String,
  },
  cardIndex: {
    type: Number,
    required: true,
  },
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "List",
  },
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
