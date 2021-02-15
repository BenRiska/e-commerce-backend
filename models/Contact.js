
const {model, Schema} = require("mongoose");

const contactSchema = new Schema({
    name: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
})


module.exports = model("Contact", contactSchema);