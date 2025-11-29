const ExpressError = require("../Utils/ExpressError");
const { CompetitionValidation, ValidateParticipation } = require("../Validation/CompetitionValidation")

const validateComp = (req,res,next) =>
{
const {error} = CompetitionValidation.validate(req.body);

if(error)
{
next(new ExpressError(400,"NO Data Found"));    
}
else
{
next();    
}

}

const validateParticipation = (req,res,next) =>
{
const {error} = ValidateParticipation.validate(req.body);
if(error)
    {
    next(ExpressError(400,"enable to load"));    
    }    
    else
    {
     next();   
    }
}

module.exports = {validateComp,validateParticipation};