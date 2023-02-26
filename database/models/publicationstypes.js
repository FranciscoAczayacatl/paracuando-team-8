'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class publicationsTypes extends Model {
    static associate(models) {
       publicationsTypes.hasMany(models.Publications,{as: 'publications', primaryKey:'publication_type_id'})
    }
  }
  publicationsTypes.init({
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.BIGINT
    },
    name:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'publicationsTypes',
    tableName: 'publicationsTypes',
    underscored: true,
    timestamps: true,
  });
  return publicationsTypes;
};