const express = require('express');
const logger = require('morgan');
const { ApolloServer } = require('apollo-server-express');
const { gql } = require("apollo-server");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const typeDefs = gql`
  type Query {
    hello: String @cacheControl(maxAge: 900)
  }
`;

const resolvers = {
  Query: {
    hello: (root, args, context) => "Hello world!"
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cacheControl: true // when this option is set, you'll see the bug - no Cache-Control headers are set
});

server.applyMiddleware({
  app,
  path: '/graphql'
})

module.exports = app;
