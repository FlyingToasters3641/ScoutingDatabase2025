const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './appdb.sqlite'
});

module.exports = sequelize;