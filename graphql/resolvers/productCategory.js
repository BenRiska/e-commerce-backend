const {UserInputError} = require("apollo-server")
const ProductCategory = require("../../models/ProductCategory")

module.exports = {
    Query: {
        async fetchCategories(_){
             // get productCategory
             const productCategory = await ProductCategory.find()

             console.log(productCategory)

             // return productCategory array
             return productCategory
        }
    },
    Mutation: {
        async createCategory(_,{category}){

            // see if credit card already exists
            const existingProductCategory = await ProductCategory.findOne({name: category})

            // check and throw error
            if(existingProductCategory){
                throw new UserInputError(
                    "ProductCategory already exists.")
            }

             // create new credit card object
             let newProductCategory = new ProductCategory({
                name: category
            })

            // save new credit card
            let productCategory = await newProductCategory.save()

            // get new credit card
            productCategory = await ProductCategory.findOne(
                { 
                   name: category
               })
           
            // return tournament
            return productCategory

        },
        async deleteCategory(_,{category}){

             // see if credit card already exists
             const existingProductCategory = await ProductCategory.findOne({name: category})

             // check and throw error
             if(!existingProductCategory){
                 throw new UserInputError(
                     "ProductCategory doesn't exists.")
             }

             // delete tournament
            ProductCategory.deleteOne({user: category}, (err) => {
                if(err){
                    throw new UserInputError(
                        "Error contacting database.")
                }
            })

            // return credit Cards array
            return "Category deleted."
        }
    }
}