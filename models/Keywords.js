const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Keywords extends Model {}

Keywords.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    key_name: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'keywords',
  }
);

module.exports = Keywords;