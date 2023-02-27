'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users_tags extends Model {
    static associate(models) {
      users_tags.belongsTo(models.tags,{as:'tag',foreignKey:'tag_id'});
      users_tags.belongsTo(models.Users,{as:'user', foreignKey:'tag_id'})
    }
  }
  users_tags.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tag_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'users_tags',
    tableName: 'users_tags',
    underscored: true,
    timestamps: true,
  });
  return users_tags;
};