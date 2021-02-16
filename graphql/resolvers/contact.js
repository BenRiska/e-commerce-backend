const {UserInputError} = require("apollo-server")
const Contact = require("../../models/Contact")
const User = require("../../models/User")
const checkAuth = require('../../utils/check-auth');

module.exports = {
    Query: {
        async fetchContact(_,{username}, context){

            // check user is authorized
            const user = checkAuth(context);

            // throw error if not authorized
           if(!user){
            throw new UserInputError("User not authorized")
            }

            // check if user is in the database
            const contactOwner = await User.findOne({username})
 
            if(!contactOwner){
                throw new UserInputError(
                    "User not recognised.")
            }

            // get credit cards
            const contact = await Contact.findOne({user: contactOwner})

            // return credit Cards array
            return contact
        }
    },
    Mutation: {
        async createContact(_,{username}, context){

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
            const existingContact = await Contact.findOne({user: cardOwner})

            // check and throw error
            if(existingContact){
                throw new UserInputError(
                    "Contact already exists.")
            }

             // create new credit card object
             let newContact = new Contact({
                name: username, 
                user: cardOwner
            })

            // save new credit card
            let contact = await newContact.save()

            // get new credit card
            contact = await Contact.findOne(
                { 
                   user: cardOwner
               })
           
            // return tournament
            return contact
        },
        async deleteContact(_,{username}, context){

             // check user is authorized
             const user = checkAuth(context);

             // throw error if not authorized
            if(!user){
             throw new UserInputError("User not authorized")
             }

             // check if user is in the database
            const contactOwner = await User.findOne({username})

            if(!contactOwner){
                throw new UserInputError(
                    "User not recognised.")
            }

            // see if credit card already exists
            const existingContact = await Contact.findOne({user: contactOwner})

            // check and throw error
            if(!existingContact){
                throw new UserInputError(
                    "Contact doesn't exist.")
            }

            // delete tournament
            Contact.deleteOne({user: contactOwner}, (err) => {
                if(err){
                    throw new UserInputError(
                        "Error contacting database.")
                }
            })

            // return credit Cards array
            return "Contact deleted."
        }
    }
}