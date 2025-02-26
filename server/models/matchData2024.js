const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Adjust the path as needed


class MatchData2024 extends Model {}

MatchData2024.init({
  scouterName: DataTypes.STRING,
  matchNumber: DataTypes.INTEGER,
  teamNumber: DataTypes.INTEGER,
  eventKey: DataTypes.STRING,
  matchKey: DataTypes.STRING,
  event_id: DataTypes.INTEGER,
  position: DataTypes.STRING,
  uniqueId: DataTypes.STRING
}, { sequelize, modelName: 'matchdata2024' });

module.exports = MatchData2024;