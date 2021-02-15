
const gql = require("graphql-tag");

module.exports = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
        token: String!
    },
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    },
    type Query {
        getUsers: User!
    }
    type Mutation {
        register(registerInput: RegisterInput!): User!
        login(username: String!, password: String!): User!
    }
`