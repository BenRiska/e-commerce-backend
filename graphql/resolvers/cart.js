const {UserInputError} = require("apollo-server")
const Product = require("../../models/Product")
const Cart = require("../../models/Cart")
const CartProduct = require("../../models/CartProduct")
const checkAuth = require('../../utils/check-auth');

module.exports = {
    Mutation: {
        async addProduct(_,{cartId, productId, size, quantity}, context){

            // see if credit card already exists
            const product = await Product.findOne({_id: productId})

            // check and throw error
            if(!product){
            throw new UserInputError(
                "Product doesn't exist.")
            }

            let user = null

            if(context.req.headers.authorization){
                // check user is authorized
                 user = checkAuth(context);
            }

            let cart

            if(!cartId){
                // throw error if not authorized
                if(!user){
                    // create new credit card object
                    cart = new Cart()
                } else{
                    // create new credit card object
                    cart = new Cart({
                        user: user.id
                    })
                }
                // save new Cart
                cart = await cart.save()

            } else {
                cart = await Cart.findOne({_id: cartId})
            }

            let existingCartProduct = await CartProduct.findOne({cart: cart.id, product: productId, size})

            let cartProduct;

            if(existingCartProduct){

                cartProduct = await CartProduct.findOneAndUpdate({cart: cart.id, product: productId, size}, {
                    quantity: existingCartProduct.quantity + 1
                })

            } else{

                cartProduct = new CartProduct({
                    cart: cart.id,
                    product: productId,
                    quantity,
                    size
                })
    
                // save new Cart product
                cartProduct = await cartProduct.save()

            }

            let cartProducts = await CartProduct.find({cart: cart.id})
            
            let productList = await Product.find({_id: {$in: cartProducts.map(product => product.product)}})

            cartProducts = cartProducts.map(product => {
                let mappedProduct = productList.filter(p => p._id !== product.product)[0]
                return {...mappedProduct._doc, size: product.size, quantity: product.quantity, id: mappedProduct._doc._id}
            })

            return {id: cart.id, products: cartProducts}

        },
        async deleteCartProduct(_,{cartId, productId}){

            // find cart product
            let cartProduct = await CartProduct.find({cart: cartId, product: productId})

            if(!cartProduct){
                throw new UserInputError(
                    "Product doesn't exist.")
            }

            // delete cart product

            CartProduct.deleteOne({cart: cartId, product: productId}, (err) => {
                if(err){
                    console.log(err)
                }
            })

            // create new cart

            let cartProducts = await CartProduct.find({cart: cartId})
            
            let productList = await Product.find({_id: {$in: cartProducts.map(product => product.product)}})

            cartProducts = cartProducts.map(product => {
                let mappedProduct = productList.filter(p => p._id !== product.product)[0]
                mappedProduct.quantity = product.quantity;
                mappedProduct.size = product.size
                return mappedProduct
            })

            return {id: cartId, products: cartProducts}

        }
    }
}