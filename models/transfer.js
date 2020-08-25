'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transfer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Transfer.init({
    transferedAmount: DataTypes.INTEGER,
    originCurrency: DataTypes.ENUM('usd', 'gbp', 'eur'),
    targetCurrency: DataTypes.ENUM('usd', 'gbp', 'eur'),
    conversionFee: DataTypes.INTEGER,
    originEntityId: DataTypes.INTEGER,
    targetEntityId: DataTypes.INTEGER,
    originEntityType: DataTypes.ENUM('card', 'wallet'),
    targetEntityType: DataTypes.ENUM('card', 'wallet')
  }, {
    sequelize,
    modelName: 'Transfer',
  });
  return Transfer;
};