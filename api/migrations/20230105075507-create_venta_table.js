"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ventas", {
      id: {
        type: Sequelize.INTEGER(10),
        allowNULL: false,
        autoIncrement: true,
        primaryKey: true,
      },

      idCliente: {
        type: Sequelize.INTEGER(10),
      },

      subtotal: {
        type: Sequelize.FLOAT(6, 2),
        allowNull: false,
      },

      impuestos: {
        type: Sequelize.FLOAT(6, 2),
        allowNull: false,
      },

      total: {
        type: Sequelize.FLOAT(6, 2),
        allowNull: false,
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ventas");
  },
};
