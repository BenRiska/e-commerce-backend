
const bcrypt = require("bcryptjs")
const {UserInputError} = require("apollo-server")

const {
    validateRegisterInput,
    validateLoginInput
  } = require('../../utils/validators');
const generateToken = require('../../utils/generate-token');
const User = require("../../models/User")

module.exports = {
    Query: {
    },
    Mutation: {
        async register(_, {registerInput: {username, password, email, confirmPassword}}){
           // validate input
           const {valid,errors} = validateRegisterInput(username, email, password, confirmPassword)

           // throw error if wrong input
           if(!valid){
               throw new UserInputError('Errors', {errors})
           }

           // check if user is already created
           const user = await User.findOne({username})

           // throw error if user is found
           if(user){
               throw new UserInputError("Username is taken", {
                   errors: {
                       username: "This username is taken."
                   }
               })
           }

           // hash password
           password = await bcrypt.hash(password, 12)

           // create new user
           const newUser = new User({
               email,
               password,
               username,
               createdAt: new Date().toISOString()
           })

           //save new user
           const res = await newUser.save();

           // create json web token
           const token = generateToken(res)

           // return user info and token
           return {
               ...res._doc,
               id: res._id,
               token
           }
        },
        async login(_, {username, password}){
            // validate input
            const {errors, valid} = validateLoginInput(username, password)

            // throw error if input is invalid
            if(!valid){
                throw new UserInputError("Errors", {errors})
            }

            // check if user is already created
            const user = await User.findOne({username})

            // throw error if no user
            if(!user){
                errors.general = "User not found."
                throw new UserInputError("User not found", {errors})
            }

          // check password is correct
              const match = await bcrypt.compare(password, user.password);

              // throw error if password doesnt match
              if(!match){
                  errors.general = "Wrong credentials."
                  throw new UserInputError("Wrong credentials", {errors})
              }

              // get json web token
              const token = generateToken(user)

              // return user info and token
              return {
                  ...user._doc,
                  id: user._id,
                  token
              }
        }
    }
}