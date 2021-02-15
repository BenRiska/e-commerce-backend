
const {model, Schema} = require("mongoose");

const productCategorySchema = new Schema({
    name: String,
})


module.exports = model("ProductCategory", productCategorySchema);