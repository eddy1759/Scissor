const mongoose = require("mongoose")

const Schema = mongoose.Schema

const analyticSchema = new Schema({

    ipAddress: {
        type: String,
        required: true
    },
    userAgent: {
        type: String,
        required: true
    }
})

const analytics = mongoose.model("analytic", analyticSchema)

module.exports = analytics