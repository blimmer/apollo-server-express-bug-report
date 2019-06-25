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
    hello: String
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
  // cacheControl: true // comment this out and you'll get the Cache-Control headers
});

server.applyMiddleware({
  app,
  path: '/graphql'
})

module.exports = app;
