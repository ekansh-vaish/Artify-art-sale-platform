const mongoose = require("mongoose");

const ArtSchema = new mongoose.Schema({
title: {
type: String,
required: true
},
description: {
type: String,
required: true
},
image: {
url : String,
filename : String
},
category: {
type: String,
required: true
},
price: {
type: Number,
required: true
},
artist: {
type: mongoose.Schema.Types.ObjectId,
ref: "User", 
required: true
},

createdAt: {
type: Date,
default: Date.now
}
});

module.exports = mongoose.model("Art", ArtSchema);
