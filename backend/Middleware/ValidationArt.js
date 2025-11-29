const ExpressError = require("../Utils/ExpressError");
const {ArtValidation,ReviewValidation,UserValidation} = require("../Validation/ArtValidation");

const validateArt = (req,res,next) =>
{
let{error} = ArtValidation.validate(req.body);

if(error)
{
throw new ExpressError(400,error);    
} 
else{
next();    
}
}


const validateReview = (req,res,next) =>
{
    req.body.user = req.userId;
let{error} = ReviewValidation.validate(req.body);

if(error)
{
throw new ExpressError(400,error);    
}
else{
next();    
}
}



const validateUser  = (req,res,next) =>
{
let{error} = UserValidation.validate(req.body);

if(error)
{
throw new ExpressError(400,error);    
}
else{
next();    
}
}


module.exports = {validateArt,validateReview,validateUser};