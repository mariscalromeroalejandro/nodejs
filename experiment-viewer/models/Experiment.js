const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Experiment = sequelize.define("Experiment", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Experiment;
