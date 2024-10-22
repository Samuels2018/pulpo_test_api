"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "user",
      tableName: 'users',
    }
  );
  return user;
};