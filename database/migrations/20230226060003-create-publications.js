'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize)  {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('publications', {
        id: {
          allowNull: false,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          type: Sequelize.UUID
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
        publication_type_id: {
          allowNull: false,
          type: Sequelize.BIGINT,
          references: {
            model: 'publicationsTypes',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        city_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'cities',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        title: {
          allowNull: false,
          type: Sequelize.STRING
        },
        description: {
          allowNull: false,
          type: Sequelize.STRING
        },
        content: {
          allowNull: false,
          type: Sequelize.STRING
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
        'publications',
        {
          fields:['user_id','publication_type_id','city_id'],
          type:'unique',
          name:'publications_user_id_publication_type_id_city_id',
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
      await queryInterface.dropTable('publications', {transaction});
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
};