const Sequelize = require("sequelize");
const sequelize = require('../database/connection');

module.exports = sequelize.define("Cliente", {
  id: {
    type: Sequelize.INTEGER(10),
    allowNULL: false,
    autoIncrement: true,
    primaryKey: true,
  },

  rfc: {
    type: Sequelize.STRING(12),
    allowNULL: false,
    unique: true,
  },

  name: {
    type: Sequelize.STRING(35),
    allowNULL: false,
    unique: true,
  },

  psw: {
    type: Sequelize.STRING(16),
    allowNULL: false,
  },

  email: {
    type: Sequelize.STRING(30),
    allowNULL: false,
    unique: true,
  },
});
