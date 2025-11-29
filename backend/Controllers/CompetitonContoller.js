const {Competition,ParticipateComp} = require("../Model/Competition");
const ExpressError = require("../Utils/ExpressError");
const EventReview = require("../Model/EventReview");

module.exports.AddComp = async(req,res,next) =>
{
 
const {title,description,theme,prize,deadline} = req.body;

if(!title || !description || !theme )
{
next(ExpressError(501,"no found"));
}


const competition = new Competition(
  {
  title,
  description,
  theme,
  prize,
  deadline,
  }
)

const response = await competition.save();

res.status(201).json({message : "Successfully",response} );
}


module.exports.CompetitonList = async(req,res) =>
{
const response = await Competition.find()
.populate("entries.user","id image name")
.populate("entries.artwork");
res.status(201).json({message :"finded successfully",response});   
}


module.exports.CompetitonListById = async(req,res) =>
{
const response = await Competition.findById(req.params.id)

res.status(201).json({message :"finded successfully",response});   
}


module.exports.TrashEvent = async(req,res) =>
{
const response = await  Competition.findByIdAndDelete(req.params.id);

if(!response)
{
res.json({message :"No Data found"});  
}
    const participants = await ParticipateComp.find({ competition: req.params.id });
    const participantIds = participants.map(p => p._id);
    
    await ParticipateComp.deleteMany({ competition: req.params.id });

    await EventReview.deleteMany({ CompArt: { $in: participantIds } });

res.status(201).json({Message : "Deleted Successfully",response})


}