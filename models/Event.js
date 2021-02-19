const {model, Schema} = require("mongoose");

const eventSchema = new Schema({
    deliveryDate: String,
    status: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
})


module.exports = model("Event", eventSchema);