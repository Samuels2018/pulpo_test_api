"use strict"

const {login, register, changePassword} = require("../controllers/authController")
const {Router} = require("express")
const auth = require("../middlewares/authMiddleware")
const {loginValidator, registerValidator, updatePasswordValidator} = require("../validates/userValidate")
//const validate = require("../validates")

const userAuth = Router()

// registerValidator()
userAuth.post("/login", loginValidator(), login)
userAuth.post("/register", register)
userAuth.put("/change-password/:id", auth, updatePasswordValidator(), changePassword)

module.exports = userAuth