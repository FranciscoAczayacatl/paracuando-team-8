'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('users_tags', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        tag_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'tags',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        user_id: {
          allowNull: false,
          defaultValue: Sequelize.UUIDV4,
          type: Sequelize.UUID,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      },{ transaction })
      await queryInterface.addConstraint(
        'users_tags',
        {
          fields:['user_id','tag_id'],
          type:'unique',
          name:'users_tags_user_id_tag_id',
          transaction
        })
      await transaction.commit()
    } catch (error){
      await transaction.rollback()
      throw error
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.dropTable('users_tags', {transaction});
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }

  }
};