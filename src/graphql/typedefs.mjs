import apolloServerExpress from 'apollo-server-express';
const { gql } = apolloServerExpress;
export default gql`
  type Query {
    user(id: ID!): User
    cards(user: ID!): [Card]
    wallets(user: ID!): [Wallet]
  }
  type User {
    id: ID!
    name: String
    wallets: [Wallet]
    cards: [Card]
  }
  type Wallet {
    id: ID!
    balance: Int
    isMasterWallet: Boolean
    currency: CurrencyEnum
    company: String
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