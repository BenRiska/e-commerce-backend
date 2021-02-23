const {model, Schema} = require("mongoose");

const orderSchema = new Schema({
    createdAt: String,
    totalAmount: String,
    paypalId: String,
    items: [{
        id: String,
        quantity: Number,
        size: String
    }],
    payment: {
        type: Schema.Types.ObjectId,
        ref: "payments"
    },
    shipping: {
        type: Schema.Types.ObjectId,
        ref: "shippings"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }

})


module.exports = model("Order", orderSchema);