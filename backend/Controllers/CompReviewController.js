const ExpressError = require("../Utils/ExpressError");
const {  ParticipateComp } = require("../Model/Competition");
const  CompReview = require("../Model/EventReview");

module.exports.PostReview = async(req,res,next) =>
{

    const userId = req.userId;
   
const {comment,rating} = req.body;


const artwork = await ParticipateComp.findById(req.params.id);

if(!artwork)
{
 res.json({message : "No art Found"})   
}

if(artwork.artist.toString() === userId.toString())
{
 return res.status(403).json({message : "you cannot review"});   
}

const ReviewResponse = new CompReview(
    {
    comment,
    rating,
    user : userId,
    CompArt : req.params.id,
    createdAt : new Date()
    }
)

if(!ReviewResponse)
{
return next(new ExpressError(404,"Page Not found"));
}




const result = await ReviewResponse.save();

res.status(201).json({Message : "Review Posted Succussfully",result});

}

module.exports.index = async(req,res) =>
{
const response = await CompReview.find({ CompArt: req.params.id } ).populate("user","id image name").populate("CompArt")

if(!response)
{
res.json("No review Found");    
}

res.status(201).json({message : "Review Listed",response});

}


module.exports.getReview = async(req,res) =>
{
const response = await CompReview.find().populate("user","id image name").populate("CompArt")

if(!response)
{
res.json("No review Found");    
}


res.status(201).json({message : "Reviews here",response})
}