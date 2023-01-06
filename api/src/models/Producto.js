const Sequelize = require("sequelize");

module.exports = sequelize.define("Producto", {
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
    type: Sequelize.FLOAT(6,2),
    allowNULL: false,
  },

  precio: {
    type: Sequelize.FLOAT(6,2),
    allowNULL: false,
  },
});
