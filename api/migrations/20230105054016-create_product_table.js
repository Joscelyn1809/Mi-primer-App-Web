"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("productos", {
      id: {
        type: Sequelize.INTEGER(10),
        allowNULL: false,
        autoIncrement: true,
        primaryKey: true,
      },

      sku: {
        type: Sequelize.STRING(8),
        allowNULL: false,
        unique: true,
      },

      descripcion: {
        type: Sequelize.STRING(50),
        allowNULL: false,
      },

      unidad: {
        type: Sequelize.STRING(10),
        allowNULL: false,
      },

      costo: {
        type: Sequelize.FLOAT(6, 2),
        allowNULL: false,
      },

      precio: {
        type: Sequelize.FLOAT(6, 2),
        allowNULL: false,
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("productos");
  },
};
