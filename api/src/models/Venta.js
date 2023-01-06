const Sequelize = require("sequelize");

module.exports = sequelize.define("Venta", {
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
    type: Sequelize.FLOAT(6,2),
    allowNull: false,
  },

  impuestos: {
    type: Sequelize.FLOAT(6,2),
    allowNull: false,
  },

  total: {
    type: Sequelize.FLOAT(6,2),
    allowNull: false,
  },
});
