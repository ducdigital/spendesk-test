import express from 'express';
import apolloServerExpress from 'apollo-server-express';
import typeDefs from './graphql/typedefs.mjs';
import resolvers from './graphql/resolvers.mjs';

const { makeExecutableSchema, ApolloServer } = apolloServerExpress;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
const PORT = 3000;
const app = express();

const apolloServer = new ApolloServer({ schema: schema });

apolloServer.applyMiddleware({ app });
app.listen(PORT, async () => {
  console.log(`Application started at ${PORT}`);
});
