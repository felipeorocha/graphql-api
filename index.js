const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  scalar Date

  type Usuario {
    id: ID
    name: String!
    email: String!
    age: Int
    salary: Float
    vip: Boolean
  }

  type Query {
    hello: String!
    currentHour: Date!
    getUserData: Usuario
  }
`;

const resolvers = {
  Query: {
    hello() {
      return 'Hello World!'
    },
    getUserData() {
      return {
        id: 14124,
        name: "Felipe",
        email: "felipe.rocha@email.com",
        age: 26,
        USD_salary: 123.78,
        vip: true
      }
    }
  },
  Usuario: {
    salary(user) {
      return user.USD_salary
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => console.log(`App listing on port ${url}`));
