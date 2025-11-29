const ContactUsController = require("../Controllers/Contactus");
const WrapAsync = require("../Utils/WrapAsync");
const express = require("express");
const router = express.Router();
const {jwtAuthMiddleware} = require("../Middleware/Authentication");

router.post("/addquery",jwtAuthMiddleware,WrapAsync(ContactUsController.PostQuery));
router.get("/getqueries",WrapAsync(ContactUsController.getQueries));

module.exports = router;