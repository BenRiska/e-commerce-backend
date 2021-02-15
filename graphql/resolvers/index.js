const usersResolvers = require("./users")

module.exports = {
    Query: {
        getUsers(){
            return {username: "ben"}
        }
    },
    Mutation: {
        ...usersResolvers.Mutation,
    }
}