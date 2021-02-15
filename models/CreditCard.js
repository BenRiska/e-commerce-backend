
const {model, Schema} = require("mongoose");

const creditCardSchema = new Schema({
    cc_name: String,
    cc_number: String,
    expiryDate: String,
    createdAt: String,
    user: [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }]
})


module.exports = model("CreditCard", creditCardSchema);