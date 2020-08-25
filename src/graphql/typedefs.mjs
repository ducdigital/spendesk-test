import apolloServerExpress from 'apollo-server-express';
const { gql } = apolloServerExpress;
export default gql`
  type Query {
    user: User
  }
  type User {
    id: ID!
    wallets: [Wallet]
  }
  type Wallet {
    id: ID!
    balance: Int
    isMasterWallet: Boolean
    currency: CurrencyEnum
    company: Company
  }
  type Company {
    id: ID!
    name: String
  }
  type Card {
    id: ID!
    wallet: Wallet
    currency: CurrencyEnum
    balance: Int
    cardNumber: String
    exp: String
    ccv: Int
    user: User
    status: Boolean
  }

  type Transfer {
    id: ID!
    timestamp: Int
    transferedAmount: Int
    originCurrency: CurrencyEnum
    targetCurrency: CurrencyEnum
    conversionFee: Int
    originEntityType: entityTypeEnum
    originEntityID: ID
    targetEntityType: entityTypeEnum
    targetEntityID: ID
  }

  enum entityTypeEnum {
    CARD
    WALLET
  }

  enum CurrencyEnum {
    USD
    EUR
    GBP
  }
`;