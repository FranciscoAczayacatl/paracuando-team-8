'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profiles extends Model {
    static associate(models) {
      Profiles.belongsTo(models.Users, { as: 'user', foreignKey: 'user_id' })
      Profiles.belongsTo(models.Roles, { as: 'role', foreignKey: 'role_id' })
    }
  }
  Profiles.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: DataTypes.UUID,
    role_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Profiles',
    tableName: 'Profiles',
    underscored: true,
    timestamps: true,
    scopes: {
      view_public: {
        attributes: ['id', 'user_id', 'role_id']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    }
  });
  return Profiles;
};