const jwt = require('jsonwebtoken');
require('dotenv').config();
const { getUserByEmailModel } = require('../models/usersModel'); 
const authenticateJWT = async (req, res, next) => {
  console.log("Request cookies: ", req.cookies);

  const token = req.cookies['token'];
  console.log("Token received: ", token);
  
  if (!token) return res.status(401).send('Warning: Unauthorized token is provided.');
  
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Token decoded: ", decoded);

    
    const user = await getUserByEmailModel(decoded.email);
    if (user && user._id) {
      req.user = { ...decoded, userID: user._id }; 
      next();
    } else {
      res.status(404).send('User ID not found for the given email');
    }
  } catch (err) {
    console.log("Token verification failed: ", err);
    res.status(400).send('Bad token');
  }
};

module.exports = authenticateJWT;
