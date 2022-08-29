const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { getUsers ,createUser , } = require("../controllers/userController.js");


router.post("/create-user",
	[
		check("email", "Please include a valid email").isEmail(),
	],
	createUser);
router.get("/all-users",getUsers);


module.exports = router;
