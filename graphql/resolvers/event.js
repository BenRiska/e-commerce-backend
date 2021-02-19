const {UserInputError} = require("apollo-server");
const { createSourceEventStream } = require("graphql");
const Event = require("../../models/Event")
const User = require("../../models/User")
const checkAuth = require('../../utils/check-auth');

module.exports = {
    Query: {

    },
    Mutation: {
        async createEvent(_,{}, context){
            // check user is authorized
            const user = checkAuth(context);

            // throw error if not authorized
           if(!user){
            throw new UserInputError("User not authorized")
            }

            // see if event already exists
            const existingEvent = await Event.findOne({user: user.id})

            // check and throw error
            if(existingEvent){
                throw new UserInputError(
                    "event already exists.")
            }

            // create new credit card object
            let newEvent = new Event({
                user: user.id,
                status: "PREPARING"
            })

            // save new credit card
            let event = await newEvent.save()

            // get new credit card
            event = await Event.findOne(
                {
                   user
               })
           

            return event
        }
    }
}