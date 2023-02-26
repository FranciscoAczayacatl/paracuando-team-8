'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('publications_images', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        publication_id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          references: {
            model: 'publications',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        image_url: {
          type: Sequelize.STRING
        },
        order: {
          type: Sequelize.INTEGER
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
        'publications_images',
        {
          fields:['publication_id'],
          type:'unique',
          name:'publications_publication_id',
          transaction
        })
      await transaction.commit()
    }catch (error){
      await transaction.rollback()
      throw error
    }
  },
  async down(queryInterface, Sequelize) {
    
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.dropTable('publications_images',{transaction});
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
};