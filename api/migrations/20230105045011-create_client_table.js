"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("clientes", {
      id: {
        type: Sequelize.INTEGER(10),
        allowNULL: false,
        autoIncrement: true,
        primaryKey: true,
      },

      rfc: {
        type: Sequelize.STRING(12),
        allowNULL: false,
        unique: true,
      },

      name: {
        type: Sequelize.STRING(35),
        allowNULL: false,
      },

      psw: {
        type: Sequelize.STRING(16),
        allowNULL: false,
      },

      email: {
        type: Sequelize.STRING(30),
        allowNULL: false,
        unique: true,
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("clientes");
  },
};
