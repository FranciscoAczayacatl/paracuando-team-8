'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  
  class publications extends Model {
    static associate(models) {
      publications.belongsTo(models.Users, { as:'user', foreignKey:'user_id'});
      publications.belongsTo(models.publicationsTypes, {as:'publications_types', foreignKey:'publicatons_type_id'});
      publications.belongsTo(models.cities, {as:'cities', foreignKey:'cities_id'});
      publications.hasMany(models.publications_images, {as:'publication_images', foreignKey:'id'});
      publications.belongsToMany(models.Users,{as:'vote', through:models.votes, foreignKey:'user_id'});
      publications.belongsToMany(models.tags,{as:'publication_tag', through:models.publications_tags, foreignKey:'publication_id'})
    }
  }
  publications.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    publication_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'publications',
    tableName: 'publications',
    underscored: true,
    timestamps: true,
  });
  return publications;
};