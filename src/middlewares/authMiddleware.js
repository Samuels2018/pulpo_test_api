"use strict"
// jsonwebtoken
const tokenService = require("../helpers/jwt")
require('dotenv').config();


const auth =  (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "Not have any authorization" })
  }

  const token = req.headers.authorization.split(" ")[1]
  tokenService
    .verifyToken(token)
    .then((response) => {
      req.user = response
      next()
    })
    .catch((error) => {
      return res.status(401).send({
        code: response.code,
        message: response.message,
      })
    })
}

module.exports = auth