'use strict'

const token = require('../helpers/jwt')
const bcrypt = require('bcrypt');
const {user_tokens} = require('../models')
const {createUser, findByEmail, findById, updatePassword} = require('../services/userService')

// login
async function login(req, res) {
  console.log(req.body)
  const {loginEmail, loginPassword} = req.body


  try {
    const userEmail = await findByEmail(loginEmail)

    // validate if the user exists
    if (!userEmail) {
      return res.status(404).send({message: "Email not found"})
    }

    console.log("userEmail",userEmail.dataValues)

    const { id, email: userEmail_, user_name, name: userName } = userEmail.dataValues;
    const data = { id, email: userEmail_, user_name, name: userName };

    console.log("data", userEmail.dataValues.password)
    // validate password
    const validPassword = bcrypt.compareSync(loginPassword, userEmail.dataValues.password)
    if (!validPassword) {
      return res.status(401).send({message: "Invalid password"})
    }

    // validate status user
    /*if (userEmail.dataValues.status === 0) {
      return res.status(401).send({message: "User is not active"})
    }*/

    // everything is correct
    res.status(200).send({
      message: "Login successful",
      token: token.createToken(id),
      data
    })


  }catch(error) {
    return res.status(500).send({message: error.message})
  }
}

// register

async function register (req, res) {

  const saltRounds = 10
  const {registerEmail, registerUsername, registerName, registerPhone, userStatus, registerPassword, confirmPassword} = req.body

  console.log(req.body)

  try {
    // validate if the user exists
    const userEmail_ = await findByEmail(registerEmail)
    if (userEmail_) {
      return res.status(400).send({message: "Email already exists"})
    }

    /*const validPassword = bcrypt.compareSync(registerPassword, confirmPassword)
    if (!validPassword) {
      return res.status(401).send({message: "Invalid password"})
    }*/

    // hash password
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(registerPassword, salt)

    
    // create user
    const {row, created} = await createUser(registerEmail, registerUsername, registerName, registerPhone, userStatus, hash)


    if (!created) {
      return res.status(400).send({message: "User could not be created"})
    }


    const { id, email: userEmail, user_name, name: userNames } = row.dataValues;

    const tokenId = token.createToken(id)

    await user_tokens.create({ token: tokenId, id });

    const data = { id, email: userEmail, user_name, name: userNames };

    // everything is correct
    res.status(201).send({
      message: "User created successfully",
      token: tokenId,
      data
    })

  }catch(error) {
    return res.status(500).send({message: error.message})
  }
}


// change password
async function changePassword (req, res) {
  const userId = await findById(req.params.id)

  if (!userId) {
    return res.status(404).send({message: "User not found"})
  }

  const {old_password, new_password} = req.body
  const validPassword = bcrypt.compareSync(old_password, userId.dataValues.password)
  if (!validPassword) {
    return res.status(401).send({message: "Invalid password"})
  }

  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)

  const hash = bcrypt.hashSync(new_password, salt)

  await updatePassword(userId.dataValues.id, hash)

  res.status(200).send({
    message: "Password updated successfully"
  })

}

// logout
function logout(req, res) {
  res.status(200).send({message: "Logout successful"})
}

module.exports = {
  login,
  register,
  changePassword,
  logout
}