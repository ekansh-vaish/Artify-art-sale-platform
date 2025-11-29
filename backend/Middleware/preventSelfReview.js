const {ParticipateComp}  = require("../Model/Competition"); // artwork model import karo
// const EventReview  = require("../Model/EventReview"); // artwork model import karo

// Middleware to prevent self-review
async function preventSelfReview(req, res, next) {
  try {
    const userId = req.userId; // jwtAuthMiddleware se aata hai
    const artId = req.params.id;

    // Find artwork by ID
    const artwork = await ParticipateComp.findById(artId);
    if (!artwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    // Check if current user is the artist
    if (artwork.artist.toString() === userId.toString()) {
      return res.status(403).json({ message: "You cannot review your own artwork" });
    }

    // Agar sab sahi hai to next middleware/handler call karo
    next();
  } catch (err) {
    next(err);
  }
}

// async function Preventduplicatereview(req,res,next) {
//   try {
//     const userId = req.params.id;
//     const compArtId = req.params.id;
//     const review = await EventReview.findOne({CompArt :compArtId,user : userId});
    
//     if(review)
//     {
//      return res.status(403).json({message : "Review exists"}); 
//     }
//     next();
//   } catch (error) {
//     console.log(error);
  
//   }
  
// }

module.exports = {preventSelfReview};
