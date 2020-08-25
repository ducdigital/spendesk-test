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
    ledger: async () => {
      return await db.Transfer.findAll();
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
    createWallet: async (_, { user, currency }) => {
      return await db.Wallet.create({
        userId: user,
        balance: 0,
        currency,
      });
    },
    createCard: async (_, { walletId }) => {
      return await db.sequelize.transaction(async (t) => {
        const wallet = await db.Wallet.findOne({
          where: { id: walletId }
        }, { transaction: t });
        
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
          expirationDate: new Date(timeNow.setMonth(timeNow.getMonth() + 1)),
          status: true,
        });
      });
    },
    loadMoney: async (_, {
      amount,
      fromType,
      fromId,
      toType,
      toId,
    }) => {
      return await db.sequelize.transaction(async (t) => {
        const typeMap = {
          card: db.Card,
          wallet: db.Wallet,
        };
        const fromEntity = await typeMap[fromType].findOne({
          where: { id: fromId }
        });
        const toEntity = await typeMap[toType].findOne({
          where: { id: toId }
        });
        const transfer = new db.Transfer;

        if (fromEntity.balance < amount) {
          throw new Error('Insufficient balance');
        }

        if (fromEntity.currency !== toEntity.currency) {
          /**
           * Conversion logic here
           */
          throw new Error(`Converting ${fromEntity.currency} to ${toEntity.currency}. Conversion logic not implemented`);
        }

        if (fromEntity.currency === toEntity.currency) {
          transfer.conversionFee = 0;
        }

        if (typeof fromEntity.status !== 'undefined' && fromEntity.status === false) {
          throw new Error('Card blocked, cannot send money from this card');
        }

        if (typeof toEntity.status !== 'undefined' && toEntity.status === false) {
          throw new Error('Card blocked, cannot send money to this card');
        }

        fromEntity.balance -= amount;
        toEntity.balance += amount;
        transfer.transferedAmount = amount;
        transfer.originCurrency = fromEntity.currency;
        transfer.targetCurrency = toEntity.currency;
        transfer.originEntityId = fromEntity.id;
        transfer.targetEntityId = toEntity.id;
        transfer.originEntityType = fromType;
        transfer.targetEntityType = toType;

        
        fromEntity.save();
        toEntity.save();
        transfer.save();

        return transfer;
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