
const {model, Schema} = require("mongoose");

const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    categories: [{
        type: Schema.Types.ObjectId,
        ref: "productCategories"
    }]
})


module.exports = model("product", productSchema);