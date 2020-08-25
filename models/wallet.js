'use strict';
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Wallet.hasMany(models.Card);
      models.Wallet.belongsTo(models.User);
    }
  };
  /**
   * The variable isMasterWallet a bit weird in my opinion. 
   * It make sense if we use it for polymorphic between 
   * Wallet and Card, but that will cause more constraint.
   */
  Wallet.init({
    balance: DataTypes.INTEGER,
    currency: DataTypes.ENUM('usd', 'gbp', 'eur'),
    userId: DataTypes.INTEGER,
    company: DataTypes.STRING,
    isMasterWallet: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Wallet',
  });

  return Wallet;
};