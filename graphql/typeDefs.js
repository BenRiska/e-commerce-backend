
const gql = require("graphql-tag");

module.exports = gql`
    type User {
        id: ID
        username: String!
        email: String!
        password: String!
        token: String
    },
    type CreditCard {
        id: ID!,
        cc_name: String!
        cc_number: String!
        expiryDate: String!,
    },
    input CardInput {
        cardNumber: String!
        cardName: String!
        expiryDate: String!
        username: String!
    }
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    },
    type Query {
        getUsers: User!
        fetchCreditCards(username: String!): [CreditCard!]!
    }
    type Mutation {
        register(registerInput: RegisterInput!): User!
        login(username: String!, password: String!): User!
        registerCreditCard(cardInput: CardInput!): CreditCard!
    }
`