const Art = require("../Model/Art");
const ExpressError = require("../Utils/ExpressError");
const Review = require("../Model/Review");

const ArtOwnerShip = async (req, res, next) => {
  const { id } = req.params;
  const art = await Art.findById(id);
   
   
  if (!art) {
    throw new ExpressError(404, "Artwork Not found");
  }

  if (!art.artist.equals(req.userId)) {
    throw new ExpressError(403, "You do not have permission to modify this artwork");
  }

  next();
};



const ReviewOwnerShip = async (req, res, next) => {
  const { id } = req.params;
  const userReview = await Review.findById(id);
   
   
  if (!userReview) {
    throw new ExpressError(404, "Artwork Not found");
  }


  if (!userReview.user.equals(req.userId)) {
    throw new ExpressError(403, "You do not have permission to modify this artwork");
  }

  next();
};

module.exports = {ArtOwnerShip,ReviewOwnerShip };
