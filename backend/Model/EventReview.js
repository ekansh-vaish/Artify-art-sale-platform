const mongoose = require("mongoose");

const EventReview = new mongoose.Schema(
    {
    user : 
    {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"    
    },
    CompArt :
    {
    type : mongoose.Schema.Types.ObjectId,
    ref : "ParticipateComp"    
    },
    comment : 
    {
    type : String,    
    },
    rating : 
    {
    type : Number,
    min : 1 ,
    max : 5    
    },
    createdAt :
    {
    type : Date,
    default : true    
    }


    }
)

const CompReview = mongoose.model("EventReview",EventReview);

module.exports = CompReview;