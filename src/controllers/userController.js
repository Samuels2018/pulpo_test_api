"use strict";

const {getAllUsers, findById} = require("../services/userService");

async function getAllUser(req, res) {
  const data = await getAllUsers();
  return res.status(200).send({ data });
}

async function findUserByID(req, res) {
  const data = await findById(req.params.id);
  if (data === null) {
    return res.status(404).json({ message: "User ID does not exist" });
  }

  return res.status(200).json({ data });
}

module.exports = {
  getAllUser,
  findUserByID
};