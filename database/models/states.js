'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class states extends Model {
   static associate(models) {
      states.belongsTo(models.Countries, {as: 'country', foreignKey: 'country_id'})
    }
  }
  states.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'states',
    tableName: 'states',
    underscored: true,
    timestamps: true,
  });
  return states;
};