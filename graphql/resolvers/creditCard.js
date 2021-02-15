
const {UserInputError, addResolveFunctionsToSchema} = require("apollo-server")

const CreditCard = require("../../models/CreditCard")
const User = require("../../models/User")
const checkAuth = require('../../utils/check-auth');

module.exports = {
    Query: {
        async fetchCreditCards(_, {username}, context){

             // check user is authorized
             const user = checkAuth(context);

             // throw error if not authorized
            if(!user){
             throw new UserInputError("User not authorized")
             }
 
             // check if user is in the database
             const cardOwner = await User.findOne({username})
 
             if(!cardOwner){
                 throw new UserInputError(
                     "User not recognised.")
             }

              // get credit cards
            const creditCards = await CreditCard.find({user: cardOwner})

            // return credit Cards array
            return creditCards
        }
    },
    Mutation: {
        async registerCreditCard(_, {cardInput: {cardNumber, cardName, expiryDate, username}}, context){
            // check user is authorized
            const user = checkAuth(context);

            // throw error if not authorized
           if(!user){
            throw new UserInputError("User not authorized")
            }

            // check if user is in the database
            const cardOwner = await User.findOne({username})

            if(!cardOwner){
                throw new UserInputError(
                    "User not recognised.")
            }

             // see if credit card already exists
             const existingCreditCard = await CreditCard.findOne({cc_name: cardName, cc_number: cardNumber, expiryDate, user: cardOwner})

             // check and throw error
             if(existingCreditCard){
                 throw new UserInputError(
                     "Credit Card already exists.")
             }

              // create new credit card object
             let newCreditCard = new CreditCard({
                 cc_name: cardName,
                 cc_number: cardNumber, 
                 expiryDate, 
                 user: cardOwner
             })

             // save new credit card
             let creditCard = await newCreditCard.save()

             // get new credit card
             creditCard = await CreditCard.findOne(
                 {
                    cc_name: cardName,
                    cc_number: cardNumber, 
                    expiryDate, 
                    user: cardOwner
                })
            
             // return tournament
             return creditCard
        }
    }
}