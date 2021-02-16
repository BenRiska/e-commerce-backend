const usersResolvers = require("./users")
const creditCardResolvers = require("./creditCard")
const contactResolvers = require("./contact")
const productCategoryResolvers = require("./productCategory")

module.exports = {
    Query: {
        ...creditCardResolvers.Query,
        ...contactResolvers.Query,
        ...productCategoryResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...creditCardResolvers.Mutation,
        ...contactResolvers.Mutation,
        ...productCategoryResolvers.Mutation
    }
}