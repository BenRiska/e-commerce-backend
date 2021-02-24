const {model, Schema} = require("mongoose");

const cartSchema = new Schema({
    user: [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }]
})


module.exports = model("Cart", cartSchema);