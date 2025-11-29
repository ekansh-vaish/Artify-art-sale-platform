const express = require("express");
const router = express.Router();
const {jwtAuthMiddleware} = require("../Middleware/Authentication");
const WrapAsync = require("../Utils/WrapAsync");
const  {validateReview} = require("../Middleware/ValidationArt");
const {ReviewOwnerShip} = require("../Middleware/ArtOwnerShip");
const ReviewControllers = require("../Controllers/ReviewControllers");
router.post("/postreview/:id",jwtAuthMiddleware,validateReview,WrapAsync(ReviewControllers.postReview));

router.get("/getReviews/:id",jwtAuthMiddleware,WrapAsync(ReviewControllers.FetchReview));



router.delete("/deleteReview/:id",jwtAuthMiddleware,ReviewOwnerShip,WrapAsync(ReviewControllers.DeleteReview))

module.exports = router;