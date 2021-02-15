const {model, Schema} = require("mongoose");

const addressSchema = new Schema({
    address: String,
    phone: String,
    contact: {
        type: Schema.Types.ObjectId,
        ref: "contacts"
    }

})


module.exports = model("Address", addressSchema);