const Joi = require("joi");

const ArtValidation = Joi.object({
 title: Joi.string().required(),
   description: Joi.string().required(),
   image: Joi.string().allow("",null), 
   category: Joi.string().required(),
   price: Joi.number().required().min(0),
   artist: Joi.string().required()   
})


const ReviewValidation = Joi.object(
    {
    user : Joi.string().required(),
    rating : Joi.number().required(),
    comment : Joi.string().required(), 
    createdAt : Joi.date().optional()   
    }
)
 
const UserValidation = Joi.object(
  {
    name : Joi.string().required(),
    email : Joi.string().required(), 
    Phone : Joi.number().required(), 
    password : Joi.string().required(),
    createdAt : Joi.date().optional(),  
    image : Joi.string().required(), 
  }
)

module.exports = { ArtValidation , ReviewValidation ,UserValidation};

