const {UserInputError} = require("apollo-server")
const Product = require("../../models/Product")

module.exports = {
    Query: {
        async fetchProducts(){
            // get product
            const products = await Product.find()

            // return product array
            return products
        }
    },
    Mutation: {
        async createProduct(_,{name, description, price}){

            // see if credit card already exists
            const existingProduct = await Product.findOne({name, description, price})

            // check and throw error
            if(existingProduct){
                throw new UserInputError(
                    "Product already exists.")
            }

            // create new credit card object
            let newProduct = new Product({
                name, description, price
            })

            // save new credit card
            let product = await newProduct.save()

            // get new credit card
            product = await Product.findOne(
                { 
                   name,
                   description,
                   price
               })
           
            // return tournament
            return product
        },
        async deleteProduct(_, {name, description, price}){

            // see if credit card already exists
            const existingProduct = await Product.findOne({name, description, price })

            // check and throw error
            if(!existingProduct){
                throw new UserInputError(
                    "Product doesn't exists.")
            }

            // delete tournament
           Product.deleteOne({name, description, price}, (err) => {
               if(err){
                   throw new UserInputError(
                       "Error contacting database.")
               }
           })

           // return credit Cards array
           return "Product deleted."
        }
    }
}