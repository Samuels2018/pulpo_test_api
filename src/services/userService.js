"use strict"

const {user} = require("../models")
const {user_tokens} = require("../models")
//const model = db.user

// create user
const createUser = async (email, userName, name, phone, status, hash) => {

  const defaultData = {
    email: email || 'default_email@example.com',
    user_name: userName || 'default_user_name',
    name: name || 'default_name',
    phone: phone || 'default_phone',
    password: hash || 'default_password',
    status: status !== undefined ? status : 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  console.log('defaultData', defaultData)

  const [row, created] = await user.findOrCreate({
    where: { email: email },
    // i still don't define the default value for the status column
    defaults: defaultData,
  })

  console.log('dwdwwdwdw')


  return { row, created }

}

// find user by email
const findByEmail = async (email) => {
  return await user.findOne({ where: { email } })
}

// find user by id
const findById = async (id) => {
  return await user.findByPk(id)
}

// get all user
const getAllUsers = async () => {
  return await user.findAll()
}

const getAllUserTokens = async () => {
  return await user_tokens.findAll()
}

const updatePassword = async (id, password) => {
  return await user.update({ password }, { where: { id } })
}

const updateStatus = async (id, status) => {
  return await user.update({ status }, { where: { id } })
}

module.exports = {
  createUser,
  findByEmail,
  findById,
  getAllUsers,
  getAllUserTokens,
  updatePassword,
  updateStatus,
}
