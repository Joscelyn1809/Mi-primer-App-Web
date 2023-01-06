const Sequelize = require("sequelize");
const sequelize = require('../database/connection');

module.exports = sequelize.define("Venta", {
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

  idProducto: {
    type: Sequelize.INTEGER(10),
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
});
