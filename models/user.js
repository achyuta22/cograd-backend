const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // For password hashing

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
