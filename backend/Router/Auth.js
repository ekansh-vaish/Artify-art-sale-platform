const express = require("express");
const router = express.Router();
const multer = require("multer");
const {validateUser} = require("../Middleware/ValidationArt");
const WrapAsync = require("../Utils/WrapAsync");
const AuthControllers = require("../Controllers/AuthControllers");
const {storage1} = require("../cloudConfig");


const upload = multer({ storage: storage1 })

router.post("/signup",validateUser,upload.single("image"),WrapAsync(AuthControllers.signup))


router.post("/login",WrapAsync(AuthControllers.Login))

router.post("/logout",AuthControllers.Logout);


module.exports = router;