"use strict"

const jwt = require("jsonwebtoken")
require('dotenv').config

// create token
function createToken(id) {
  const payload = {
    id: id,
  }

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" })
}

// decoding token
function verifyToken(token) {
  const decoded = new Promise((resolve, reject) => {
    try {
      const payload=  jwt.verify(token, process.env.JWT_SECRET)
      resolve(payload.id)
    }catch(error) {
      reject({
        status: 401,
        message: "the token has expired or is invalid",
      });
    }
  })
  return decoded
}

module.exports = {
  createToken,
  verifyToken,
}

