const express = require("express");
const router = express.Router();
const CartControllers = require("../Controllers/Cart");
const {jwtAuthMiddleware} = require("../Middleware/Authentication");
const WrapAsync = require("../Utils/WrapAsync");


// Add to cart
router.post("/additem", jwtAuthMiddleware,WrapAsync(CartControllers.PostIndex)); 

router.get("/getitem", jwtAuthMiddleware,WrapAsync(CartControllers.getItem));

router.delete("/deleteitem/:artworkId", jwtAuthMiddleware,WrapAsync(CartControllers.TrashItem));

module.exports = router;