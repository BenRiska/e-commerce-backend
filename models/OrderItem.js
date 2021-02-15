const {model, Schema} = require("mongoose");

const orderItemSchema = new Schema({
    quantity: Number,
    order: {
        type: Schema.Types.ObjectId,
        ref: "orders"
    },
    productDetails: {
        type: Schema.Types.ObjectId,
        ref: "productDetails"
    }

})


module.exports = model("OrderItem", orderItemSchema);