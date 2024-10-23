"use strict"

const jwt = require("jsonwebtoken")
require('dotenv').config
const dataToken = require('../config/tokes.json')

// create token
function createToken(id) {
  const payload = {
    id: id,
  }

  if (process.env.NODE_ENV === "development") {
    JWT_SECRET = process.env.JWT_SECRET
  }else{
    JWT_SECRET = dataToken.JWT_SECRET
  }

  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" })
}

// decoding token
function verifyToken(token) {

  if (process.env.NODE_ENV === "development") {
    JWT_SECRET = process.env.JWT_SECRET
  }else{
    JWT_SECRET = dataToken.JWT_SECRET
  }

  const decoded = new Promise((resolve, reject) => {
    try {
      const payload=  jwt.verify(token, JWT_SECRET)
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

