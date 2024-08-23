const express = require("express");
const { userController, loginController, updateUserController } = require("../controllers/userController");
const router = express.Router();

// Corrected route path with leading '/'
router.route("/register").post(userController);

router.route("/login").post(loginController);

router.route("/update-user").put(updateUserController)

module.exports = router;