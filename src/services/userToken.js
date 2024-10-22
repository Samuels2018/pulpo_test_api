"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class user_tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_tokens.belongsTo(models.user, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  user_tokens.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
      modelName: "user_tokens",
    }
  );
  return user_tokens;
};