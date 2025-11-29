 const Joi = require("joi");

const CompetitionValidation = Joi.object(
  {
   title : Joi.string().required(),
   description : Joi.string().required(),
   theme : Joi.string().required(),
   prize : Joi.string().required(),
   deadline : Joi.date().optional(),
  }
)

const ValidateParticipation = Joi.object(
    {
   
   title : Joi.string().required(),
   description : Joi.string().required(),
   theme : Joi.string().required(),
   image : Joi.string().required(),
   createdAt : Joi.date().optional(),
    }
)

module.exports = { CompetitionValidation,ValidateParticipation };