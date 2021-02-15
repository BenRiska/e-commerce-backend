const {model, Schema} = require("mongoose");

const eventSchema = new Schema({
    name: String,
    deliveryDate: String,
    type: String,
    status: String,
    contact: {
        type: Schema.Types.ObjectId,
        ref: "contacts"
    }

})


module.exports = model("Event", eventSchema);