"use strict";

const { Client, TokenCreateTransaction, Hbar } = require("@hashgraph/sdk");
const {user_tokens} = require("../models");
const {getAllUserTokens} = require("../services/userService");

const createTokenHedera = async (req, res) => {
  try {
    const { tokenNombre, tokenSimbolo, tokenNumber, userId } = req.body;

    // Configurar el cliente de Hedera
    const client = Client.forTestnet(); // O Client.forMainnet() si estás usando la red principal
    client.setOperator(process.env.HEDERA_ACCOUNT_ID, process.env.HEDERA_PRIVATE_KEY);

    // Crear la transacción del token
    const transaction = await new TokenCreateTransaction()
      .setTokenName(tokenNombre)
      .setTokenSymbol(tokenSimbolo)
      .setInitialSupply(tokenNumber)
      .setTreasuryAccountId(process.env.HEDERA_ACCOUNT_ID)
      .setAdminKey(client.operatorPublicKey)
      .setSupplyKey(client.operatorPublicKey)
      .freezeWith(client)
      .signWithOperator(client)

    console.log("Creating token...")
    // Enviar la transacción a la red Hedera
    const response = await transaction.execute(client)
    const receipt = await response.getReceipt(client)

    // Obtener el ID del token creado
    const tokenId = receipt.tokenId;

    // Guardar el token en la base de datos
    await user_tokens.create({ token: tokenId.toString(), userId });
    
    res.status(201).json({ message: "Token created successfully", tokenId });
  } catch (error) {
    console.error("Error creating token:", error);
    res.status(500).json({ message: "Error creating token", error: error.message });
  }
};


async function getAllTokens(req, res) {
  console.log("getAllTokens")
  const data = await user_tokens.findAll();
  return res.status(200).send({ data });
}

module.exports = {
  createTokenHedera,
  getAllTokens
};