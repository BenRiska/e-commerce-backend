const {model, Schema} = require("mongoose");

const cartProductSchema = new Schema({
    quantity: Number,
    size: String,
    cart: {
        type: Schema.Types.ObjectId,
        ref: "carts"
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "products"
    }

})


module.exports = model("CartProduct", cartProductSchema);