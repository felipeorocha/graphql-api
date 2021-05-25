const { ApolloServer, gql } = require('apollo-server');

const usersMock = [
  {
    id: 5471,
    name: "Felipe Rocha",
    email: "frocha@mail.com",
    age: 26
  },
  {
    id: 2910,
    name: "Julia Prado",
    email: "jprado@mail.com",
    age: 20
  },
  {
    id: 3145,
    name: "Eduardo Prado",
    email: "eprado@mail.com",
    age: 18
  },
  {
    id: 7215,
    name: "Léo Rodrigues",
    email: "lrodrigues@mail.com",
    age: 5
  }
];

const typeDefs = gql`
  scalar Date

  type User {
    id: ID
    name: String!
    email: String!
    age: Int
    salary: Float
    vip: Boolean
  }

  type Product {
    name: String!
    price: Float!
    discount: Float
    priceOff: Float
  }

  type Query {
    hello: String!
    currentHour: Date!
    getUserData: User
    getProduct: Product
    users: [User]
    ofAgeUsers: [User]
    getUserById(id: ID): User
  }
`;

const resolvers = {
  Query: {
    hello() {
      return 'Hello World!'
    },
    getUserData() {
      return {
        user_id: 14124,
        name: "Felipe",
        email: "felipe.rocha@email.com",
        age: 26,
        USD_salary: 123.78,
        vip: true
      }
    },
    getProduct() {
      return {
        name: 'iPhone 13',
        price: 1099.99,
        discount: 0.10
      }
    },
    users() {
      return usersMock
    },
    ofAgeUsers() {
      return usersMock.filter(user => user.age >= 18)
    },
    getUserById(_, args) {
      return usersMock.filter(user => user.id === Number(args.id))[0]
    }
  },
  User: {
    salary(user) {
      return user.USD_salary
    },
    id(user) {
      return user.user_id || user.id
    }
  },
  Product: {
    priceOff(product) {
      if (product.discount) {
        return (product.price * (1 - product.discount)).toFixed(2)
      } else {
        return product.price
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => console.log(`App listing on port ${url}`));
