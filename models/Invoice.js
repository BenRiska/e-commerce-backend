const {model, Schema} = require("mongoose");

const invoiceSchema = new Schema({
    invoice: String,
    order: {
        type: Schema.Types.ObjectId,
        ref: "orders"
    },
    creditCard: {
        type: Schema.Types.ObjectId,
        ref: "creditCards"
    }
})


module.exports = model("Invoice", invoiceSchema);