
const {model, Schema} = require("mongoose");

const productDetailsSchema = new Schema({
    size: String,
    color: String,
    product: {
        type: Schema.Types.ObjectId,
        ref: "products"
    }

})


module.exports = model("ProductDetails", productDetailsSchema);