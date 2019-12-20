/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secret = require("../secret");

module.exports = (req, res, next) => {

  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Cant pass - restricted Middleware " })
      } else {
        req.decodedJwt = decodedToken
        next();
      }
    })
  } else {
    res.status(400).json({ message: "Cant recieve info" })
  }
}
