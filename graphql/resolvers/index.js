const usersResolvers = require("./users")
const creditCardResolvers = require("./creditCard")
const contactResolvers = require("./contact")
const productCategoryResolvers = require("./productCategory")
const productResolvers = require("./product")
const eventResolvers = require("./event")
const orderResolvers = require("./order")
const cartResolvers = require("./cart")

module.exports = {
    Query: {
        ...creditCardResolvers.Query,
        ...contactResolvers.Query,
        ...productCategoryResolvers.Query,
        ...productResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...creditCardResolvers.Mutation,
        ...contactResolvers.Mutation,
        ...productCategoryResolvers.Mutation,
        ...productResolvers.Mutation,
        ...eventResolvers.Mutation,
        ...orderResolvers.Mutation,
        ...cartResolvers.Mutation
    }
}