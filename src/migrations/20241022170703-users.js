'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true
      },
      user_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('users');
  }
};
