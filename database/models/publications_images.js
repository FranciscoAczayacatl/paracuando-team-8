'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class publications_images extends Model {
    static associate(models) {
      publications_images.belongsTo(models.publications,{as:'publication', primaryKey:'publication_id'})
    }
  }
  publications_images.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    publication_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'publications_images',
    tableName: 'publications_images',
    underscored: true,
    timestamps: true,
  });
  return publications_images;
};