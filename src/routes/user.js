"use strict";

const {
  getAllUser,
  findUserByID,
} = require("../controllers/userController");
const { createTokenHedera, getAllTokens } = require("../controllers/newTokenController");
const { Router } = require("express");
const auth = require("../middlewares/authMiddleware");

const user = Router();

user.get("/", auth, getAllUser);
user.get("/:id", auth, findUserByID);
user.post("/create_token_hedera", auth, createTokenHedera);
user.get("/users_tokens", auth, getAllTokens);

module.exports = user;
