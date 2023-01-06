const Sequelize = require("sequelize");
const sequelize = require('../database/connection');

module.exports = sequelize.define("Inventario", {
  id: {
    type: Sequelize.INTEGER(10),
    allowNULL: false,
    autoIncrement: true,
    primaryKey: true,
  },

  idProducto: {
    type: Sequelize.INTEGER(10),
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
    type: Sequelize.ENUM("A", "P", "E"),
    allowNULL: false,
  },
});
