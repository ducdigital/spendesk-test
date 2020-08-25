import db from '../../models/index.js';

/**
 * NOTE: Ideally I could like to separate this resolver into a more structure
 * and split it base on types. 
 * 
 * In this file I dumping all the resolvers in 1 file to save some time.
 */

const resolvers = {
  Query: {
    user: async (_, { id }) => {
      return await db.User.findOne({
        where: { id }
      });
    },
  },
  Mutation: {
    blockCard: async (_, { id }) => {
      const update = await db.Card.update({ status: false }, {
        where: {
          id,
        }
      });

      return await db.Card.findOne({ where: { id: update[0] } });
    },
    createWallet: async (_, {user, currency}) => {
      return await db.Wallet.create({
        userId: user,
        balance: 0,
        currency,
      });
    },
    createCard: async (_, {walletId}) => {
      return await db.sequelize.transaction(async (t) => {
        const wallet = await db.Wallet.findOne({
          where: {id: walletId}
        }, {transaction: t});
        console.log(db.Card.generateRandomCCV());
        if (!wallet) {
          throw new Error('No Wallet Found');
        }
        const timeNow = new Date();
        return await db.Card.create({
          userId: wallet.userId,
          balance: 0,
          currency: wallet.currency,
          cardNumber: db.Card.generateCardNumber(),
          ccv: db.Card.generateRandomCCV(),
          expirationDate: new Date(timeNow.setMonth(timeNow.getMonth()+1)),
          status: true,
        });
      });
    }
  },
  User: {
    wallets: async (user) => {
      return await db.Wallet.findAll({
        include: db.User,
        where: {
          userId: user.id
        }
      });
    },
    cards: async (user) => {
      return await db.Card.findAll({
        include: db.User,
        where: {
          userId: user.id
        }
      });
    }
  }
};
export default resolvers;