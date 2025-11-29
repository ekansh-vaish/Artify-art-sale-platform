const Review = require("../Model/Review");
const ExpressError = require("../Utils/ExpressError");
module.exports.postReview = async(req,res) =>
{ 
const {comment,rating,createdAt} = req.body;
 const artworkId = req.params.id;
 
const review = new Review(
  {
  comment,
  rating ,
  createdAt,
  user : req.userId,
  artwork : artworkId,   
},

);
if(!review)
{
return  next(new ExpressError(404,"Artwork Not found"));
}
const response = await review.save();
res.status(201).json({message : "Review Successfully Added",data : response});


}

module.exports.FetchReview = async(req,res,next) =>
{
const {id} = req.params;
const response = await Review.find({artwork : id}).populate("user","id name");
if(!response || response.length === 0)
{
return next(new ExpressError(404,"No reviews"))  
}
res.status(201).json({Message : "Reviews Here..",response});
}

module.exports.DeleteReview = async (req,res,next) =>
{
const response = await Review.findByIdAndDelete(req.params.id);
if(!response)
{
return next(new ExpressError(404,"No Reviews"))
}
res.status(201).json({message : "Delete Successfully",response})
}