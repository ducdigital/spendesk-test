'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert('users', [{
        name: 'John Doe',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
    } catch (ex) {
      console.trace(ex);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
