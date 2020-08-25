import db from '../../models/index.js';

const resolvers = {
  Query: {
    user: async (id) => {
      return await db.User.findOne({
        id
      });
    },
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