const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const { Signup, Signin } = require("../controllers/SignInUp");
router.route("/register").post(Signup);
router.route("/login").post(Signin);

module.exports = router;
