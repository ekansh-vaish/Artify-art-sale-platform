const multer = require("multer");
const ParticipantsControllers = require("../Controllers/ParticipantsControllers");
const express = require("express");
const router = express.Router();
const {jwtAuthMiddleware} = require("../Middleware/Authentication");
const WrapAsync = require("../Utils/WrapAsync");
const {validateParticipation} = require("../Middleware/ValidateCompetition");
const {storage2} = require("../cloudConfig");

  
 
 const upload = multer({ storage: storage2 });

router.post("/participate/:id",jwtAuthMiddleware,validateParticipation,upload.single("image"),WrapAsync(ParticipantsControllers.PostArt));


router.get("/getparticipants/:id",jwtAuthMiddleware,WrapAsync(ParticipantsControllers.index));

router.delete("/deleteparticipants/:id",jwtAuthMiddleware,WrapAsync(ParticipantsControllers.Trash));


module.exports = router;