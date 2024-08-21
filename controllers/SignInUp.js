const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Secret key for JWT (you should store this in an environment variable)
const JWT_SECRET = "your_jwt_secret_key"; // Replace with your own secret key

const Signup = async (req, res) => {
  console.log("req for signup");
  console.log(req.body);
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10); // Generate salt for hashing
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

    // Create a new user instance with the hashed password
    user = new User({
      email,
      password: hashedPassword, // Save the hashed password
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h", // Token expiration time
    });

    // Exclude password from user object
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(201).json({
      message: "User registered successfully",
      user: userWithoutPassword,
      token, // Send token in response
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const Signin = async (req, res) => {
  console.log("req for signin");
  console.log(req.body);
  const { email, password } = req.body;
  try {
    // Find the user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h", // Token expiration time
    });

    // Exclude password from user object
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(200).json({
      message: "User signed in successfully",
      user: userWithoutPassword,
      token, // Send token in response
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { Signup, Signin };
