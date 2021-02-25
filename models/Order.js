const {model, Schema} = require("mongoose");

const orderSchema = new Schema({
    createdAt: String,
    paypalId: String,
    shipping: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: "carts"
    }
})


module.exports = model("Order", orderSchema);