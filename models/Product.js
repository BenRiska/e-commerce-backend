
const {model, Schema} = require("mongoose");

const productSchema = new Schema({
    name: String,
    description: String,
    price: String,
    sizes: [String],
    images: [String],
    categories: [{
        type: Schema.Types.ObjectId,
        ref: "productcategories"
    }]
})


module.exports = model("product", productSchema);