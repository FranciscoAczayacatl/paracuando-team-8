'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('cities', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        state_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            model: 'states',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
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
        'cities',
        {
          fields: ['state_id'],
          type: 'unique',
          name: 'cities_state_id',
          transaction
        })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback();
      throw error
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.dropTable('cities', {transaction});
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
};