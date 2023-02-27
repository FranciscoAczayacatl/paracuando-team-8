'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tags extends Model {
    static associate(models) {
      tags.hasMany(models.publications_tags,{ as:'tags', foreignKey:'tag_id'})
      tags.hasMany(models.users_tags,{as:'users_tags', foreignKey:'tag_id'})
    }
  }
  tags.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    description: {
      type:DataTypes.STRING,
      allowNull:false
    },
    image_url: {
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'tags',
    tableName: 'tags',
    underscored: true,
    timestamps: true,
  });
  return tags;
};