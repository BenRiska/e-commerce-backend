const {model, Schema} = require("mongoose");

const shippingSchema = new Schema({
    shipCharge: String,
    status: String,
    address: {
        type: Schema.Types.ObjectId,
        ref: "address"
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: "events"
    }

})


module.exports = model("Shipping", shippingSchema);