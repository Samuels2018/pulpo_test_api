"use strict";

const { Client, TokenCreateTransaction, Hbar, PrivateKey, AccountCreateTransaction } = require("@hashgraph/sdk");
const {user_tokens} = require("../models");
const {getAllUserTokens} = require("../services/userService");


const createTokenHedera = async (req, res) => {
  try {
    const { tokenNombre, tokenSimbolo, tokenNumber, userId } = req.body;

    // Configurar el cliente de Hedera con la nueva cuenta creada
    const client = Client.forTestnet();
    client.setOperator(process.env.MY_ACCOUNT_ID, process.env.MY_PRIVATE_KEY);

    // Crear la transacción del token
    const transaction = await new TokenCreateTransaction()
      //.setTransactionId(new TransactionId(shard, realm, num))
      .setTokenName(tokenNombre)
      .setTokenSymbol(tokenSimbolo)
      .setInitialSupply(tokenNumber)
      .setTreasuryAccountId(process.env.MY_ACCOUNT_ID)
      .setAdminKey(client.operatorPublicKey)
      .setFreezeKey(client.operatorPublicKey)
      .setKycKey(client.operatorPublicKey)
      .setWipeKey(client.operatorPublicKey)
      .freezeWith(client);

    console.log("Creating token...");

    // Enviar la transacción a la red Hedera
    const response = await transaction.execute(client);
    const receipt = await response.getReceipt(client);

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
  const data = await getAllUserTokens()
  return res.status(200).send({ data });
}

module.exports = {
  createTokenHedera,
  getAllTokens
};