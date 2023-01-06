const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

module.exports = sequelize.define("Administrador", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  nombre: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },

  email: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true,
  },
});
