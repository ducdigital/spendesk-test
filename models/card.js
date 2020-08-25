'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Card.belongsTo(models.Wallet);
      models.Card.belongsTo(models.User);
    }
  };
  Card.init({
    balance: DataTypes.INTEGER,
    walletId: DataTypes.INTEGER,
    currency: DataTypes.ENUM('usd', 'gbp', 'eur'),
    company: DataTypes.STRING,
    cardNumber: DataTypes.STRING,
    expirationDate: DataTypes.DATE,
    ccv: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};