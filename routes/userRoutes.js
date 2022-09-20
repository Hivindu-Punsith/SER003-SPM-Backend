const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { getUsers ,createUser , updateUserInstructor , updateUserMemberShip , updateUser} = require("../controllers/userController.js");


router.post("/create-user",
	[
		check("email", "Please include a valid email").isEmail(),
	],
	createUser);
router.get("/all-users",getUsers);
router.put("/update-instructor/:id",updateUserInstructor);
router.put("/update-memberShip/:id",updateUserMemberShip);
router.put("/update-user/:id",updateUser);

module.exports = router;
