"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("inventorio", {
      id: {
        type: Sequelize.INTEGER(10),
        allowNULL: false,
        autoIncrement: true,
        primaryKey: true,
      },

      sku: {
        type: Sequelize.STRING(8),
        allowNULL: false,
      },

      cantExistencia: {
        type: Sequelize.INTEGER(10),
        allowNULL: false,
      },

      cantReserva: {
        type: Sequelize.INTEGER(10),
        allowNULL: false,
      },

      minimo: {
        type: Sequelize.INTEGER(10),
        allowNULL: false,
      },

      estado: {
        type: Sequelize.ENUM('A', 'P', 'E'),
        allowNULL: false,
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("inventorio");
  },
};
