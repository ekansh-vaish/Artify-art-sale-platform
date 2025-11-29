const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      artwork: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Art",
        required: true,
      },
      addedAt: {
        type: Date,
        default: Date.now,
      }
    }
  ]
});

module.exports = mongoose.model("Cart", CartSchema);
