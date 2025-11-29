const Art = require("../Model/Art");
const ExpressError = require("../Utils/ExpressError");


module.exports.PostArt =  async (req, res) => {
const { title, description, category, price, createdAt} = req.body;
const url = req.file.path;
const filename = req.file.filename;
const art = new Art({
title,
description,
category,
price,
artist : [req.userId],
createdAt,
image : {url,filename}
});

const response = await art.save();
res.status(201).json({ message: "Artwork Added Successfully", data: response });

}

module.exports.updateArt =  async (req, res,next) => {

    const updateData = {...req.body};
    if(req.file)
    {
     updateData.image = 
     {
     url : req.file.path,
     filename : req.file.filename   
     }  
    }

const response = await Art.findByIdAndUpdate(req.params.id, updateData, { new: true });
if (!response) {
next(new ExpressError(404,"Artwork Not found"));
}
res.status(200).json({ message: " Artwork Updated Successfully", data: response })
}

module.exports.GetArtworkId =  async (req, res,next) => {

const response = await Art.findById(req.params.id).populate("artist","id image name");
if (!response) {
next(new ExpressError(404,"Artwork Not found"));
}
res.status(200).json({ message: " Artwork Retrieved", data: response });

}

module.exports.Artwork = async (req, res) => {

const response = await Art.find().populate("artist","id image name");
res.status(200).json({ message: " All Artworks Retrieved", data: response });

}

module.exports.myArt = async (req, res) => {
const userId = req.userId;

const response = await Art.find({ artist: userId }).populate("artist", "id image name");

res.status(200).json({ message: "Your Artworks Retrieved", data: response });
}

module.exports.deleteArt = async (req, res,next) => {
const response = await Art.findByIdAndDelete(req.params.id);
if (!response) {
next(new ExpressError(404,"Artwork Not found"));
}
res.status(200).json({ message: " Artwork Deleted Successfully", data: response });

}

