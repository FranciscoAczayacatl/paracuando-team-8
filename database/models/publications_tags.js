'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class publications_tags extends Model {
    static associate(models) {
      publications_tags.belongsTo(models.tags,{as:'tag',foreignKey:'tag_id'})
      publications_tags.belongsTo(models.publications,{as:'publications', foreignKey:'publication_id'})
    }
  }
  publications_tags.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    publication_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'publications_tags',
    tableName: 'publications_tags',
    underscored: true,
    timestamps: true,
  });
  return publications_tags;
};