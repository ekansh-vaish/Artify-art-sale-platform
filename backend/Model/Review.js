const mongoose = require("mongoose");
const { type, min } = require("../Validation/ArtValidation");

const ReviewSchema = new mongoose.Schema(
   {
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  artwork: { type: mongoose.Schema.Types.ObjectId, ref: 'Art' },
  rating: 
  {
  type : Number,
  min : 1,
  max : 5  
  },
  comment: String,
  createdAt: Date
}
)



module.exports = mongoose.model("Review",ReviewSchema);