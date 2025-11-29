const {jwtAuthMiddleware} = require("../Middleware/Authentication");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const WrapAsync = require("../Utils/WrapAsync");
const {ArtOwnerShip} = require("../Middleware/ArtOwnerShip");
const {validateArt} = require("../Middleware/ValidationArt");
const ArtWorkControllers = require("../Controllers/Artwork");
const {storage} = require("../cloudConfig");



const upload = multer({ storage: storage });

  router.post("/sendart",jwtAuthMiddleware,validateArt,upload.single("image"),WrapAsync(ArtWorkControllers.PostArt));

// -------------------- UPDATE --------------------
router.put("/updateart/:id",jwtAuthMiddleware,ArtOwnerShip,validateArt,upload.single('image'),WrapAsync(ArtWorkControllers.updateArt));

// -------------------- READ --------------------
router.get("/getart/:id",jwtAuthMiddleware,WrapAsync(ArtWorkControllers.GetArtworkId));

// -------------------- READ ALL --------------------
router.get("/getart",jwtAuthMiddleware,WrapAsync(ArtWorkControllers.Artwork));

router.get("/myart", jwtAuthMiddleware, WrapAsync(ArtWorkControllers.myArt));

// -------------------- DELETE --------------------
router.delete("/deleteart/:id",jwtAuthMiddleware,ArtOwnerShip,WrapAsync(ArtWorkControllers.deleteArt));

module.exports = router;