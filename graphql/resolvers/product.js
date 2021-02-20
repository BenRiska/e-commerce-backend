const {UserInputError} = require("apollo-server")
const Product = require("../../models/Product")
const ProductCategory = require("../../models/ProductCategory")

module.exports = {
    Query: {
        async fetchProducts(){

                // get product
            let products = await Product.find()

            // return product array
            return products

        },
        async fetchProduct(_,{id}){
            // see if credit card already exists
            const existingProduct = await Product.findOne({_id: id})

            return existingProduct
        }
    },
    Mutation: {
        async createProduct(_,{name, description, price, images, sizes}){

            // see if credit card already exists
            const existingProduct = await Product.findOne({name, description, price})

            // check and throw error
            if(existingProduct){
                throw new UserInputError(
                    "Product already exists.")
            }

            // create new credit card object
            let newProduct = new Product({
                name, description, price, images, sizes
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
        },
        async addCategory(_, {productId, categoryId}){

            // see if credit card already exists
            const existingProduct = await Product.findOne({_id: productId})

            // see if credit card already exists
            const existingCategory = await ProductCategory.findOne({_id: categoryId})

            if(existingProduct.categories.includes(categoryId)){
                throw new UserInputError("Category already listed.")
            }

            // update tournament
            let product = await Product.findOneAndUpdate({_id: productId}, {
                categories: [...existingProduct.categories, existingCategory]
            },
            { new: true },
            (err) => {
                if(err){
                    throw new UserInputError("Problem connecting with database.")
                }
            });

            return product
        },
        async filterByCategory(_,{categoryId}){
                // get product
                let products = await Product.find({categories: categoryId})

                // return product array
                return products
        }
    }
}