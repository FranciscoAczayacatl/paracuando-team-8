'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class votes extends Model {
    static associate(models) {
      votes.belongsTo(models.Publications,{as:'publications', foreignKey:'publication_id'})
      votes.belongsTo(models.Users,{ as:'user', foreignKey:'user_id'})
    }
  }
  votes.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    publication_id:{
      type: DataTypes.UUID,
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'votes',
    tableName: 'votes',
    underscored: true,
    timestamps: true,
  });
  return votes;
};