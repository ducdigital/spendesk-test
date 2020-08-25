# Wallet simulation

## Prequisite
- This application use Node 14.

## First start
- Run `yarn install`
- Run `npx sequelize-cli db:migrate` to migrate the database
- Run `npx sequelize-cli db:seed:all` to seed base data

## Start up the application
You can either run `node ./src/app.mjs` or `yarn dev`. This will start up the application in dev mode 

------


# API Documentation

This application use *GraphQL* as an API layer and can be reach on path `/graphql`

All amount in this application stored as Integer. To be able to display properly, please divide by 100 when trying to display

## Query

### Accecssing User Information

`user(id: ID!): User`

Return user attributes, including cards and wallet as a graph node

Example:
```
query($id: ID!) {
  user(id: $id) {
    name
    wallets {
      id
      balance
      currency
    }
    cards {
      id
      cardNumber
      currency
      ccv
      status
    }
  }
}
----------
{
	"id": 1
}
```

### View Ledger

`ledger: [Transfer]`

Allow accessing list of all transaction made by the application.

Example:
```
query {
  ledger{
    timestamp
    transferedAmount
    originCurrency
    targetCurrency
    conversionFee
    originEntityType
    originEntityId
    targetEntityType
    targetEntityId
  }
}
```

## Mutations

### Create a wallet

`createWallet(user: ID!, currency: CurrencyEnum): Wallet`

*Variables:*
- `userId` : ID of the user
- `currency`: `CurrencyEnum` (usd|eur|gbp)

*Output*: `Wallet`

*Description*: This method allow user to create a wallet with a starting amount of 0.

*Query Example*:
```
mutation($user: ID!, $currency: CurrencyEnum!) {
  createWallet(user: $user, currency: $currency) {
    id
    currency
    balance
    isMasterWallet
  }
}
--------
{
	"user": 1,
	"currency": "EUR"
}
```

### Create a card

`createCard(walletId: ID!): Card`

*Variables:*
- `walletId`: The related wallet to create card from

*Output*: `Card`

*Description*: This method generate a card and activate it by default with a blance of 0.

*Query Example*:
```
mutation($walletId: ID!) {
  createCard(walletId: $walletId) {
    id
    status
    balance
    currency
    cardNumber
    ccv
    status
  }
}
------------
{
	"walletId": 3
}
```

### Transfer money between any pair (Wallet, Card) 
`loadMoney(amount: Int!, fromType: entityTypeEnum!, fromId: ID!, toType: entityTypeEnum!, toId: ID!): Transfer`

*Variables:*
- `amount`: Amount in cent. 1$ = 100.
- `fromType`: `entityTypeEnum(card|wallet)`
- `fromId`: Source wallet / card to transfer from
- `fromType`: `entityTypeEnum(card|wallet)`
- `toId`: Target wallet / card to transfer to

*Output*: `Transfer`

*Description*: Transfer money from Wallet / Card to another Wallet / Card

*Query Example*:
```
mutation($amount: Int!, $fromType: entityTypeEnum!, $fromId: ID!, $toType: entityTypeEnum!, $toId: ID!){
  loadMoney(amount: $amount, fromType: $fromType, fromId:  $fromId, toType: $toType, toId:  $toId) {
    timestamp
    transferedAmount
    originCurrency
    targetCurrency
    conversionFee
    originEntityType
    originEntityId
    targetEntityType
    targetEntityId
  }
}
--------
{
	"amount": 100,
	"fromType": "wallet",
	"fromId": 1,
	"toType": "card",
	"toId": 1
}
```

### Block a card
`blockCard(id: ID!): Card`

*Variables:*
- `id`: Card Id

*Output*: `Card`

*Description*: Block a card from being able to transfer money

*Query Example*:
```
mutation($id: ID!) {
  blockCard(id: $id) {
    id
    status
  }
}
--------
{
	"id": 1
}
```
## Type definitions

```gql
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

enum CurrencyEnum {
  usd
  eur
  gbp
}

enum entityTypeEnum {
  card
  wallet
}

type Mutation {
  createWallet(user: ID!, currency: CurrencyEnum): Wallet
  createCard(walletId: ID!): Card
  loadMoney(
    amount: Int!
    fromType: entityTypeEnum!
    fromId: ID!
    toType: entityTypeEnum!
    toId: ID!
  ): Transfer
  blockCard(id: ID!): Card
}

type Query {
  user(id: ID!): User
  ledger: [Transfer]
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

```