import apolloServerExpress from 'apollo-server-express';
/**
 * This file contains all type definition of the graphql api
 * 
 * NOTE: Ideally we will have an authentication layer and make sure using 
 * the userId from this authentication layer instead of using the variable 
 * `userId`. For the sake of simplicity I add the userId in the API. 
 * Not secure but did the job.
 */
const { gql } = apolloServerExpress;

export default gql`
  type Query {
    # Fetch the user
    user(id: ID!): User

    # Return a list of all transfer made by user
    ledger: [Transfer]
  }

  type Mutation {
    # Create wallet 
    createWallet(user: ID!, currency: CurrencyEnum): Wallet

    # Create card
    createCard(walletId: ID!): Card

    # Transfer money between any pair (Wallet, Card) 
    loadMoney(amount: Int!, fromType: entityTypeEnum!, fromId: ID!, toType: entityTypeEnum!, toId: ID!): Transfer

    # Block a card
    blockCard(id: ID!): Card
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
    originEntityId: ID
    targetEntityType: entityTypeEnum
    targetEntityId: ID
  }

  enum entityTypeEnum {
    card
    wallet
  }

  enum CurrencyEnum {
    usd
    eur
    gbp
  }
`;