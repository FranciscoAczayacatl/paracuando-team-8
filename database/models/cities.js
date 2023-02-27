'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cities extends Model {
    static associate(models) {
      cities.belongsTo(models.states, {as: 'state', foreignKey: 'state_id'})
      cities.hasMany(models.publications, {as: 'Publications', foreignKey: 'city_id'})
    }
  }
  cities.init({
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    state_id:{
      type:  DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type:DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'cities',
    tableName: 'cities',
    underscored: true,
    timestamps: true,
  });
  return cities;
};