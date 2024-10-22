"use strict"

const {body} = require("express-validator")  

const loginValidator = () => {
  return [
    body("email",  "STRING required with email").isEmail().withMessage("Invalid email"),
    body("password", "STRING required with password")
      .isString()
      .isLength({min: 6, max: 20}).withMessage("Password must be between 6 to 20 characters")
      .withMessage("Invalid password")
  ]
}

const registerValidator = () => {
  return [
    body("email", "STRING required with email").isEmail().withMessage("Invalid email"),

    body("password", "STRING required with password")
      .isString()
      .isLength({min: 6, max: 20}).withMessage("Password must be between 6 to 20 characters")
      .withMessage("Invalid password"),

    body("first_name", "STRING required with first name").isString().isLength({
      max: 25,
    }),
    body("last_name", "STRING required with last name").isString().isLength({
      max: 25,
    }),
    body("phone", "STRING required with telephone between 10 and 15 characters")
      .isString()
      .isLength({
        min: 10,
        max: 15,
      }),
  ]
}


const updatePasswordValidator = () => {
  return [
    body(
      "old_password",
      "STRING required with old password between 6 and 25 characters"
    )
      .isString()
      .isLength({
        min: 6,
        max: 35,
      }),
    body(
      "new_password",
      "STRING required with new password between 6 and 25 characters"
    )
      .isString()
      .isLength({
        min: 6,
        max: 35,
      }),
  ]
}

module.exports = {
  loginValidator,
  registerValidator,
  updatePasswordValidator,
}