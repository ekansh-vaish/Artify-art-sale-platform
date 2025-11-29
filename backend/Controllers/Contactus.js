const ExpressError = require("../Utils/ExpressError");
const ContactUs = require("../Model/ContactUs");

module.exports.PostQuery =async(req,res,next) =>
{
const {Username , Email ,Subject ,Message} = req.body;

if(!Username && !Email)
{
next(new ExpressError(403,"Not Found"));    
}


const contactQuery = new ContactUs(
  {
  Username,
  Email,
  Subject,
  Message  
  }
);

const query = await contactQuery.save();
res.status(201).json({Message:"Successfully Added",query});
}



module.exports.getQueries = async(req,res,next) =>
{
const response = await ContactUs.find({});  

if(!response)
{
next(new ExpressError("No found",403));
}

res.status(201).json({Mesage : "Successfully Get it",response});
}


