'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transfers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      transferedAmount: {
        type: Sequelize.INTEGER
      },
      originCurrency: {
        type: Sequelize.ENUM('usd', 'gbp', 'eur')
      },
      targetCurrency: {
        type: Sequelize.ENUM('usd', 'gbp', 'eur')
      },
      conversionFee: {
        type: Sequelize.INTEGER
      },
      originEntityId: {
        type: Sequelize.INTEGER
      },
      targetEntityId: {
        type: Sequelize.INTEGER
      },
      originEntityType: {
        type: Sequelize.ENUM('card', 'wallet')
      },
      targetEntityType: {
        type: Sequelize.ENUM('card', 'wallet')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transfers');
  }
};