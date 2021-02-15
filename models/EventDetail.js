const {model, Schema} = require("mongoose");

const eventDetailSchema = new Schema({
    quantity: Number,
    status: String,
    event: {
        type: Schema.Types.ObjectId,
        ref: "events"
    },
    productDetails: {
        type: Schema.Types.ObjectId,
        ref: "productDetails"
    }

})


module.exports = model("EventDetail", eventDetailSchema);