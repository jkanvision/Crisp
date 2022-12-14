const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    events: [Event]!
  }

  type Event {
    _id: ID!
    title: String
    start: String
    end: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user: User
    events: [Event]
    event(eventId: ID!): Event
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(userId: ID!, name: String, email: String, password: String): User
    updateEvent(eventId: ID!, title: String, start: String, end: String): Event
    addEvent(title: String, start: String, end: String): Event
    removeEvent(eventId: ID!, title: String, fullText: String): Event
  }
`;

module.exports = typeDefs;
