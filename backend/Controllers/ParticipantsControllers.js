const ExpressError = require("../Utils/ExpressError");
const {ParticipateComp, Competition} = require("../Model/Competition");

module.exports.PostArt = async(req,res) =>
{
const userId = req.userId;
const artwork = req.params.id;
const {title,description,theme} = req.body;
const filename = req.file.filename;
const url = req.file.path;
const UserParticpate = new ParticipateComp(
  {
  title,
  description,
  theme,
  image :  {url,filename},
  artist : userId,
  competition : req.params.id,
  createdAt : Date.now(),
  }
)
 
if(!UserParticpate)
{
res.json({message : "Sorry no  Uploded"})  
}

const result = await UserParticpate.save();

const Event = await Competition.findById(req.params.id);
 if (!Event) {
      return res.status(404).json({ message: "Competition not found" });
    }
Event.entries.push({user : userId,artwork : artwork});
await Event.save();

res.status(201).json({Message : "participation Done",result});
}


module.exports.index = async (req,res,next) =>
{
const response = await ParticipateComp.find({competition : req.params.id}).populate("artist","id name image");

if(!response)
{
return next(new ExpressError(204,"No data Found"))  
}
res.status(201).json({message : "Participants Listed",response});
}


module.exports.Trash = async (req,res,next) =>
{
  const userId = req.userId;

const art = await ParticipateComp.findById(req.params.id);

if(!art)
{
next(new ExpressError(204,"No data Found"))  
}


  if (art.artist.toString() !== userId.toString()) {
      return next(new ExpressError(403, "Not authorized to delete this artwork"));
    }

const result = await ParticipateComp.findByIdAndDelete(req.params.id);



res.status(201).json({message : "Art comp deleted",result});
}