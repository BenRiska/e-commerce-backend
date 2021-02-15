const {model, Schema} = require("mongoose");

const paymentSchema = new Schema({
    status: String,
    creditCard: {
        type: Schema.Types.ObjectId,
        ref: "creditCards"
    }
})


module.exports = model("Payment", paymentSchema);