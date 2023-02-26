'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('states', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT
        },
        country_id: {
          type: Sequelize.INTEGER,
          allowNull:false,
          references: {
            model: 'countries',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        name: {
          type: Sequelize.STRING,
          allowNull:false
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
        'states',
        {
          fields:['country_id'],
          type: 'unique',
          name: 'states_country_id',
          transaction
        })
      await transaction.commit()
    }catch (error) {
      await transaction.rollback()
      throw error
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.dropTable('states',{transaction});
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
};