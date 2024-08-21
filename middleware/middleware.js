const jwt = require("jsonwebtoken");

// Your secret key (should match the one used to sign the JWT)
const secretKey = "your_jwt_secret_key";

const authenticateToken = (req, res, next) => {
  // console.log("auth");
  // Get token from Authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401); // No token, unauthorized

  jwt.verify(token, secretKey, (err, user) => {
    // console.log(err);
    if (err) return res.sendStatus(403); // Invalid token, forbidden

    req.user = user; // Attach user info to the request
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateToken;
