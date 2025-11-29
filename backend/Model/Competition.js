const { required } = require("joi");
const mongoose = require("mongoose");
const { type, min } = require("../Validation/ArtValidation");



const CompetitionSchema = new mongoose.Schema({
title: String,
description: String,
theme: String,
prize: String,
deadline: Date,
entries: [
{
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
artwork: { type: mongoose.Schema.Types.ObjectId, ref: 'Art' },

},
],
});


const participateArt = new mongoose.Schema(
{
title :
{
type : String,   
},   
description :
{
type : String,   
},  
theme :
{
type : String,   
}, 
artist: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required: true
},
competition : 
{
type : mongoose.Schema.Types.ObjectId,
ref : "Competition"
},
image : 
{
url : String,
filename : String,
},
createdAt :
{
type : Date, 
default : Date.now  
}   
}
)


const Competition = mongoose.model("Competition", CompetitionSchema);

const ParticipateComp = mongoose.model("ParticipateComp",participateArt)
module.exports = {ParticipateComp,Competition}