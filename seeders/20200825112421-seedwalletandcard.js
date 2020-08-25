'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert('wallets', [{
        balance: 99900,
        currency: 'eur',
        userId: 1,
        company: 'Test',
        isMasterWallet: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        balance: 99900,
        currency: 'gbp',
        userId: 1,
        company: 'Test',
        isMasterWallet: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        balance: 99900,
        currency: 'usd',
        userId: 1,
        company: 'Test',
        isMasterWallet: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
      await queryInterface.bulkInsert('cards', [{
        balance: 5000,
        userId: 1,
        walletId: 1,
        currency: 'eur',
        company: 'Test',
        cardNumber: '4444444444444444', 
        expirationDate: new Date(),
        ccv: '012',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        balance: 5000,
        userId: 1,
        walletId: 2,
        currency: 'gbp',
        company: 'Test',
        cardNumber: '5555555555555555', 
        expirationDate: new Date(),
        ccv: '123',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        balance: 5000,
        userId: 1,
        walletId: 3,
        currency: 'usd',
        company: 'Test',
        cardNumber: '3333333333333333', 
        expirationDate: new Date(),
        ccv: '234',
        status: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
    } catch (ex) {
      console.trace(ex);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('wallets', null, {});
    await queryInterface.bulkDelete('cards', null, {});
  }
};
