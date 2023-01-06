const Sequelize = require("sequelize");
const sequelize = require('../database/connection');

module.exports = sequelize.define("Carrito", {
  id: {
    type: Sequelize.INTEGER(10),
    allowNULL: false,
    autoIncrement: true,
    primaryKey: true,
  },

  idCliente: {
    type: Sequelize.INTEGER(10),
  },

  sku: {
    type: Sequelize.STRING(8),
  },

  cantProducto: {
    type: Sequelize.INTEGER(10),
    allowNull: false,
  },

  subtotal: {
    type: Sequelize.FLOAT(6,2),
    allowNull: false,
  },

  impuestos: {
    type: Sequelize.FLOAT(6,2),
    allowNull: false,
  },

});
