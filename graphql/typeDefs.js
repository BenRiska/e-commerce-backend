
const gql = require("graphql-tag");

module.exports = gql`
    type User {
        id: ID
        username: String!
        email: String!
        password: String!
        token: String
    }
    type CreditCard {
        id: ID!,
        cc_name: String!
        cc_number: String!
        expiryDate: String!,
    }
    type Contact {
        id: ID!
        name: String!
    }
    type Category {
        id: ID!
        name: String!
    }
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
    }
    type Query {
        fetchCreditCards(username: String!): [CreditCard!]!
        fetchContact(username: String!): Contact!
        fetchCategories: [Category!]!
    }
    type Mutation {
        register(registerInput: RegisterInput!): User!
        login(username: String!, password: String!): User!
        registerCreditCard(cardInput: CardInput!): CreditCard!
        deleteCreditCard(cardInput: CardInput!): [CreditCard!]!
        createContact(username: String!): Contact!
        deleteContact(username: String!): String!
        createCategory(category: String!): Category!
        deleteCategory(category: String!): String!
    }
`