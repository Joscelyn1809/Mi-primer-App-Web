"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ventaItem", {
      id: {
        type: Sequelize.INTEGER(10),
        allowNULL: false,
        autoIncrement: true,
        primaryKey: true,
      },

      idVenta: {
        type: Sequelize.INTEGER(10),
        allowNULL: false,
      },

      sku: {
        type: Sequelize.STRING(8),
        allowNULL: false,
      },

      cantProductos: {
        type: Sequelize.INTEGER(10),
        allowNULL: false,
      },

      subtotal: {
        type: Sequelize.FLOAT(6, 2),
        allowNull: false,
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ventaItem");
  },
};
