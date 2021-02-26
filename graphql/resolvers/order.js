const {UserInputError} = require("apollo-server")
const Order = require("../../models/Order")
const Product = require("../../models/Product")
const Cart = require("../../models/Cart")
const CartProduct = require("../../models/CartProduct")
const checkAuth = require('../../utils/check-auth');

module.exports = {
    Mutation: {
        async createOrder(_,{cartId}, context){

            console.log("hit")

            // see if tournament already exists
            let cart = await Cart.findOne({_id: cartId})

            let user = null

            if(context.req.headers.authorization){
                // check user is authorized
                 user = checkAuth(context);
            }

            let order;

            if(user){
                order = new Order({
                    user: user.id,
                    shipping: "FREE",
                    paypalId: (Math.random() * 1000).toString(),
                    cart: cart.id,
                    createdAt: new Date().toISOString()
                })
            } else{
                order = new Order({
                    shipping: "FREE",
                    paypalId: (Math.random() * 1000).toString(),
                    cart: cart.id,
                    createdAt: new Date().toISOString()
                })
            }

            order = await order.save()

            console.log(order)

            let cartProducts = await CartProduct.find({cart: cart.id})
            
            let productList = await Product.find({_id: {$in: cartProducts.map(product => product.product)}})

            cartProducts = cartProducts.map(product => {
                let mappedProduct = productList.filter(p => p._id !== product.product)[0]
                return {...mappedProduct._doc, size: product.size, quantity: product.quantity, id: mappedProduct._doc._id}
            })

            console.log(cartProducts)

            return {...order._doc, products: cartProducts, id: order._doc._id}


        }
    }
}