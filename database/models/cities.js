'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cities extends Model {
    static associate(models) {
      cities.belongsTo(models.States, {as: 'country', foreignKey: 'country_id'});
      cities.hasMany(models.Publications, {as: 'Publications', foreignKey: 'city_id'});
    }
  }
  cities.init({
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    state_id:{
      type:  DataTypes.BIGNIT,
      allowNull: false
    },
    name: {
      type:DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'cities',
    tableName: 'ciites',
    underscored: true,
    timestamps: true,
  });
  return cities;
};