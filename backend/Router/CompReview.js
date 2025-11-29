const express = require("express");
const router = express.Router();
const ReviewController = require("../Controllers/CompReviewController");
const {jwtAuthMiddleware} = require("../Middleware/Authentication");

const {preventSelfReview} = require("../Middleware/preventSelfReview");
const WrapAsync = require("../Utils/WrapAsync");
router.post("/postReview/:id",jwtAuthMiddleware,preventSelfReview,WrapAsync(ReviewController.PostReview))


router.get("/getArtreview/:id",WrapAsync(ReviewController.index));



router.get("/getReview",WrapAsync(ReviewController.getReview));


module.exports = router;