const {UserInputError} = require("apollo-server")
const Order = require("../../models/Order")
const Product = require("../../models/Product")
const checkAuth = require('../../utils/check-auth');

module.exports = {
    Mutation: {
        async createOrder(_,{cartInput: {cartItems, payment, paypalId, shippingTier}}, context){
            //  // check user is authorized
            //  const user = checkAuth(context);

             let orderItems = cartItems.map(item => ({id: item.id, quantity: item.quantity, size: item.size}))

             if(paypalId){

                // see if tournament already exists
                const existingOrder = await Order.findOne({paypalId})

                // check and throw error
                if(existingOrder){
                throw new UserInputError(
                    "Paypal Error.")
                }

                // create new tournament object
                 let newOrder = new Order({
                    paypalId,
                    items: orderItems
                 })

                 // save new tournament
                    let order = await newOrder.save()

                // get new order
                    order = await Order.findOne({paypalId})

                // return order
                    return {id: order.id, paypalId: order.paypalId, items: cartItems}
                }

                // if(payment){
                //     // create new tournament object
                //      let newOrder = new Order({
                //         payment,
                //         items: orderItems
                //      })
    
                //      // save new tournament
                //         let order = await newOrder.save()
    
                //     // get new order
                //         order = await Order.findOne({paypalId})
    
                //     // return order
                //         return {...order, items: cartItems}
                //     }

        }
    }
}