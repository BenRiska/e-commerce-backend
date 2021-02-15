const usersResolvers = require("./users")
const creditCardResolvers = require("./creditCard")

module.exports = {
    Query: {
        getUsers(){
            return {username: "ben"}
        },
        ...creditCardResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...creditCardResolvers.Mutation
    }
}