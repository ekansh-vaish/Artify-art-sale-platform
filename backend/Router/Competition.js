
const express = require("express");
const router = express.Router();
const {jwtAuthMiddleware} = require("../Middleware/Authentication");
const {isAdmin} = require("../Middleware/IsAdmin");
const CompetitionController = require("../Controllers/CompetitonContoller");
const WrapAsync = require("../Utils/WrapAsync");
const  { validateComp } = require("../Middleware/ValidateCompetition");


router.post("/create",jwtAuthMiddleware,validateComp ,isAdmin,WrapAsync(CompetitionController.AddComp));



router.get("/getdetail",jwtAuthMiddleware,WrapAsync(CompetitionController.CompetitonList))

router.get("/getdetail/:id",WrapAsync(CompetitionController.CompetitonListById))




router.delete("/deleteevent/:id",jwtAuthMiddleware,isAdmin,WrapAsync(CompetitionController.TrashEvent));



module.exports = router;